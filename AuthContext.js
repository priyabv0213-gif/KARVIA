import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const USER_SESSION_KEY = '@karvia_user_session';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState('artisan'); // 'artisan' | 'buyer' | 'admin'
  const [isLoading, setIsLoading] = useState(true);

  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);

  useEffect(() => {
    loadSession();
  }, []);

  const loadSession = async () => {
    try {
      const stored = await AsyncStorage.getItem(USER_SESSION_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setUser(parsed.user);
        setRole(parsed.role || 'artisan');
        setHasCompletedOnboarding(parsed.hasCompletedOnboarding ?? true);
      } else {
        // Initial state awaiting user entry or onboarding
        const initialUser = {
          uid: 'usr_artisan_active',
          name: 'Meenakshi Sundaram',
          phone: '+91 98401 23456',
          email: 'artisan@karvia.crafts.org',
          role: 'artisan',
          region: 'Kanchipuram, Tamil Nadu',
          craftCluster: 'Pillayar Palayam Weaver Co-op',
          craftCategory: 'handloom_textiles',
          craftName: 'Kanchipuram Pure Silk Korvai',
          yearsExperience: 22,
          hasAadhaar: true,
          pehchanId: 'PEH-TN-2024-8891',
          verified: true,
          bio: 'Preserving the 4th-generation tradition of temple border handloom weaving on wooden pit looms.',
          skills: ['Three-shuttle Korvai', 'Pure Zari Calibration', 'Natural Madder Dyeing'],
          languages: ['Tamil', 'English', 'Hindi'],
        };
        setUser(initialUser);
        setRole('artisan');
        setHasCompletedOnboarding(false);
      }
    } catch (e) {
      console.warn('Error loading session:', e);
    } finally {
      setIsLoading(false);
    }
  };

  const onboardArtisan = async (artisanProfile) => {
    setIsLoading(true);
    try {
      const profile = {
        uid: user?.uid || `usr_artisan_${Date.now()}`,
        name: artisanProfile.name || 'Traditional Artisan',
        phone: artisanProfile.phone || '+91 98401 23456',
        email: artisanProfile.email || `${(artisanProfile.name || 'artisan').toLowerCase().replace(/\s+/g, '')}@karvia.crafts.org`,
        role: 'artisan',
        region: artisanProfile.region || 'Tamil Nadu',
        craftCluster: artisanProfile.craftCluster || `${artisanProfile.region || 'Regional'} Craft Cooperative`,
        craftCategory: artisanProfile.craftCategory || 'handloom_textiles',
        craftName: artisanProfile.craftName || 'Handloom Craft',
        yearsExperience: artisanProfile.yearsExperience || 10,
        story: artisanProfile.story || artisanProfile.bio || 'Generational craftsperson preserving sacred cultural traditions.',
        bio: artisanProfile.story || artisanProfile.bio || 'Generational craftsperson preserving sacred cultural traditions.',
        skills: artisanProfile.skills || ['Traditional Handcrafting', 'Natural Processing'],
        languages: artisanProfile.languages || ['English', 'Hindi'],
        voiceNoteUri: artisanProfile.voiceNoteUri || null,
        hasAadhaar: true,
        pehchanId: artisanProfile.pehchanId || `PEH-${Date.now().toString().slice(-4)}`,
        verified: true,
      };

      setUser(profile);
      setRole('artisan');
      setHasCompletedOnboarding(true);

      await AsyncStorage.setItem(USER_SESSION_KEY, JSON.stringify({
        user: profile,
        role: 'artisan',
        hasCompletedOnboarding: true,
      }));

      return { success: true, user: profile };
    } catch (error) {
      return { success: false, error: error.message };
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (credentials) => {
    setIsLoading(true);
    try {
      // Authenticate
      const userProfile = {
        uid: credentials.uid || `usr_${Date.now()}`,
        name: credentials.name || (credentials.role === 'buyer' ? 'Priya Sharma' : user?.name || 'Meenakshi Sundaram'),
        phone: credentials.phone || '+91 98401 23456',
        email: credentials.email || (credentials.role === 'buyer' ? 'patron@karvia.crafts.org' : 'artisan@karvia.crafts.org'),
        role: credentials.role || 'artisan',
        region: credentials.region || user?.region || 'Kanchipuram, Tamil Nadu',
        craftCategory: credentials.craftCategory || user?.craftCategory || 'handloom_textiles',
        craftName: credentials.craftName || user?.craftName || 'Kanchipuram Silk',
        yearsExperience: credentials.yearsExperience || user?.yearsExperience || 18,
        hasAadhaar: true,
        verified: true,
      };

      setUser(userProfile);
      setRole(userProfile.role);
      setHasCompletedOnboarding(true);
      await AsyncStorage.setItem(USER_SESSION_KEY, JSON.stringify({
        user: userProfile,
        role: userProfile.role,
        hasCompletedOnboarding: true,
      }));
      return { success: true, user: userProfile };
    } catch (error) {
      return { success: false, error: error.message };
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (profileData) => {
    return login(profileData);
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem(USER_SESSION_KEY);
      setUser(null);
      setHasCompletedOnboarding(false);
    } catch (e) {
      console.warn('Error during logout:', e);
    }
  };

  const switchRole = async (newRole) => {
    if (!['artisan', 'buyer', 'admin'].includes(newRole)) return;
    setRole(newRole);
    if (user) {
      const updatedUser = { ...user, role: newRole };
      setUser(updatedUser);
      await AsyncStorage.setItem(USER_SESSION_KEY, JSON.stringify({
        user: updatedUser,
        role: newRole,
        hasCompletedOnboarding: true,
      }));
    }
  };

  const updateProfile = async (updates) => {
    if (!user) return;
    const updated = { ...user, ...updates };
    setUser(updated);
    await AsyncStorage.setItem(USER_SESSION_KEY, JSON.stringify({
      user: updated,
      role,
      hasCompletedOnboarding: true,
    }));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        isLoading,
        hasCompletedOnboarding,
        onboardArtisan,
        login,
        register,
        logout,
        switchRole,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthContext;

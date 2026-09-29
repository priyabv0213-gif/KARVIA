import struct
import zlib
import os

def create_png(filename, width, height, r, g, b):
    png = b'\x89PNG\r\n\x1a\n'
    
    # IHDR
    ihdr_data = struct.pack('>IIBBBBB', width, height, 8, 2, 0, 0, 0)
    ihdr_crc = zlib.crc32(b'IHDR' + ihdr_data) & 0xffffffff
    png += struct.pack('>I', len(ihdr_data)) + b'IHDR' + ihdr_data + struct.pack('>I', ihdr_crc)
    
    # IDAT
    row = b'\x00' + bytes([r, g, b]) * width
    raw_data = row * height
    compressed = zlib.compress(raw_data)
    idat_crc = zlib.crc32(b'IDAT' + compressed) & 0xffffffff
    png += struct.pack('>I', len(compressed)) + b'IDAT' + compressed + struct.pack('>I', idat_crc)
    
    # IEND
    iend_crc = zlib.crc32(b'IEND') & 0xffffffff
    png += struct.pack('>I', 0) + b'IEND' + struct.pack('>I', iend_crc)
    
    with open(filename, 'wb') as f:
        f.write(png)
    print(f"Created valid PNG: {filename} ({width}x{height})")

assets_dir = os.path.join(os.path.dirname(__file__), '..', 'assets')
os.makedirs(assets_dir, exist_ok=True)

# Terracotta orange (217, 83, 30)
create_png(os.path.join(assets_dir, 'icon.png'), 192, 192, 217, 83, 30)
create_png(os.path.join(assets_dir, 'splash-icon.png'), 200, 200, 217, 83, 30)
create_png(os.path.join(assets_dir, 'adaptive-icon.png'), 192, 192, 217, 83, 30)
create_png(os.path.join(assets_dir, 'favicon.png'), 48, 48, 217, 83, 30)

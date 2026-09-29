const fs = require('fs');
const path = require('path');

const assetsDir = path.join(__dirname, '..', 'assets');
if (!fs.existsSync(assetsDir)) {
  fs.mkdirSync(assetsDir, { recursive: true });
}

// Minimal valid PNG buffer (terracotta color)
const pngBase64 = 'iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAACNSURBVHgB7dexDYAwEMRAb9gAS2ABloAFWIO9YQ32oFwB6dInX3L1XyVZznnm6qrq9Vb77s/P2u0A3e8AXQdg7QBdA2DtAF0DYO0AXQNg7QBdA2DtAF0DYO0AXQNg7QBdA2DtAF0DYO0AXQNg7QBdA2DtAF0DYO0AXQNg7QBdA2DtAF0DYO0AXQNg7QBdAyj5AMrT3r/g/t91AAAAAElFTkSuQmCC';
const pngBuffer = Buffer.from(pngBase64, 'base64');

const files = ['icon.png', 'splash-icon.png', 'adaptive-icon.png', 'favicon.png'];
files.forEach((file) => {
  const filePath = path.join(assetsDir, file);
  fs.writeFileSync(filePath, pngBuffer);
  console.log(`Generated asset: ${file}`);
});

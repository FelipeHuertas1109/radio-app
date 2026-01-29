/**
 * Script para crear assets placeholder básicos
 * Ejecutar con: node scripts/create-placeholder-assets.js
 * 
 * Nota: Este script requiere que tengas ImageMagick o una herramienta similar instalada.
 * Para producción, usa imágenes reales creadas por un diseñador.
 */

const fs = require('fs');
const path = require('path');

// Crear directorio assets si no existe
const assetsDir = path.join(__dirname, '..', 'assets');
if (!fs.existsSync(assetsDir)) {
  fs.mkdirSync(assetsDir, { recursive: true });
}

console.log('📦 Creando assets placeholder...');
console.log('');
console.log('⚠️  IMPORTANTE: Estos son placeholders básicos.');
console.log('   Para producción, necesitas crear imágenes reales:');
console.log('   - icon.png (1024x1024px)');
console.log('   - splash.png (2048x2048px)');
console.log('   - adaptive-icon.png (1024x1024px)');
console.log('   - favicon.png (48x48px)');
console.log('');
console.log('💡 Puedes usar herramientas como:');
console.log('   - https://www.appicon.co/');
console.log('   - https://icon.kitchen/');
console.log('   - Figma o Canva para diseño');
console.log('');
console.log('✅ Directorio assets creado en:', assetsDir);
console.log('');
console.log('📝 Crea las imágenes con:');
console.log('   - Color de fondo: #1E3A8A (azul oscuro)');
console.log('   - Texto: "HQS Radio"');
console.log('   - Estilo: Moderno y limpio');


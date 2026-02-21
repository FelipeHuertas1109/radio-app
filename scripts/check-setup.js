/**
 * Script para verificar que todo esté configurado correctamente
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 Verificando configuración de HQS Radio...\n');

const checks = [];
let allPassed = true;

// Verificar archivos esenciales
const essentialFiles = [
  'App.js',
  'app.json',
  'package.json',
  'babel.config.js',
  'metro.config.js',
  'eas.json',
  'components/RadioPlayer.js',
];

essentialFiles.forEach(file => {
  const exists = fs.existsSync(path.join(__dirname, '..', file));
  checks.push({ name: file, passed: exists });
  if (!exists) allPassed = false;
});

// Verificar assets
const assetsDir = path.join(__dirname, '..', 'assets');
const requiredAssets = ['icon.png', 'splash.png', 'adaptive-icon.png', 'favicon.png'];
const assetsExist = requiredAssets.map(asset => {
  const exists = fs.existsSync(path.join(assetsDir, asset));
  return { name: asset, exists };
});

// Verificar node_modules
const nodeModulesExists = fs.existsSync(path.join(__dirname, '..', 'node_modules'));

// Mostrar resultados
console.log('📁 Archivos esenciales:');
essentialFiles.forEach(file => {
  const check = checks.find(c => c.name === file);
  const icon = check.passed ? '✅' : '❌';
  console.log(`   ${icon} ${file}`);
});

console.log('\n🎨 Assets:');
requiredAssets.forEach(asset => {
  const assetCheck = assetsExist.find(a => a.name === asset);
  const icon = assetCheck.exists ? '✅' : '⚠️ ';
  console.log(`   ${icon} ${asset} ${assetCheck.exists ? '' : '(falta crear)'}`);
});

console.log('\n📦 Dependencias:');
console.log(`   ${nodeModulesExists ? '✅' : '❌'} node_modules ${nodeModulesExists ? '' : '(ejecuta: npm install)'}`);

console.log('\n📊 Resumen:');
if (allPassed && nodeModulesExists) {
  console.log('   ✅ Todos los archivos esenciales están presentes');
} else {
  console.log('   ⚠️  Faltan algunos archivos o dependencias');
}

const missingAssets = assetsExist.filter(a => !a.exists);
if (missingAssets.length > 0) {
  console.log(`\n⚠️  Assets faltantes: ${missingAssets.length} de ${requiredAssets.length}`);
  console.log('   Lee assets/INSTRUCCIONES-ASSETS.md para crear los assets');
} else {
  console.log('\n✅ Todos los assets están presentes');
}

console.log('\n💡 Próximos pasos:');
if (!nodeModulesExists) {
  console.log('   1. Ejecuta: npm install');
}
if (missingAssets.length > 0) {
  console.log('   2. Crea los assets faltantes (ver assets/INSTRUCCIONES-ASSETS.md)');
}
if (nodeModulesExists && missingAssets.length === 0) {
  console.log('   1. Ejecuta: npm start');
  console.log('   2. Escanea el código QR con Expo Go');
}

console.log('');


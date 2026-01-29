/**
 * Script mejorado para generar assets básicos usando Node.js
 * Este script crea archivos placeholder que puedes reemplazar después
 */

const fs = require('fs');
const path = require('path');

const assetsDir = path.join(__dirname, '..', 'assets');
const sizes = {
  icon: { width: 1024, height: 1024 },
  splash: { width: 2048, height: 2048 },
  adaptiveIcon: { width: 1024, height: 1024 },
  favicon: { width: 48, height: 48 },
};

// Crear directorio si no existe
if (!fs.existsSync(assetsDir)) {
  fs.mkdirSync(assetsDir, { recursive: true });
}

console.log('🎨 Generador de Assets para HQS Radio\n');
console.log('📁 Directorio de assets:', assetsDir);
console.log('');

// Crear archivo de instrucciones detalladas
const instructions = `# Instrucciones para Crear Assets

## Archivos Requeridos

### 1. icon.png
- Tamaño: 1024x1024px
- Formato: PNG con transparencia
- Contenido: Logo de HQS Radio sobre fondo azul (#1E3A8A)

### 2. splash.png
- Tamaño: 2048x2048px
- Formato: PNG
- Contenido: Logo centrado sobre fondo azul (#1E3A8A)
- El logo debe estar centrado y ocupar aproximadamente el 40% del espacio

### 3. adaptive-icon.png
- Tamaño: 1024x1024px
- Formato: PNG con transparencia
- Contenido: Similar al icon.png pero optimizado para Android
- El contenido importante debe estar en el centro (área segura: 70% del centro)

### 4. favicon.png
- Tamaño: 48x48px
- Formato: PNG
- Contenido: Versión pequeña del logo

## Herramientas Recomendadas

### Online (Más Fácil)
1. **AppIcon.co** - https://www.appicon.co/
   - Sube una imagen de 1024x1024px
   - Genera todos los tamaños automáticamente
   - Descarga y coloca en la carpeta assets/

2. **Icon Kitchen** - https://icon.kitchen/
   - Similar a AppIcon.co
   - Genera iconos adaptativos para Android

### Diseño
1. **Figma** - https://www.figma.com/
   - Diseño profesional
   - Exporta a PNG

2. **Canva** - https://www.canva.com/
   - Más fácil de usar
   - Plantillas disponibles

3. **GIMP** o **Photoshop**
   - Para edición avanzada

## Pasos Recomendados

1. Diseña el logo en Figma o Canva
2. Exporta como PNG de 1024x1024px
3. Usa AppIcon.co para generar todos los tamaños
4. Descarga y coloca los archivos en assets/
5. Verifica que los nombres coincidan exactamente:
   - icon.png
   - splash.png
   - adaptive-icon.png
   - favicon.png

## Diseño Sugerido

- **Color de fondo**: #1E3A8A (azul oscuro) o #3B82F6 (azul medio)
- **Texto**: "HQS Radio" en fuente bold, color blanco
- **Icono**: Ondas de radio o micrófono estilizado
- **Estilo**: Moderno, limpio, minimalista

## Nota

Los archivos generados por este script son solo placeholders.
Para producción, necesitas crear los assets reales siguiendo las instrucciones arriba.
`;

fs.writeFileSync(
  path.join(assetsDir, 'INSTRUCCIONES-ASSETS.md'),
  instructions,
  'utf8'
);

console.log('✅ Archivo de instrucciones creado: assets/INSTRUCCIONES-ASSETS.md');
console.log('');
console.log('📝 Próximos pasos:');
console.log('   1. Lee assets/INSTRUCCIONES-ASSETS.md');
console.log('   2. Crea los assets usando las herramientas recomendadas');
console.log('   3. Coloca los archivos PNG en la carpeta assets/');
console.log('   4. Los nombres deben ser exactos: icon.png, splash.png, etc.');
console.log('');
console.log('💡 Tip: Puedes usar el archivo assets/icon-template.svg como referencia');
console.log('   para el diseño del icono.');


# Generación de Assets para HQS Radio

## Iconos y Splash Screen

Para generar los iconos y splash screen necesarios, puedes usar una de las siguientes opciones:

### Opción 1: Usar Expo Asset Generator (Recomendado)

1. Instala el generador de assets:
```bash
npm install -g expo-asset-generator
```

2. Crea una imagen base de 1024x1024px para el icono (icon-base.png)
3. Crea una imagen de splash de 2048x2048px (splash-base.png)

4. Ejecuta:
```bash
expo-asset-generator icon-base.png --output ./assets
expo-asset-generator splash-base.png --output ./assets --splash
```

### Opción 2: Usar herramientas online

1. **Para el icono**: 
   - Crea una imagen de 1024x1024px con el logo de HQS Radio
   - Usa https://www.appicon.co/ o https://icon.kitchen/ para generar todos los tamaños
   - Coloca los archivos generados en la carpeta `assets/`

2. **Para el splash screen**:
   - Crea una imagen de 2048x2048px con fondo azul (#1E3A8A) y el logo centrado
   - Usa https://www.appicon.co/ para generar el splash screen
   - Coloca el archivo `splash.png` en la carpeta `assets/`

### Opción 3: Crear manualmente

Necesitas crear estos archivos en la carpeta `assets/`:

- `icon.png` (1024x1024px)
- `splash.png` (2048x2048px) 
- `adaptive-icon.png` (1024x1024px para Android)
- `favicon.png` (48x48px para web)

### Diseño Sugerido

- **Color de fondo**: Azul (#1E3A8A o #3B82F6)
- **Logo**: Texto "HQS Radio" o logo de la empresa
- **Estilo**: Moderno, limpio, con buen contraste

### Nota Temporal

Mientras generas los assets reales, la app funcionará con placeholders. 
Puedes crear imágenes simples con cualquier editor de imágenes siguiendo las dimensiones indicadas.


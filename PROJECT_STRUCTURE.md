# Estructura del Proyecto - HQS Radio

Esta documentación describe la estructura completa del proyecto.

## 📁 Estructura de Directorios

```
radio-app/
├── App.js                      # Componente principal de la aplicación
├── app.json                    # Configuración de Expo
├── eas.json                    # Configuración de EAS Build
├── package.json                # Dependencias y scripts
├── babel.config.js             # Configuración de Babel
├── metro.config.js             # Configuración de Metro bundler
├── jest.config.js              # Configuración de Jest para tests
│
├── components/                 # Componentes React
│   ├── RadioPlayer.js         # Reproductor principal de radio
│   ├── AdminPanel.js          # Panel de administración
│   ├── PlayButton.js          # Botón de play/pause
│   ├── VolumeControl.js       # Control de volumen
│   ├── StatusIndicator.js     # Indicador de estado
│   └── StreamCard.js          # Tarjeta de stream guardado
│
├── constants/                  # Constantes y configuración
│   └── Config.js              # Configuración centralizada
│
├── hooks/                      # Custom hooks
│   └── useAudioPlayer.js      # Hook para manejo de audio
│
├── utils/                      # Utilidades
│   ├── audio.js               # Utilidades de audio
│   ├── storage.js             # Utilidades de almacenamiento
│   └── validation.js          # Utilidades de validación
│
├── assets/                     # Recursos estáticos
│   ├── icon.png               # Icono de la app (1024x1024)
│   ├── splash.png             # Splash screen (2048x2048)
│   ├── adaptive-icon.png      # Icono adaptativo Android
│   ├── favicon.png            # Favicon web
│   ├── icon-template.svg      # Template SVG para icono
│   └── INSTRUCCIONES-ASSETS.md # Instrucciones para assets
│
├── scripts/                    # Scripts de utilidad
│   ├── check-setup.js         # Verifica la configuración
│   ├── create-placeholder-assets.js  # Crea placeholders
│   ├── generate-assets-node.js       # Genera instrucciones
│   └── generate-assets.md            # Documentación de assets
│
├── tests/                      # Tests
│   └── App.test.js            # Tests básicos
│
├── .vscode/                    # Configuración de VS Code
│   ├── settings.json          # Configuraciones del editor
│   └── extensions.json        # Extensiones recomendadas
│
└── Documentación/
    ├── README.md              # Documentación principal
    ├── QUICKSTART.md          # Guía de inicio rápido
    ├── PUBLICACION.md         # Guía de publicación
    ├── CONTRIBUTING.md        # Guía de contribución
    ├── CHANGELOG.md           # Historial de cambios
    └── LICENSE                # Licencia del proyecto
```

## 📝 Descripción de Archivos Principales

### App.js
Punto de entrada principal de la aplicación. Maneja la navegación entre el reproductor y el panel de administración.

### components/RadioPlayer.js
Componente principal del reproductor. Maneja la reproducción de audio, controles y estado.

### components/AdminPanel.js
Panel de administración para gestionar múltiples streams, guardar favoritos y configurar la aplicación.

### constants/Config.js
Configuración centralizada de la aplicación: colores, URLs por defecto, constantes de almacenamiento, etc.

### hooks/useAudioPlayer.js
Hook personalizado que encapsula toda la lógica de reproducción de audio, facilitando su reutilización.

### utils/
Utilidades reutilizables:
- **audio.js**: Funciones para manejo de audio
- **storage.js**: Funciones para almacenamiento local
- **validation.js**: Funciones de validación

## 🔧 Archivos de Configuración

### app.json
Configuración de Expo: nombre, versión, iconos, splash screen, permisos, etc.

### eas.json
Configuración de EAS Build para crear builds de producción.

### package.json
Dependencias del proyecto y scripts npm.

### babel.config.js
Configuración de Babel para transpilación de código.

### metro.config.js
Configuración del bundler de Metro para React Native.

## 🎨 Assets

Los assets deben estar en la carpeta `assets/`:
- **icon.png**: Icono principal (1024x1024px)
- **splash.png**: Pantalla de inicio (2048x2048px)
- **adaptive-icon.png**: Icono adaptativo Android (1024x1024px)
- **favicon.png**: Favicon web (48x48px)

## 📦 Scripts Disponibles

- `npm start` - Inicia el servidor de desarrollo
- `npm run android` - Inicia en Android
- `npm run ios` - Inicia en iOS
- `npm run web` - Inicia en web
- `npm run check-setup` - Verifica la configuración
- `npm run generate-assets` - Genera instrucciones para assets
- `npm test` - Ejecuta los tests

## 🔄 Flujo de Datos

1. **App.js** → Renderiza RadioPlayer o AdminPanel
2. **RadioPlayer** → Usa `useAudioPlayer` hook
3. **useAudioPlayer** → Usa utilidades de `utils/audio.js`
4. **AdminPanel** → Usa utilidades de `utils/storage.js` y `utils/validation.js`
5. **Config** → Proporciona constantes a todos los componentes

## 📱 Plataformas Soportadas

- ✅ iOS (iPhone, iPad)
- ✅ Android (teléfonos y tablets)
- ✅ Web (para desarrollo y pruebas)

## 🛠️ Tecnologías Utilizadas

- React Native
- Expo
- Expo AV (audio)
- AsyncStorage (almacenamiento)
- React Hooks
- JavaScript ES6+

## 📚 Convenciones

- Componentes en `components/`
- Utilidades en `utils/`
- Hooks personalizados en `hooks/`
- Constantes en `constants/`
- Tests en `tests/`
- Scripts en `scripts/`

---

Esta estructura está diseñada para ser escalable y mantenible.


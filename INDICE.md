# 📚 Índice de Documentación - HQS Radio

Guía rápida para encontrar la documentación que necesitas.

## 🚀 Inicio Rápido

- **[QUICKSTART.md](QUICKSTART.md)** - Guía de inicio rápido para poner en marcha la app
- **[README.md](README.md)** - Documentación principal y completa del proyecto

## 📖 Documentación Principal

- **[README.md](README.md)** - Documentación completa del proyecto
- **[RESUMEN.md](RESUMEN.md)** - Resumen del estado del proyecto y archivos creados
- **[PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md)** - Estructura detallada del proyecto

## 🎨 Assets e Iconos

- **[assets/INSTRUCCIONES-ASSETS.md](assets/INSTRUCCIONES-ASSETS.md)** - Instrucciones detalladas para crear iconos y splash screen
- **[assets/README.md](assets/README.md)** - Información sobre los assets requeridos
- **[assets/icon-template.svg](assets/icon-template.svg)** - Template SVG para el icono

## 📱 Publicación

- **[PUBLICACION.md](PUBLICACION.md)** - Guía completa para publicar en App Store y Google Play
- **[eas.json](eas.json)** - Configuración de EAS Build

## 🛠️ Desarrollo

- **[CONTRIBUTING.md](CONTRIBUTING.md)** - Guía para contribuir al proyecto
- **[CHANGELOG.md](CHANGELOG.md)** - Historial de cambios del proyecto
- **[.vscode/settings.json](.vscode/settings.json)** - Configuración recomendada de VS Code

## 📋 Scripts y Utilidades

- **[scripts/check-setup.js](scripts/check-setup.js)** - Verifica que todo esté configurado correctamente
- **[scripts/generate-assets-node.js](scripts/generate-assets-node.js)** - Genera instrucciones para assets
- **[scripts/create-placeholder-assets.js](scripts/create-placeholder-assets.js)** - Crea placeholders básicos

## 🧪 Testing

- **[tests/App.test.js](tests/App.test.js)** - Tests básicos de la aplicación
- **[jest.config.js](jest.config.js)** - Configuración de Jest

## ⚙️ Configuración

- **[app.json](app.json)** - Configuración de Expo
- **[package.json](package.json)** - Dependencias y scripts npm
- **[babel.config.js](babel.config.js)** - Configuración de Babel
- **[metro.config.js](metro.config.js)** - Configuración de Metro bundler

## 📝 Licencia

- **[LICENSE](LICENSE)** - Licencia MIT del proyecto

## 🗺️ Rutas Rápidas por Tarea

### Quiero empezar a desarrollar
1. Lee [QUICKSTART.md](QUICKSTART.md)
2. Ejecuta `npm install`
3. Ejecuta `npm start`

### Quiero crear los iconos
1. Lee [assets/INSTRUCCIONES-ASSETS.md](assets/INSTRUCCIONES-ASSETS.md)
2. Usa herramientas como AppIcon.co o Icon Kitchen
3. Coloca los archivos en `assets/`

### Quiero publicar la app
1. Lee [PUBLICACION.md](PUBLICACION.md)
2. Crea los assets necesarios
3. Configura EAS Build
4. Sigue las instrucciones paso a paso

### Quiero entender la estructura
1. Lee [PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md)
2. Revisa [RESUMEN.md](RESUMEN.md)

### Quiero contribuir
1. Lee [CONTRIBUTING.md](CONTRIBUTING.md)
2. Revisa el código en `components/`, `utils/`, `hooks/`

### Tengo un problema
1. Revisa [README.md](README.md) - Sección de solución de problemas
2. Ejecuta `npm run check-setup` para verificar la configuración
3. Revisa los logs en la consola

## 📂 Estructura de Archivos Clave

```
radio-app/
├── 📱 App.js                    # Punto de entrada
├── 📄 README.md                 # Documentación principal
├── 🚀 QUICKSTART.md             # Inicio rápido
├── 📱 PUBLICACION.md            # Guía de publicación
├── 📋 RESUMEN.md                # Resumen del proyecto
├── 🏗️ PROJECT_STRUCTURE.md      # Estructura detallada
├── 🧩 components/               # Componentes React
├── 🎣 hooks/                    # Hooks personalizados
├── 🛠️ utils/                    # Utilidades
├── ⚙️ constants/                # Configuración
├── 🎨 assets/                   # Recursos estáticos
├── 📜 scripts/                  # Scripts de utilidad
└── 🧪 tests/                    # Tests
```

## 🔍 Búsqueda Rápida

- **Configuración**: `app.json`, `eas.json`, `package.json`
- **Componentes**: `components/RadioPlayer.js`, `components/AdminPanel.js`
- **Utilidades**: `utils/audio.js`, `utils/storage.js`, `utils/validation.js`
- **Configuración centralizada**: `constants/Config.js`
- **Hook de audio**: `hooks/useAudioPlayer.js`

## 💡 Tips

- Usa `Ctrl+F` o `Cmd+F` para buscar dentro de los archivos
- Los archivos `.md` están en Markdown y son fáciles de leer
- Los scripts en `scripts/` pueden ejecutarse con `node scripts/nombre.js`
- Usa `npm run check-setup` para verificar que todo esté bien

---

**Última actualización**: 2024-01-XX


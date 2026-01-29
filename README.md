# HQS Radio 📻

Aplicación móvil multiplataforma para escuchar transmisiones de radio IceCast 2 en iOS y Android.

## ✨ Características

- 🎵 **Reproducción de alta calidad** - Soporte completo para streams IceCast 2
- 🎛️ **Controles avanzados** - Play/pause, control de volumen, estado de conexión
- 📱 **Panel de administración** - Gestiona múltiples streams y guarda tus favoritos
- 💾 **Persistencia** - Guarda tus configuraciones y streams favoritos
- 🔄 **Reconexión automática** - Se reconecta automáticamente si se pierde la conexión
- 🎨 **Interfaz moderna** - Diseño elegante con tema azul
- 📱 **Multiplataforma** - Funciona en iOS y Android
- 🔔 **Reproducción en segundo plano** - Escucha mientras usas otras apps
- 🎯 **Listo para producción** - Configurado para publicar en App Store y Google Play

## 🚀 Inicio Rápido

### Instalación

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm start
```

### Ejecutar en Dispositivos

```bash
# iOS
npm run ios

# Android
npm run android

# Web (para pruebas)
npm run web
```

## 📋 Requisitos

- Node.js 16 o superior
- npm o yarn
- Expo CLI (se instala automáticamente)
- Para iOS: Mac con Xcode
- Para Android: Android Studio (opcional, para emulador)

## 🎨 Assets (Iconos y Splash Screen)

Antes de construir para producción, necesitas crear los siguientes archivos en la carpeta `assets/`:

- `icon.png` - 1024x1024px
- `splash.png` - 2048x2048px  
- `adaptive-icon.png` - 1024x1024px (Android)
- `favicon.png` - 48x48px (Web)

Puedes usar herramientas como:
- [AppIcon.co](https://www.appicon.co/)
- [Icon Kitchen](https://icon.kitchen/)
- Figma o Canva

Ver `assets/README.md` para más detalles.

## 📦 Estructura del Proyecto

```
radio-app/
├── App.js                    # Componente principal
├── app.json                  # Configuración de Expo
├── eas.json                  # Configuración de EAS Build
├── components/
│   ├── RadioPlayer.js       # Reproductor de radio principal
│   └── AdminPanel.js        # Panel de administración
├── assets/                   # Iconos y splash screen
├── scripts/                  # Scripts de utilidad
└── README.md                 # Este archivo
```

## ⚙️ Configuración

### Stream por Defecto

La aplicación viene configurada con:
```
https://radio.hqs.com.co:9004/stream
```

Puedes cambiarlo desde el panel de administración dentro de la app.

### Personalización

- **Colores**: Edita los colores en `App.js` y los componentes
- **Stream URL**: Cambia `STREAM_URL` en `components/RadioPlayer.js`
- **Configuración de app**: Modifica `app.json`

## 📱 Publicación en Tiendas

Consulta `PUBLICACION.md` para una guía completa sobre cómo publicar la app en:
- App Store (iOS)
- Google Play (Android)

### Comandos Rápidos

```bash
# Instalar EAS CLI
npm install -g eas-cli

# Login
eas login

# Construir para producción
eas build --platform all --profile production

# Enviar a tiendas
eas submit --platform ios
eas submit --platform android
```

## 🛠️ Tecnologías Utilizadas

- **React Native** - Framework multiplataforma
- **Expo** - Herramientas y servicios de desarrollo
- **Expo AV** - Reproducción de audio
- **AsyncStorage** - Almacenamiento local
- **Expo Linear Gradient** - Gradientes
- **Expo Blur** - Efectos de desenfoque

## 🐛 Solución de Problemas

### Error de conexión al stream

1. Verifica tu conexión a internet
2. Confirma que la URL del stream sea correcta
3. Verifica que el servidor IceCast esté funcionando
4. Revisa los logs en la consola

### Problemas de audio en iOS

- Asegúrate de que el modo silencioso esté desactivado o configurado correctamente
- Verifica los permisos de audio en Configuración > HQS Radio

### Problemas de audio en Android

- Verifica los permisos en Configuración > Apps > HQS Radio > Permisos
- Asegúrate de que la app tenga permiso para reproducir audio en segundo plano

## 📚 Documentación Adicional

El proyecto incluye documentación completa:

- **[QUICKSTART.md](QUICKSTART.md)** - Guía de inicio rápido
- **[PUBLICACION.md](PUBLICACION.md)** - Guía completa para publicar en las tiendas
- **[PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md)** - Estructura detallada del proyecto
- **[RESUMEN.md](RESUMEN.md)** - Resumen del estado del proyecto
- **[INDICE.md](INDICE.md)** - Índice completo de toda la documentación
- **[CONTRIBUTING.md](CONTRIBUTING.md)** - Guía para contribuir
- **[CHANGELOG.md](CHANGELOG.md)** - Historial de cambios
- **[assets/INSTRUCCIONES-ASSETS.md](assets/INSTRUCCIONES-ASSETS.md)** - Instrucciones para crear iconos

## 📄 Licencia

Propietario - HQS Radio

Ver [LICENSE](LICENSE) para más detalles.

## 👥 Soporte

Para soporte técnico o preguntas:
1. Revisa la documentación en los archivos `.md`
2. Ejecuta `npm run check-setup` para verificar la configuración
3. Consulta [INDICE.md](INDICE.md) para encontrar la documentación que necesitas

---

**Desarrollado con ❤️ para HQS Radio**

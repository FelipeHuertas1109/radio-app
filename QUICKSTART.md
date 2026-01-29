# Guía de Inicio Rápido - HQS Radio

Esta guía te ayudará a poner en marcha la aplicación rápidamente.

## 🚀 Instalación Rápida

### 1. Instalar Dependencias

```bash
npm install
```

### 2. Verificar Configuración

```bash
npm run check-setup
```

Este comando verificará que todos los archivos necesarios estén presentes.

### 3. Crear Assets (Opcional por ahora)

Los assets (iconos y splash screen) son necesarios para producción, pero puedes probar la app sin ellos:

```bash
npm run generate-assets
```

Esto creará instrucciones detalladas. Para producción, necesitarás crear los archivos PNG reales.

### 4. Iniciar la Aplicación

```bash
npm start
```

Luego:
- Presiona `i` para abrir en simulador iOS (requiere Mac)
- Presiona `a` para abrir en emulador Android
- Escanea el código QR con Expo Go en tu dispositivo móvil

### 5. Probar en iOS (Mac)

```bash
npm run ios
```

Esto abrirá el simulador de iOS automáticamente.

## 📱 Probar en Dispositivo Real

1. Instala **Expo Go** desde App Store o Google Play
2. Ejecuta `npm start`
3. Escanea el código QR que aparece en la terminal
4. La app se abrirá en Expo Go

## ⚙️ Configuración Básica

### Cambiar el Stream por Defecto

Edita `constants/Config.js`:

```javascript
defaultStreamUrl: 'https://tu-stream-url.com/stream'
```

O cambia el stream desde el panel de administración dentro de la app.

### Personalizar Colores

Edita `constants/Config.js`:

```javascript
colors: {
  primary: '#TU_COLOR_AQUI',
  // ...
}
```

## 🐛 Solución de Problemas Comunes

### Error: "Cannot find module"

```bash
rm -rf node_modules
npm install
```

### Error al iniciar en iOS

Asegúrate de tener Xcode instalado y el simulador configurado.

### Error al iniciar en Android

Asegúrate de tener Android Studio instalado y un emulador configurado.

### La app no reproduce audio

1. Verifica que la URL del stream sea correcta
2. Verifica tu conexión a internet
3. Verifica que el servidor IceCast esté funcionando
4. Revisa los logs en la consola

## 📦 Próximos Pasos

1. **Probar la funcionalidad básica**
   - Reproducir el stream
   - Cambiar volumen
   - Usar el panel de administración

2. **Crear los assets para producción**
   - Lee `assets/INSTRUCCIONES-ASSETS.md`
   - Crea los iconos y splash screen
   - Colócalos en la carpeta `assets/`

3. **Preparar para publicación**
   - Lee `PUBLICACION.md`
   - Configura EAS Build
   - Prepara los builds para las tiendas

## 📚 Documentación Adicional

- `README.md` - Documentación completa
- `PUBLICACION.md` - Guía de publicación
- `CONTRIBUTING.md` - Guía de contribución
- `assets/INSTRUCCIONES-ASSETS.md` - Instrucciones para assets

## 💡 Tips

- Usa `npm run check-setup` regularmente para verificar que todo esté bien
- Los cambios en el código se reflejan automáticamente (Hot Reload)
- Puedes usar Chrome DevTools para debugging web
- Usa React Native Debugger para debugging avanzado

## 🆘 ¿Necesitas Ayuda?

1. Revisa la documentación en `README.md`
2. Verifica los logs en la consola
3. Consulta la documentación de Expo: https://docs.expo.dev
4. Revisa los issues conocidos en el proyecto

---

¡Disfruta desarrollando con HQS Radio! 🎵


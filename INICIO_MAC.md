# 🍎 Guía de Inicio Rápido para Mac

## Instalación y Configuración

### 1. Verificar Node.js

```bash
node --version
```

Si no tienes Node.js o tienes una versión antigua:

```bash
# Usando Homebrew (recomendado)
brew install node@18

# O descarga desde: https://nodejs.org/
```

### 2. Instalar Dependencias

```bash
cd /ruta/a/radio-app
npm install
```

### 3. Iniciar la Aplicación

```bash
npm start
```

Esto abrirá Expo DevTools. Luego puedes:

- Presionar `i` para abrir en simulador iOS
- Presionar `a` para abrir en emulador Android
- Escanear el código QR con Expo Go en tu dispositivo

### 4. Probar en iOS (requiere Mac)

```bash
npm run ios
```

Esto abrirá el simulador de iOS automáticamente.

### 5. Probar en Android

```bash
npm run android
```

Requiere Android Studio y un emulador configurado.

## Comandos Útiles

```bash
# Verificar configuración
npm run check-setup

# Generar instrucciones para assets
npm run generate-assets

# Limpiar caché y reiniciar
npm start -- --clear
```

## Requisitos para iOS

- Mac con macOS
- Xcode instalado desde App Store
- Xcode Command Line Tools: `xcode-select --install`

## Requisitos para Android

- Android Studio instalado
- Emulador Android configurado
- O dispositivo Android físico con depuración USB habilitada

## Solución de Problemas

### Error: "Command not found: expo"
```bash
npm install -g expo-cli
```

### Error: "Cannot find module"
```bash
rm -rf node_modules
npm install
```

### El simulador iOS no se abre
```bash
# Abre Xcode y acepta la licencia
sudo xcodebuild -license accept

# Verifica que Xcode esté instalado
xcode-select -p
```

## Próximos Pasos

1. ✅ Instala dependencias: `npm install`
2. ✅ Inicia la app: `npm start`
3. ✅ Prueba en iOS: `npm run ios`
4. 📱 Crea los assets para producción (ver `assets/INSTRUCCIONES-ASSETS.md`)
5. 🚀 Publica en las tiendas (ver `PUBLICACION.md`)

---

¡Disfruta desarrollando en Mac! 🎉


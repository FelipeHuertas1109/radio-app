# Guía de Publicación - HQS Radio

Esta guía te ayudará a publicar HQS Radio en las tiendas de aplicaciones.

## Requisitos Previos

### Para iOS (App Store)
- Cuenta de Apple Developer ($99/año)
- Mac con Xcode instalado
- Certificado de desarrollo y perfil de aprovisionamiento

### Para Android (Google Play)
- Cuenta de Google Play Developer ($25 única vez)
- Keystore para firmar la aplicación

## Paso 1: Instalar EAS CLI

```bash
npm install -g eas-cli
eas login
```

## Paso 2: Configurar el Proyecto

El archivo `eas.json` ya está configurado. Verifica que los identificadores sean correctos:

- **iOS Bundle ID**: `com.hqs.radio`
- **Android Package**: `com.hqs.radio`

## Paso 3: Crear los Assets

Antes de construir, asegúrate de tener todos los assets en la carpeta `assets/`:

- `icon.png` (1024x1024px)
- `splash.png` (2048x2048px)
- `adaptive-icon.png` (1024x1024px)
- `favicon.png` (48x48px)

Puedes usar herramientas como:
- https://www.appicon.co/
- https://icon.kitchen/

## Paso 4: Configurar Credenciales

### iOS

```bash
eas build:configure
eas credentials
```

Sigue las instrucciones para:
1. Crear un certificado de distribución
2. Crear un perfil de aprovisionamiento
3. Configurar App Store Connect

### Android

```bash
eas build:configure
eas credentials
```

Si no tienes un keystore, EAS puede generar uno automáticamente.

## Paso 5: Construir la Aplicación

### Para iOS

```bash
eas build --platform ios --profile production
```

### Para Android

```bash
eas build --platform android --profile production
```

### Para ambas plataformas

```bash
eas build --platform all --profile production
```

## Paso 6: Enviar a las Tiendas

### App Store (iOS)

1. Ve a [App Store Connect](https://appstoreconnect.apple.com/)
2. Crea una nueva app
3. Completa la información requerida:
   - Nombre: HQS Radio
   - Categoría: Música
   - Descripción: Aplicación para escuchar transmisiones de radio en vivo
   - Capturas de pantalla
   - Icono de la app
   - Política de privacidad (si es requerida)

4. Una vez que el build esté listo:
```bash
eas submit --platform ios
```

### Google Play (Android)

1. Ve a [Google Play Console](https://play.google.com/console/)
2. Crea una nueva app
3. Completa la información requerida:
   - Nombre: HQS Radio
   - Categoría: Música y audio
   - Descripción: Aplicación para escuchar transmisiones de radio en vivo
   - Capturas de pantalla
   - Icono de la app
   - Política de privacidad (requerida)

4. Una vez que el build esté listo:
```bash
eas submit --platform android
```

## Información de la App

### Descripción Sugerida

```
HQS Radio es una aplicación móvil que te permite escuchar transmisiones de radio en vivo a través de streams IceCast 2. 

Características:
- Reproducción de alta calidad
- Controles avanzados de audio
- Panel de administración para gestionar múltiples streams
- Guardado de streams favoritos
- Reproducción en segundo plano
- Interfaz moderna e intuitiva

Disfruta de tu música favorita en cualquier momento y lugar.
```

### Palabras Clave Sugeridas

- radio
- música
- streaming
- audio
- live
- hqs
- radio en vivo

## Notas Importantes

1. **Política de Privacidad**: Google Play requiere una política de privacidad. Puedes crear una simple indicando que la app no recopila datos personales.

2. **Capturas de Pantalla**: Necesitarás capturas de pantalla en diferentes tamaños:
   - iOS: Varios tamaños según el dispositivo
   - Android: Mínimo 2 capturas, recomendado 4-8

3. **Versiones**: El sistema de versiones es automático gracias a `autoIncrement: true` en `eas.json`.

4. **Pruebas**: Antes de publicar, prueba la app en dispositivos reales usando builds de preview:
```bash
eas build --platform ios --profile preview
```

## Soporte

Si encuentras problemas durante el proceso de publicación, consulta:
- [Documentación de EAS](https://docs.expo.dev/build/introduction/)
- [Documentación de Expo](https://docs.expo.dev/)


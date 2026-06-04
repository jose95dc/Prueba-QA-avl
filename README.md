# mi-proyecto-qa-automation

Solución propuesta para prueba técnica de Ingeniero QA Automation.

## 1. Estrategia general

Este repositorio automatiza tres capas:

1. **Mobile**: Appium + WebdriverIO sobre Android.
2. **API**: Playwright API Testing + AJV para contratos JSON Schema.
3. **Eventos Kafka**: KafkaJS + Apache Kafka local con Docker Compose. Esta capa es opcional y suma bonus.

La prueba móvil es el foco principal porque representa el 35% de la evaluación. La API cubre integración, contratos y SLA. Kafka se implementa como valor agregado para simular telemetría vehicular.

## 2. Aplicación móvil elegida

SUT: **SauceLabs My Demo App Android**.

Descargar el APK desde el repositorio oficial de SauceLabs y guardarlo en:

```bash
apps/mda-2.0.1-23.apk
```

Si usas otro nombre de archivo, ajusta la variable `APP_PATH` en `.env`.

## 3. API elegida

SUT API: **Restful Booker**.

Base URL por defecto:

```bash
https://restful-booker.herokuapp.com
```

Se usa porque permite autenticación, creación y actualización de recursos.

## 4. Requisitos previos

Instala:

- Node.js LTS.
- Java JDK.
- Android Studio o Android SDK Command-line Tools.
- Appium.
- Driver UiAutomator2 de Appium.
- Appium Inspector.
- Docker Desktop, solo si ejecutarás Kafka.

## 5. Variables de entorno

Copia el archivo de ejemplo:

```bash
cp .env.example .env
```

En Windows PowerShell:

```powershell
Copy-Item .env.example .env
```

Contenido principal:

```env
API_BASE_URL=https://restful-booker.herokuapp.com
API_SLA_MS=1500
ANDROID_DEVICE_NAME=emulator-5554
APP_PATH=./apps/mda-2.0.1-23.apk
KAFKA_BROKERS=localhost:9092
KAFKA_TOPIC=gps-raw-events
```

## 6. Instalación del proyecto

```bash
npm install
npx playwright install
```

Instala Appium globalmente:

```bash
npm i --location=global appium
```

Instala el driver Android:

```bash
appium driver install uiautomator2
```

Valida Appium:

```bash
appium --version
appium driver list --installed
```

## 7. Preparar emulador Android

1. Abre Android Studio.
2. Entra a Device Manager.
3. Crea un emulador Android.
4. Inícialo.
5. Valida que ADB lo detecta:

```bash
adb devices
```

Debe aparecer algo como:

```text
emulator-5554   device
```

## 8. Ejecutar pruebas API

```bash
npm run test:api
```

Ver reporte:

```bash
npm run report
```

## 9. Ejecutar pruebas móviles

Confirma que:

1. El emulador está encendido.
2. El APK está en `apps/`.
3. `.env` tiene `APP_PATH` correcto.

Ejecuta:

```bash
npm run test:mobile
```

## 10. Ejecutar Kafka opcional

Levanta Kafka:

```bash
npm run kafka:up
```

Ejecuta la prueba:

```bash
npm run test:kafka
```

Apaga Kafka:

```bash
npm run kafka:down
```

## 11. Casos automatizados

### Mobile

| Caso | Riesgo cubierto |
|---|---|
| Login inválido | Manejo de errores y seguridad básica de acceso. |
| Login exitoso | Acceso a funcionalidad principal. |
| Navegar a producto y agregar al carrito | Cambio de estado visible y flujo crítico de usuario. |

### API

| Caso | Validaciones |
|---|---|
| POST `/auth` | Status 200, header JSON, token y SLA. |
| POST `/booking` | Payload dinámico, status, contrato JSON Schema, datos persistidos en respuesta y SLA. |
| PUT `/booking/{id}` | Autenticación con token, actualización, contrato y SLA. |

### Kafka

| Caso | Validaciones |
|---|---|
| Publicar/consumir evento `gps-raw-events` | Integridad del mensaje, estructura de telemetría, lat/lng válidos, speed numérico. |

## 12. Buenas prácticas aplicadas

- Page Object Model para aislar pantallas.
- Selectores estables: accessibilityId, resource-id y UiSelector.
- Evita XPath absoluto.
- Datos dinámicos para no depender de valores fijos.
- JSON Schema para contratos de API.
- Medición de SLA de respuesta.
- Variables de entorno para evitar hardcoding.
- Kafka separado como suite opcional para no bloquear los entregables obligatorios.

## 13. Video de sustentación sugerido

Duración: 3 a 5 minutos.

Guion:

1. Presentación personal y estrategia.
2. Mostrar estructura del repositorio.
3. Ejecutar `npm run test:api`.
4. Ejecutar `npm run test:mobile` con emulador visible.
5. Si aplica, ejecutar `npm run kafka:up` y `npm run test:kafka`.
6. Cerrar explicando problemas encontrados: selectores, sincronización, tiempos de respuesta y cómo se mitigaron.

## 14. Problemas comunes

### `adb` no se reconoce

Agrega `platform-tools` al PATH.

### Appium no encuentra el driver

Ejecuta:

```bash
appium driver install uiautomator2
```

### El APK no existe

Descarga el APK y ubícalo en `apps/`, o ajusta `APP_PATH`.

### Error de selector

Abre Appium Inspector y actualiza los selectores en `mobile-tests/page-objects`.

### SLA API falla

La API pública puede responder lento. Si falla, conserva la evidencia porque muestra que la prueba sí detecta incumplimiento de rendimiento.

## 15. Entregables

Subir a una carpeta:

1. Link del repositorio GitHub/GitLab.
2. `README.md`.
3. `AI_USAGE.md`.
4. Video de sustentación con rostro visible.
5. Evidencias: reportes, capturas o logs de ejecución.

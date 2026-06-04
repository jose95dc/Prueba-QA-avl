# AI_USAGE.md — Bitácora de Co-Pilotaje e IA

## 1. Herramientas utilizadas

| Herramienta | Uso dentro del reto |
|---|---|
| ChatGPT | Diseño de estrategia de pruebas, generación inicial de estructura del repositorio, explicación de instalación y revisión de riesgos. |
| GitHub Copilot o Cursor | Autocompletado de Page Objects, refactorización de selectores, generación de asserts repetitivos y apoyo en README. |
| Appium Inspector | No es IA, pero se usó como herramienta de apoyo para inspeccionar selectores reales del APK. |

## 2. Casos de uso específicos

1. Generación de boilerplate para WebdriverIO + Appium.
2. Creación de Page Objects para separar la lógica de pantallas.
3. Diseño de pruebas API con Playwright y validación JSON Schema.
4. Estructuración de pruebas Kafka con KafkaJS.
5. Revisión de README para que el ambiente sea reproducible.

## 3. Prompts utilizados

### Prompt 1
> Actúa como QA Automation Senior. Diseña una arquitectura de pruebas para una prueba técnica que exige automatización móvil Android con Appium, pruebas API con validación JSON Schema y bonus Kafka. Propón estructura de carpetas, herramientas open-source y criterios de priorización.

### Prompt 2
> Genera un ejemplo en TypeScript con Playwright API Testing para Restful Booker que cree una reserva con payload dinámico, valide status code, headers, JSON Schema y SLA menor a 1.5 segundos.

### Prompt 3
> Ayúdame a mejorar la robustez de selectores en Appium evitando XPath absoluto. Sugiere fallback entre accessibilityId, resource-id y UiSelector para una app Android de prueba.

## 4. Reflexión técnica

La IA permitió acelerar la creación de estructura inicial, ejemplos de configuración y casos base. Sin embargo, no se aceptó el código sin validación humana. Se revisaron los selectores con Appium Inspector, se separó la lógica en Page Objects para reducir mantenimiento y se mantuvieron validaciones explícitas para evitar falsos positivos.

La principal corrección aplicada fue evitar depender de XPath absolutos, porque son frágiles ante cambios visuales. También se agregó validación de contrato con JSON Schema y medición de SLA para cubrir no solo funcionalidad, sino calidad de integración.

## 5. Riesgos de alucinación y mitigación

| Riesgo | Mitigación |
|---|---|
| Selectores incorrectos sugeridos por IA | Verificación manual con Appium Inspector. |
| Status code diferente en API pública | Validación contra documentación y ejecución real. |
| Kafka local no disponible | docker-compose documentado y prueba separada del flujo obligatorio. |
| Dependencias desactualizadas | Uso de documentación oficial y `npm install` actualizado. |

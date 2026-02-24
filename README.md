# 🌤️ Weather Dash Pro

Una aplicación meteorológica moderna y minimalista construida con **JavaScript Vanilla**. Este proyecto demuestra el uso de APIs externas, optimización de rendimiento (Debouncing) y persistencia de datos.

---

## ⚠️ IMPORTANTE: Configuración de la API Key

Para garantizar la seguridad de la cuenta y seguir las buenas prácticas de desarrollo, **este repositorio no incluye una API Key activa**. 

Si deseas probar la aplicación, sigue estos pasos:

1.  Regístrate de forma gratuita en [OpenWeatherMap](https://openweathermap.org/) para obtener tu propia llave.
2.  Abre el archivo `main.js`.
3.  En la primera línea, sustituye el valor de `OPEN_WEATHER_API_KEY` por tu llave personal:
    ```javascript
    const OPEN_WEATHER_API_KEY = "TU_LLAVE_AQUI";
    ```
4.  Guarda el archivo y abre `index.html` en tu navegador.

---

## 🚀 Características Principales

- **Consumo de API REST:** Conexión en tiempo real con *OpenWeatherMap*.
- **Buscador con Autocompletado:** Implementación de la *Geocoding API* con técnica de **Debouncing** (500ms) para optimizar el consumo de red.
- **Diseño Adaptativo Dinámico:** La interfaz cambia su paleta de colores automáticamente dependiendo de la hora local de la ciudad y su estado climático.
- **Persistencia de Datos:** Uso de `localStorage` para recordar la última búsqueda.
- **UX Optimizada:** Soporte para búsqueda mediante tecla "Enter", indicadores de carga (Spinners) y validación visual de errores.

## 🛠️ Tecnologías Utilizadas

* **HTML5** Semántico.
* **CSS3** (Flexbox, Grid, Animaciones `@keyframes`, Glassmorphism).
* **JavaScript (ES6+)**:
    * `Fetch API` con `Async/Await`.
    * Manipulación dinámica del DOM.
    * Gestión de estados (Loading, Error, Success).

## 🧠 Desafíos Técnicos Superados

Uno de los mayores retos fue el manejo de la **asincronía** al realizar búsquedas rápidas. Se implementó un **Debounce** para evitar saturar la API con peticiones innecesarias mientras el usuario escribe. Además, se gestionó la lógica de zonas horarias para mostrar la hora local correcta de cada ciudad, independientemente de la ubicación del usuario.

---
Creado con ❤️ por Javier - Proyecto para Portfolio de Desarrollo Web.
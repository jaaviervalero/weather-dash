# 🌤️ Weather Dash Pro

Una aplicación meteorológica moderna y minimalista construida con **JavaScript Vanilla**. Este proyecto demuestra el uso de APIs externas, optimización de rendimiento y diseño adaptativo basado en el contexto del usuario.

## 🚀 Características Principales

- **Consumo de API REST:** Conexión en tiempo real con *OpenWeatherMap* para obtener datos meteorológicos precisos.
- **Buscador con Autocompletado:** Implementación de la *Geocoding API* con técnica de **Debouncing** (500ms) para optimizar el consumo de red y mejorar la experiencia de usuario.
- **Diseño Adaptativo Dinámico:** La interfaz cambia su paleta de colores automáticamente dependiendo de la hora local de la ciudad consultada y su estado climático.
- **Geolocalización:** Soporte para detección automática de ubicación mediante la *Web Geolocation API* nativa del navegador.
- **Persistencia de Datos:** Uso de `localStorage` para recordar la última ciudad buscada al recargar la página.
- **UX Optimizada:** Soporte para búsqueda mediante tecla "Enter", indicadores de carga (Spinners) y validación visual de errores.

## 🛠️ Tecnologías Utilizadas

* **HTML5** Semántico.
* **CSS3** (Flexbox, Grid, Animaciones `@keyframes`, Glassmorphism).
* **JavaScript (ES6+)**:
    * `Fetch API` con `Async/Await`.
    * Manejo de asincronía y Promesas.
    * Manipulación dinámica del DOM.
    * `localStorage` y `Geolocalización`.

## 📸 Capturas de Pantalla

[Aquí puedes añadir una captura de tu proyecto después de subirla a GitHub]

## 📋 Requisitos e Instalación

1. Clona este repositorio.
2. Abre el archivo `index.html` en tu navegador.
3. *Opcional:* Si deseas usar tu propia API Key, cámbiala en la constante `OPEN_WEATHER_API_KEY` dentro de `main.js`.

## 🧠 Desafíos Técnicos Superados

Uno de los mayores retos fue el cálculo de la **hora local real** de ciudades en diferentes zonas horarias, ya que el objeto `Date` de JavaScript utiliza la hora del sistema del usuario. Lo solucioné utilizando el desplazamiento de segundos (`timezone`) proporcionado por la API de OpenWeather para calcular el tiempo UTC y ajustarlo a la zona horaria destino.

---
Creado con ❤️ como proyecto de portfolio para Desarrollo Web.
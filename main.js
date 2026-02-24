const OPEN_WEATHER_API_KEY = "TU_API_KEY_AQUI"; // Reemplaza con tu clave de OpenWeatherMap
const searchButton = document.querySelector("#searchBtn");
const geoButton = document.querySelector("#geoBtn");
const cityInput = document.querySelector("#cityInput");
const weatherDiv = document.querySelector("#resultado");
const datalist = document.querySelector("#ciudades-sugeridas");

let timeoutId;

// --- INICIO ---
window.addEventListener("load", () => {
    const ultima = localStorage.getItem("ciudadGuardada");
    if (ultima) consultarClima(ultima);
});

// --- EVENTOS ---
searchButton.addEventListener("click", () => consultarClima(cityInput.value));
cityInput.addEventListener("keydown", (e) => e.key === "Enter" && consultarClima(cityInput.value));

geoButton.addEventListener("click", () => {
    if (navigator.geolocation) {
        weatherDiv.innerHTML = "<div class='spinner'></div><p>Solicitando ubicación...</p>";
        navigator.geolocation.getCurrentPosition(
            (pos) => consultarClimaPorCoords(pos.coords.latitude, pos.coords.longitude),
            () => {
                weatherDiv.innerHTML = "<p class='error'>📍 Ubicación bloqueada. Escribe la ciudad.</p>";
                cityInput.focus();
            }
        );
    }
});

cityInput.addEventListener("input", () => {
    clearTimeout(timeoutId);
    if (cityInput.value.length < 3) return;
    timeoutId = setTimeout(() => obtenerSugerencias(cityInput.value), 500);
});

// --- FUNCIONES DE API ---

async function consultarClima(ciudad) {
    if (!ciudad) return marcarErrorInput();
    mostrarCargando();
    
    try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${OPEN_WEATHER_API_KEY}&units=metric&lang=es`;
        const res = await fetch(url);
        const data = await res.json();
        procesarRespuesta(data);
    } catch (err) {
        weatherDiv.innerHTML = "<p class='error'>Error de conexión al servidor.</p>";
    }
}

async function consultarClimaPorCoords(lat, lon) {
    try {
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${OPEN_WEATHER_API_KEY}&units=metric&lang=es`;
        const res = await fetch(url);
        const data = await res.json();
        procesarRespuesta(data);
    } catch (err) {
        weatherDiv.innerHTML = "<p class='error'>Error al obtener clima por GPS.</p>";
    }
}

function obtenerSugerencias(query) {
    fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${OPEN_WEATHER_API_KEY}`)
        .then(res => res.json())
        .then(ciudades => {
            datalist.innerHTML = "";
            ciudades.forEach(c => {
                const opt = document.createElement("option");
                opt.value = `${c.name}${c.state ? ', ' + c.state : ''}, ${c.country}`;
                datalist.appendChild(opt);
            });
        });
}

// --- FUNCIONES DE INTERFAZ ---

function procesarRespuesta(data) {
    if (data.cod === 200) {
        localStorage.setItem("ciudadGuardada", data.name);
        const temp = Math.round(data.main.temp);
        const fechaUTC = new Date().getTime() + (new Date().getTimezoneOffset() * 60000);
        const fechaLocal = new Date(fechaUTC + (1000 * data.timezone));
        actualizarInterfaz(data, temp, fechaLocal.getHours());
    } else {
        weatherDiv.innerHTML = `<p class="error">Ciudad no encontrada ❌</p>`;
    }
}

function actualizarInterfaz(data, temp, hora) {
    cambiarFondo(data.weather[0].main, hora);
    weatherDiv.innerHTML = `
        <div class="weather-card">
            <h2>${data.name}, ${data.sys.country}</h2>
            <p style="font-size: 0.85rem; color: #666;">Hora local: ${hora}:00h</p>
            <div class="temp-main">${temp}°C</div>
            <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png" alt="icon">
            <p class="description">${data.weather[0].description}</p>
            <div class="details">
                <div>💧 Humedad: ${data.main.humidity}%</div>
                <div>💨 Viento: ${data.wind.speed} m/s</div>
            </div>
        </div>
    `;
}

function cambiarFondo(clima, hora) {
    let color = "";
    if (hora >= 20 || hora <= 6) {
        color = "linear-gradient(135deg, #141e30 0%, #243b55 100%)";
    } else {
        switch (clima) {
            case 'Clear': color = "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)"; break;
            case 'Clouds': color = "linear-gradient(135deg, #bdc3c7 0%, #2c3e50 100%)"; break;
            case 'Rain': case 'Drizzle': case 'Thunderstorm': color = "linear-gradient(135deg, #4b6cb7 0%, #182848 100%)"; break;
            default: color = "linear-gradient(135deg, #74ebd5 0%, #acb6e5 100%)";
        }
    }
    document.body.style.background = color;
}

function mostrarCargando() {
    weatherDiv.innerHTML = `<div class="spinner"></div>`;
}

function marcarErrorInput() {
    cityInput.style.border = "2px solid #ff4757";
    setTimeout(() => cityInput.style.border = "2px solid #eee", 2000);
}
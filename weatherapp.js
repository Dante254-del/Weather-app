

    // ===== JS =====
    const apiKey = "1fe7a0f972ad504ca144a73c6ca75ee1"; // <-- Replace with your API key

    document.getElementById("checkBtn").addEventListener("click", getWeather);

    async function getWeather() {
        const city = document.getElementById("citySelect").value;
        if (!city) {
            alert("Please select a city");
            return;
        }

        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

        try {
            const response = await fetch(url);
            const data = await response.json();

            if (data.cod !== 200) {
                alert("Error: " + data.message);
                return;
            }

            // Update the weather card
            document.getElementById("city").innerText = `${data.name}, ${data.sys.country}`;
            document.getElementById("temp").innerText = `🌡 Temperature: ${data.main.temp}°C`;
            document.getElementById("description").innerText = `🌥 Condition: ${data.weather[0].description}`;
            document.getElementById("humidity").innerText = `💧 Humidity: ${data.main.humidity}%`;
            document.getElementById("wind").innerText = `💨 Wind: ${data.wind.speed} m/s`;

            changeBackground(data.weather[0].main);

        } catch (error) {
            console.error(error);
            alert("Network error or invalid API key");
        }
    }

    function changeBackground(condition) {
        const body = document.body;

        switch (condition) {
            case "Clear":
                body.style.background = "linear-gradient(135deg, #fceabb, #f8b500)";
                break;
            case "Rain":
                body.style.background = "linear-gradient(135deg, #4e54c8, #8f94fb)";
                break;
            case "Clouds":
                body.style.background = "linear-gradient(135deg, #bdc3c7, #2c3e50)";
                break;
            case "Snow":
                body.style.background = "linear-gradient(135deg, #e6dada, #274046)";
                break;
            default:
                body.style.background = "linear-gradient(135deg, #4facfe, #00f2fe)";
        }
    }

// Import Firebase SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-database.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB8Na2C_2XVP3_SwkISldJY790So29ceGQ",
    authDomain: "esp8266-dht11-1c3f8.firebaseapp.com",
    databaseURL: "https://esp8266-dht11-1c3f8-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "esp8266-dht11-1c3f8",
    storageBucket: "esp8266-dht11-1c3f8.appspot.com",
    messagingSenderId: "247242159945",
    appId: "1:247242159945:web:32d9f271cd8313d8c70c98"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Initialize data arrays for the chart
const temperatureData = [];
const humidityData = [];
const labels = Array.from({ length: 10 }, (_, i) => i + 1); // Initial labels (1 to 10)

// Create chart
const ctx = document.getElementById('temperatureHumidityChart').getContext('2d');
const temperatureHumidityChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: labels,
        datasets: [
            {
                label: 'Temperature (°C)',
                data: temperatureData,
                borderColor: 'rgba(255, 99, 132, 1)',
                fill: false,
                pointBackgroundColor: 'rgba(255, 99, 132, 1)',
                pointRadius: 5
            },
            {
                label: 'Humidity (%)',
                data: humidityData,
                borderColor: 'rgba(54, 162, 235, 1)',
                fill: false,
                pointBackgroundColor: 'rgba(54, 162, 235, 1)',
                pointRadius: 5
            }
        ]
    },
    options: {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    color: 'rgba(0, 0, 0, 0.3)'
                },
                grid: {
                    color: 'rgba(0, 0, 0, 0.3)'
                }
            },
            x: {
                ticks: {
                    color: 'rgba(0, 0, 0, 0.3)'
                },
                grid: {
                    color: 'rgba(0, 0, 0, 0.3)'
                }
            }
        },
        plugins: {
            legend: {
                labels: {
                    color: 'rgba(0, 0, 0, 0.3)',
                    font: {
                        size: 14
                    }
                }
            },
            tooltip: {
                enabled: true
            },
            datalabels: {
                display: true,
                color: '#FFFFFF',
                font: {
                    size: 12
                },
                align: 'top',
                formatter: function(value) {
                    return `${value}°C`;
                }
            }
        }
    },
    plugins: [ChartDataLabels]
});

// Fetch temperature and humidity from the database
function fetchData() {
    const tempRef = ref(database, 'sensor/temperature'); // Path to temperature
    const humRef = ref(database, 'sensor/humidity');   // Path to humidity

    // Listen for changes in temperature
    onValue(tempRef, (snapshot) => {
        const temp = snapshot.val();
        if (temp !== null) {
            const formattedTemp = parseFloat(temp).toFixed(2); // Format to 2 decimal places
            updateChart(temperatureData, formattedTemp);
            document.getElementById('temp').innerText = `${formattedTemp}`;
        }
    });

    // Listen for changes in humidity
    onValue(humRef, (snapshot) => {
        const hum = snapshot.val();
        if (hum !== null) {
            const formattedHum = parseFloat(hum).toFixed(2);
            updateChart(humidityData, formattedHum);
            document.getElementById('hum').innerText = `${formattedHum}`;
        }
    });
}

// Update the chart with new data
function updateChart(dataArray, newValue) {
    if (dataArray.length >= 10) {
        dataArray.shift(); // Remove the oldest value
    }
    dataArray.push(newValue); // Add the new value
    temperatureHumidityChart.update(); // Update the chart
}

// Fetch data when the page loads
window.addEventListener('load', fetchData);

import React, { useState, useEffect } from 'react';

const WeatherDashboard = () => {
    const [city, setCity] = useState('London');
    const [weather, setWeather] = useState(null);
    const [input, setInput] = useState('');

    // Replace 'YOUR_API_KEY' with your actual OpenWeatherMap API key
    const API_KEY = 'c07c69d48392d181bb3ca03909839a71';

    const fetchWeather = async (targetCity) => {
        try {
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${targetCity}&units=metric&appid=${API_KEY}`
            );
            const data = await response.json();
            if (data.cod === 200) setWeather(data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    // Fetch default city on load
    useEffect(() => { fetchWeather(city); }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        if (input.trim()) {
            fetchWeather(input);
            setCity(input);
            setInput('');
        }
    };

    return (
        <div className="flex flex-col items-center gap-6 p-6 font-sans">
            {/* Search Input */}
            <form onSubmit={handleSearch} className="flex w-full max-w-sm gap-2">
                <input
                    className="w-full rounded-lg border px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Search city..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />
                <button className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
                    Search
                </button>
            </form>

            {/* Weather Card */}
            {weather && (
                <div className="w-full max-w-sm rounded-3xl bg-gradient-to-br from-blue-400 to-blue-700 p-8 text-white shadow-lg">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold">{weather.name}</h2>
                        <img
                            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`}
                            alt="icon"
                            className="mx-auto h-32 w-32"
                        />
                        <p className="text-6xl font-black">{Math.round(weather.main.temp)}°C</p>
                        <p className="mt-2 text-xl capitalize opacity-80">{weather.weather[0].description}</p>
                    </div>

                    <div className="mt-8 flex justify-between border-t border-white/20 pt-6 text-sm">
                        <div className="text-center">
                            <p className="opacity-70">Humidity</p>
                            <p className="font-bold">{weather.main.humidity}%</p>
                        </div>
                        <div className="text-center">
                            <p className="opacity-70">Wind Speed</p>
                            <p className="font-bold">{weather.wind.speed} m/s</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default WeatherDashboard;
import React, { useState, useEffect } from 'react';
import { My_API_Ey } from '../../../secret';

const MovieApp = () => {
    const [movies, setMovies] = useState([]);
    const [query, setQuery] = useState('');
    const [favorites, setFavorites] = useState([]);
    const API_KEY = My_API_Ey; // Replace with your actual key

    // 1. Fetch Movies from TMDB
    const searchMovies = async (e) => {
        e.preventDefault();
        if (!query) return;

        const url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}`;
        try {
            const res = await fetch(url);
            const data = await res.json();
            setMovies(data.results || []);
        } catch (err) {
            console.error("Fetch error:", err);
        }
    };

    // 2. Favorite Logic
    const toggleFavorite = (movie) => {
        if (favorites.find((fav) => fav.id === movie.id)) {
            setFavorites(favorites.filter((fav) => fav.id !== movie.id)); // Remove
        } else {
            setFavorites([...favorites, movie]); // Add
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white p-8">
            <div className="max-w-6xl mx-auto">

                {/* Header & Search Bar */}
                <header className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
                    <h1 className="text-3xl font-bold text-blue-500">MovieFlix</h1>
                    <form onSubmit={searchMovies} className="flex w-full md:w-auto">
                        <input
                            type="text"
                            placeholder="Search for a movie..."
                            className="px-4 py-2 w-full md:w-80 rounded-l-md bg-gray-800 border-none focus:ring-2 focus:ring-blue-500 text-white outline-none"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                        />
                        <button
                            type="submit"
                            className="bg-blue-600 px-6 py-2 rounded-r-md hover:bg-blue-700 transition"
                        >
                            Search
                        </button>
                    </form>
                </header>

                {/* Results Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {movies.map((movie) => (
                        <div key={movie.id} className="bg-gray-800 rounded-xl overflow-hidden shadow-lg transition-transform hover:scale-105">
                            <img
                                src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'https://via.placeholder.com/500x750?text=No+Image'}
                                alt={movie.title}
                                className="w-full h-80 object-cover"
                            />
                            <div className="p-4">
                                <h3 className="font-semibold text-lg truncate">{movie.title}</h3>
                                <div className="flex justify-between items-center mt-3">
                                    <span className="text-yellow-400 text-sm">⭐ {movie.vote_average}</span>
                                    <button
                                        onClick={() => toggleFavorite(movie)}
                                        className={`px-3 py-1 rounded text-sm font-medium transition ${favorites.find(f => f.id === movie.id)
                                            ? 'bg-red-500 text-white'
                                            : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                                            }`}
                                    >
                                        {favorites.find(f => f.id === movie.id) ? '♥ Favorited' : '♡ Favorite'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Empty State */}
                {movies.length === 0 && (
                    <p className="text-center text-gray-500 mt-20">Start searching to see some movie magic!</p>
                )}
            </div>
        </div>
    );
};

export default MovieApp;
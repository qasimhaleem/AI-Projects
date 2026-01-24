import React, { useState } from 'react';
import { My_Recipe } from '../../../secret';

const RecipeBook = () => {
    const [ingredient, setIngredient] = useState('');
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(false);

    // Get a free key from spoonacular.com/food-api/console
    const API_KEY = "YOUR_SPOONACULAR_API_KEY";

    const searchRecipes = async (e) => {
        e.preventDefault();
        if (!ingredient) return;

        setLoading(true);
        try {
            // We use 'complexSearch' and add 'addRecipeInformation' to get time and nutrition
            const res = await fetch(
                `https://api.spoonacular.com/recipes/complexSearch?query=${ingredient}&addRecipeNutrition=true&number=6&apiKey=${My_Recipe}`
            );
            const data = await res.json();
            setRecipes(data.results || []);
        } catch (err) {
            console.error("Fetch error:", err);
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen bg-slate-50 p-6 font-sans text-slate-900">
            <div className="max-w-5xl mx-auto">
                {/* Header Section */}
                <header className="text-center mb-12">
                    <h1 className="text-4xl font-extrabold text-orange-600 mb-2">Chef's Palette 🍳</h1>
                    <p className="text-slate-500">Search by ingredient to find your next meal</p>
                </header>

                {/* Search Input */}
                <form onSubmit={searchRecipes} className="max-w-md mx-auto flex gap-2 mb-12">
                    <input
                        type="text"
                        placeholder="Enter ingredient (e.g. Pasta)"
                        className="flex-1 px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-orange-500 outline-none transition-all"
                        value={ingredient}
                        onChange={(e) => setIngredient(e.target.value)}
                    />
                    <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-bold transition-colors">
                        Find
                    </button>
                </form>

                {/* Results Grid */}
                {loading ? (
                    <div className="text-center text-xl font-medium animate-pulse">Heating up the stove...</div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {recipes.map((recipe) => (
                            <div key={recipe.id} className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-xl transition-shadow group">
                                {/* Image Container */}
                                <div className="relative h-52">
                                    <img src={recipe.image} alt={recipe.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-orange-700">
                                        {recipe.readyInMinutes} mins
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-5">
                                    <h3 className="text-lg font-bold mb-3 line-clamp-1">{recipe.title}</h3>

                                    <div className="flex items-center justify-between">
                                        <div className="flex flex-col">
                                            <span className="text-xs text-slate-400 uppercase font-bold tracking-wider">Calories</span>
                                            <span className="text-lg font-semibold text-slate-700">
                                                {Math.round(recipe.nutrition?.nutrients.find(n => n.name === 'Calories')?.amount || 0)} kcal
                                            </span>
                                        </div>

                                        <button className="text-orange-500 font-bold text-sm hover:underline">
                                            View Steps →
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default RecipeBook;
import React, { useState, useEffect } from 'react';

const CryptoTracker = () => {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  // 1. Fetch data from CoinGecko API
  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const response = await fetch(
          'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false'
        );
        const data = await response.json();
        setCoins(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching crypto data:", error);
        setLoading(false);
      }
    };

    fetchCoins();
    // Optional: Set an interval to refresh prices every 60 seconds
    const interval = setInterval(fetchCoins, 60000);
    return () => clearInterval(interval);
  }, []);

  // 2. Filter logic for the search bar
  const filteredCoins = coins.filter((coin) =>
    coin.name.toLowerCase().includes(search.toLowerCase()) ||
    coin.symbol.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-blue-400">Crypto Live Tracker</h1>
        
        {/* Search Bar */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search for a coin (e.g. Bitcoin)..."
            className="w-full p-4 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:border-blue-500 transition shadow-lg"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Coin List Table */}
        <div className="bg-gray-800 rounded-xl shadow-2xl overflow-hidden">
          {loading ? (
            <div className="p-10 text-center text-xl animate-pulse">Loading market data...</div>
          ) : (
            <table className="w-full text-left">
              <thead className="bg-gray-700 text-gray-400 uppercase text-sm">
                <tr>
                  <th className="p-4">Coin</th>
                  <th className="p-4">Price (USD)</th>
                  <th className="p-4">24h Change</th>
                  <th className="p-4 hidden md:table-cell">Market Cap</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {filteredCoins.map((coin) => (
                  <tr key={coin.id} className="hover:bg-gray-750 transition">
                    <td className="p-4 flex items-center space-x-3">
                      <img src={coin.image} alt={coin.name} className="w-8 h-8" />
                      <div>
                        <p className="font-bold">{coin.name}</p>
                        <p className="text-xs text-gray-400 uppercase">{coin.symbol}</p>
                      </div>
                    </td>
                    <td className="p-4 font-mono">
                      ${coin.current_price.toLocaleString()}
                    </td>
                    <td className={`p-4 font-semibold ${coin.price_change_percentage_24h > 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {coin.price_change_percentage_24h.toFixed(2)}%
                    </td>
                    <td className="p-4 text-gray-400 hidden md:table-cell">
                      ${coin.market_cap.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          
          {!loading && filteredCoins.length === 0 && (
            <div className="p-10 text-center text-gray-500">No coins found matching "{search}"</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CryptoTracker;
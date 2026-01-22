import React, { useState } from 'react';

export default function GithubFinder() {
  const [username, setUsername] = useState('');
  const [user, setUser] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchGithubData = async () => {
    if (!username) return;
    setLoading(true);
    try {
      // Fetch User Profile
      const userRes = await fetch(`https://api.github.com/users/${username}`);
      const userData = await userRes.json();
      
      // Fetch User Repos (limit to 6)
      const reposRes = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=6`);
      const reposData = await reposRes.json();

      setUser(userData);
      setRepos(Array.isArray(reposData) ? reposData : []);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 min-h-screen">
      {/* Search Section */}
      <div className="flex gap-2 mb-8">
        <input 
          type="text"
          placeholder="Enter GitHub username (e.g. facebook)"
          className="flex-1 p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button 
          onClick={fetchGithubData}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
      </div>

      {user && user.login && (
        <div className="space-y-6">
          {/* Profile Card */}
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 flex flex-col md:flex-row items-center gap-6">
            <img src={user.avatar_url} alt={user.name} className="w-32 h-32 rounded-full border-4 border-blue-100" />
            <div className="text-center md:text-left flex-1">
              <h1 className="text-2xl font-bold text-gray-800">{user.name || user.login}</h1>
              <p className="text-gray-500">@{user.login}</p>
              <p className="mt-2 text-gray-600">{user.bio || "No bio available"}</p>
              <div className="flex gap-4 mt-4 justify-center md:justify-start">
                <span className="bg-gray-100 px-3 py-1 rounded-full text-sm font-medium">Followers: {user.followers}</span>
                <span className="bg-gray-100 px-3 py-1 rounded-full text-sm font-medium">Repos: {user.public_repos}</span>
              </div>
            </div>
            <a href={user.html_url} target="_blank" rel="noreferrer" className="bg-black text-white px-4 py-2 rounded-md text-sm">View Profile</a>
          </div>

          {/* Repositories Grid */}
          <h3 className="text-xl font-bold text-gray-700">Latest Repositories</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {repos.map(repo => (
              <div key={repo.id} className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition">
                <a href={repo.html_url} target="_blank" rel="noreferrer" className="text-blue-600 font-bold hover:underline">{repo.name}</a>
                <p className="text-gray-500 text-sm mt-1 line-clamp-2">{repo.description || "No description"}</p>
                <div className="mt-3 flex gap-3 text-xs text-gray-400">
                  <span>⭐ {repo.stargazers_count}</span>
                  <span>🍴 {repo.forks_count}</span>
                  <span>{repo.language}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
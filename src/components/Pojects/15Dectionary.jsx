import React, { useState } from 'react';
import { Search, Volume2, BookOpen, ExternalLink, AlertCircle } from 'lucide-react';

const DictionaryApp = () => {
  const [word, setWord] = useState('');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchDefinition = async (e) => {
    e.preventDefault();
    if (!word) return;
    
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
      const result = await res.json();
      
      if (res.ok) {
        setData(result[0]);
      } else {
        setError(result.message || "Word not found");
        setData(null);
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const playAudio = () => {
    const audioObj = data?.phonetics.find(p => p.audio !== "");
    if (audioObj) {
      new Audio(audioObj.audio).play();
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 p-6 font-sans">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <header className="flex items-center gap-3 mb-8">
          <BookOpen className="text-indigo-600 w-8 h-8" />
          <h1 className="text-2xl font-bold tracking-tight">Lexicon.</h1>
        </header>

        {/* Search Bar */}
        <form onSubmit={fetchDefinition} className="relative mb-10 group">
          <input 
            type="text"
            className="w-full bg-white border-none shadow-sm rounded-2xl py-4 pl-6 pr-14 text-lg focus:ring-2 focus:ring-indigo-500 transition-all outline-none"
            placeholder="Search any word..."
            value={word}
            onChange={(e) => setWord(e.target.value)}
          />
          <button type="submit" className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors">
            <Search size={20} />
          </button>
        </form>

        {/* Status Messages */}
        {loading && <div className="text-center animate-pulse text-slate-500">Searching...</div>}
        {error && (
          <div className="flex items-center gap-2 p-4 bg-red-50 text-red-600 rounded-xl border border-red-100">
            <AlertCircle size={20} />
            <p>{error}</p>
          </div>
        )}

        {/* Results Card */}
        {data && !loading && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-5xl font-black text-slate-800 mb-2">{data.word}</h2>
                <p className="text-indigo-600 text-xl font-medium tracking-wide italic">{data.phonetic}</p>
              </div>
              <button 
                onClick={playAudio}
                className="p-5 bg-indigo-100 text-indigo-600 rounded-full hover:bg-indigo-200 transition-all active:scale-95"
              >
                <Volume2 fill="currentColor" size={28} />
              </button>
            </div>

            {data.meanings.map((meaning, idx) => (
              <section key={idx} className="space-y-4">
                <div className="flex items-center gap-4">
                  <h3 className="text-xl font-bold italic">{meaning.partOfSpeech}</h3>
                  <div className="h-px bg-slate-200 flex-1"></div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-slate-400 font-medium">Meaning</h4>
                  <ul className="space-y-3">
                    {meaning.definitions.map((def, i) => (
                      <li key={i} className="flex gap-4">
                        <span className="text-indigo-400 font-bold">•</span>
                        <div>
                          <p className="text-slate-700 leading-relaxed">{def.definition}</p>
                          {def.example && <p className="text-slate-400 mt-1">"{def.example}"</p>}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                {meaning.synonyms.length > 0 && (
                  <div className="flex flex-wrap gap-3 mt-4">
                    <span className="text-slate-400 font-medium">Synonyms:</span>
                    {meaning.synonyms.slice(0, 5).map((syn, i) => (
                      <span key={i} className="text-indigo-600 font-semibold hover:underline cursor-pointer">{syn}</span>
                    ))}
                  </div>
                )}
              </section>
            ))}

            <footer className="pt-8 border-t border-slate-200">
              <a 
                href={data.sourceUrls[0]} 
                target="_blank" 
                rel="noreferrer"
                className="text-xs text-slate-400 flex items-center gap-2 hover:text-slate-600 transition-colors"
              >
                Source: {data.sourceUrls[0]} <ExternalLink size={12} />
              </a>
            </footer>
          </div>
        )}
      </div>
    </div>
  );
};

export default DictionaryApp;
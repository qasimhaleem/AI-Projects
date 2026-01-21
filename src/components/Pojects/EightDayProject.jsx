import React, { useState, useCallback, useEffect } from 'react';
import { Copy, RefreshCw, Check } from 'lucide-react';

const PasswordGenerator = () => {
    const [password, setPassword] = useState('');
    const [length, setLength] = useState(16);
    const [copied, setCopied] = useState(false);

    // 7 Password Options
    const [options, setOptions] = useState({
        uppercase: true,
        lowercase: true,
        numbers: true,
        symbols: true,
        extraSymbols: false, // e.g., []{}()<>
        spaces: false,
        ambiguous: false,    // e.g., l, 1, O, 0
    });

    const generatePassword = useCallback(() => {
        let charset = "";
        if (options.lowercase) charset += "abcdefghijklmnopqrstuvwxyz";
        if (options.uppercase) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        if (options.numbers) charset += "0123456789";
        if (options.symbols) charset += "!@#$%^&*-_=+";
        if (options.extraSymbols) charset += "()[]{}<>?/\\|";
        if (options.spaces) charset += " ";

        let finalCharset = charset;
        if (options.ambiguous) {
            finalCharset = charset.replace(/[l1O0I|]/g, "");
        }

        if (finalCharset === "") {
            setPassword("Select at least one option");
            return;
        }

        let generatedPassword = "";
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * finalCharset.length);
            generatedPassword += finalCharset[randomIndex];
        }
        setPassword(generatedPassword);
    }, [length, options]);

    // Generate on initial load
    useEffect(() => {
        generatePassword();
    }, [generatePassword]);

    const copyToClipboard = async () => {
        if (password && password !== "Select at least one option") {
            await navigator.clipboard.writeText(password);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    const handleCheckboxChange = (key) => {
        setOptions(prev => ({ ...prev, [key]: !prev[key] }));
    };

    return (
        <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4 font-sans">
            <div className="w-full max-w-md bg-slate-800 rounded-2xl shadow-2xl p-6 border border-slate-700">
                <h2 className="text-2xl font-bold text-white mb-6 text-center">Password Generator</h2>

                {/* Output Area */}
                <div className="relative mb-6">
                    <input
                        type="text"
                        value={password}
                        readOnly
                        className="w-full bg-slate-950 text-emerald-400 p-4 pr-24 rounded-lg border border-slate-700 text-lg font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                    />
                    <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-2">
                        <button
                            onClick={generatePassword}
                            className="p-2 text-slate-400 hover:text-white transition-colors"
                            title="Regenerate"
                        >
                            <RefreshCw size={20} />
                        </button>
                        <button
                            onClick={copyToClipboard}
                            className={`p-2 rounded-md transition-all ${copied ? 'bg-emerald-600 text-white' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'}`}
                        >
                            {copied ? <Check size={20} /> : <Copy size={20} />}
                        </button>
                    </div>
                </div>

                {/* Length Slider */}
                <div className="mb-6">
                    <div className="flex justify-between mb-2">
                        <label className="text-slate-400 text-sm">Password Length</label>
                        <span className="text-emerald-400 font-bold">{length}</span>
                    </div>
                    <input
                        type="range"
                        min="6"
                        max="50"
                        value={length}
                        onChange={(e) => setLength(e.target.value)}
                        className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                    />
                </div>

                {/* Checkbox Options Grid */}
                <div className="grid grid-cols-1 gap-3">
                    {Object.keys(options).map((key) => (
                        <label key={key} className="flex items-center group cursor-pointer">
                            <div className="relative flex items-center">
                                <input
                                    type="checkbox"
                                    checked={options[key]}
                                    onChange={() => handleCheckboxChange(key)}
                                    className="peer h-5 w-5 cursor-pointer appearance-none rounded border border-slate-600 bg-slate-700 checked:bg-emerald-500 checked:border-emerald-500 transition-all"
                                />
                                <span className="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                </span>
                            </div>
                            <span className="ml-3 text-slate-300 text-sm capitalize group-hover:text-white transition-colors">
                                Include {key.replace(/([A-Z])/g, ' $1').trim()}
                            </span>
                        </label>
                    ))}
                </div>

                <button
                    onClick={generatePassword}
                    className="w-full mt-8 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 rounded-lg transition-colors shadow-lg shadow-emerald-900/20"
                >
                    GENERATE PASSWORD
                </button>
            </div>
        </div>
    );
};

export default PasswordGenerator;
import React, { useState } from 'react';

const UnitConverter = () => {
  const [activeTab, setActiveTab] = useState('length'); // 'length' or 'weight'
  const [value, setValue] = useState({ unitA: '', unitB: '' });

  // Conversion Factors
  const conversionRates = {
    length: 3.28084, // 1 Meter = 3.28084 Feet
    weight: 2.20462, // 1 Kilogram = 2.20462 Pounds
  };

  const handleInputChange = (e, source) => {
    const val = e.target.value;
    const rate = conversionRates[activeTab];

    if (val === '') {
      setValue({ unitA: '', unitB: '' });
      return;
    }

    const numValue = parseFloat(val);

    if (source === 'A') {
      // Converting from primary (m/kg) to secondary (ft/lb)
      setValue({
        unitA: val,
        unitB: (numValue * rate).toFixed(2),
      });
    } else {
      // Converting from secondary (ft/lb) back to primary (m/kg)
      setValue({
        unitA: (numValue / rate).toFixed(2),
        unitB: val,
      });
    }
  };

  const resetFields = (tab) => {
    setActiveTab(tab);
    setValue({ unitA: '', unitB: '' });
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-lg border border-gray-200">
      <h2 className="text-2xl font-bold text-center mb-6 text-indigo-600">Unit Converter</h2>
      
      {/* Tab Switcher */}
      <div className="flex mb-6 bg-gray-100 p-1 rounded-lg">
        <button
          onClick={() => resetFields('length')}
          className={`flex-1 py-2 rounded-md transition ${activeTab === 'length' ? 'bg-white shadow text-indigo-600' : 'text-gray-500'}`}
        >
          Length (m/ft)
        </button>
        <button
          onClick={() => resetFields('weight')}
          className={`flex-1 py-2 rounded-md transition ${activeTab === 'weight' ? 'bg-white shadow text-indigo-600' : 'text-gray-500'}`}
        >
          Weight (kg/lb)
        </button>
      </div>

      <div className="space-y-4">
        {/* Input A */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {activeTab === 'length' ? 'Meters' : 'Kilograms'}
          </label>
          <input
            type="number"
            value={value.unitA}
            onChange={(e) => handleInputChange(e, 'A')}
            placeholder="Enter value"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
          />
        </div>

        <div className="flex justify-center text-gray-400">
          <span className="text-xl">⇌</span>
        </div>

        {/* Input B */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {activeTab === 'length' ? 'Feet' : 'Pounds'}
          </label>
          <input
            type="number"
            value={value.unitB}
            onChange={(e) => handleInputChange(e, 'B')}
            placeholder="Result"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
          />
        </div>
      </div>
      
      <p className="mt-6 text-center text-xs text-gray-400 uppercase tracking-widest">
        Real-time Updates Enabled
      </p>
    </div>
  );
};

export default UnitConverter;
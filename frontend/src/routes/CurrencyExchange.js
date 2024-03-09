import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CurrencyExchange = () => {
  const [baseCurrency, setBaseCurrency] = useState('USD');
  const [conversionRates, setConversionRates] = useState({});
  const [targetCurrency, setTargetCurrency] = useState('');
  const [amount, setAmount] = useState(0);
  const [result, setResult] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://v6.exchangerate-api.com/v6/b1785aebc464cd8356f2f3d1/latest/${baseCurrency}`);
        setConversionRates(response.data.conversion_rates);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [baseCurrency]);

  const handleConversion = () => {
    setResult(amount * conversionRates[targetCurrency]);
  };

  return (
    <div>
      <h1>Currency Converter</h1>
      <div>
        <label htmlFor="baseCurrency">Base Currency:</label>
        <select id="baseCurrency" value={baseCurrency} onChange={(e) => setBaseCurrency(e.target.value)}>
          {Object.keys(conversionRates).map((currency) => (
            <option key={currency} value={currency}>{currency}</option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="targetCurrency">Target Currency:</label>
        <select id="targetCurrency" value={targetCurrency} onChange={(e) => setTargetCurrency(e.target.value)}>
          {Object.keys(conversionRates).map((currency) => (
            <option key={currency} value={currency}>{currency}</option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="amount">Amount:</label>
        <input type="number" id="amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
      </div>
      <button onClick={handleConversion}>Convert</button>
      {result !== 0 && (
        <div>
          <h2>Result:</h2>
          <p>{result.toFixed(2)} {targetCurrency}</p>
        </div>
      )}
    </div>
  );
};

export default CurrencyExchange;

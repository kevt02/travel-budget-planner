import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CurrencyExchange.css'; // Import the CSS file

const CurrencyExchange = () => {
  const [baseCurrency, setBaseCurrency] = useState('USD');
  const [conversionRates, setConversionRates] = useState({});
  const [targetCurrency, setTargetCurrency] = useState('EUR');
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

  useEffect(() => {
    if (amount && targetCurrency && conversionRates[targetCurrency]) {
      const convertedAmount = amount * conversionRates[targetCurrency];
      setResult(convertedAmount);
    }
  }, [amount, targetCurrency, conversionRates]);

  return (
    <div>
      <h1>Currency Converter</h1>
      <div className="currency-exchange-container">
        <div className="base">
          <label class="form-label mt-4" htmlFor="baseCurrency" >Base Currency:</label>
          <select class="form-select" value={baseCurrency} onChange={(e) => setBaseCurrency(e.target.value)}>
            {Object.keys(conversionRates).map((currency) => (
              <option key={currency} value={currency}>{currency}</option>
            ))}
          </select>
          <label class="form-label mt-4" htmlFor="amount">Amount:</label>
          <input type="number" class="form-control" id="amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
        </div>
        <div className="target">
          <label class="form-label mt-4" htmlFor="targetCurrency">Target Currency:</label>
          <select class="form-select" value={targetCurrency} onChange={(e) => setTargetCurrency(e.target.value)}>
            {Object.keys(conversionRates).map((currency) => (
              <option key={currency} value={currency}>{currency}</option>
            ))}
          </select>
          <label class="form-label mt-4" htmlFor="result">Result:</label>
          <input type="text" class="form-control" id="result" value={`${result.toFixed(2)} ${targetCurrency}`} readOnly />
        </div>
      </div>
    </div>
  );
};

export default CurrencyExchange;

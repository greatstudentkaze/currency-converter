'use strict';

const inputAmount = document.querySelector('.converter__input[name="input-amount"]'),
  outputAmount = document.querySelector('.converter__input[name="output-amount"]'),
  convertBtn = document.querySelector('.js-convert');

const getCurrencyData = async (url, currencyFrom = 'USD', currencyTo = 'RUB') => {
  const response = await fetch(`${url}?base=${currencyFrom.toUpperCase()}`);

  if (!response.ok) throw new Error(response.status);

  const data = await response.json();

  outputAmount.value = (inputAmount.value * data.rates[currencyTo]).toFixed(3);

  return data;
};

getCurrencyData('https://api.exchangeratesapi.io/latest')
  .catch(err => console.error(err));

convertBtn.addEventListener('click', () => {
  getCurrencyData('https://api.exchangeratesapi.io/latest')
    .catch(err => console.error(err));
});

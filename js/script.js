'use strict';

const currencyFieldset = document.querySelector('.js-currency'),
  inputAmount = document.querySelector('.converter__input[id="input-amount"]'),
  inputLabel = document.querySelector('.converter__label[for="input-amount"]'),
  outputAmount = document.querySelector('.converter__input[id="output-amount"]'),
  outputLabel = document.querySelector('.converter__label[for="output-amount"]'),
  convertBtn = document.querySelector('.js-convert');

let currencyFrom = currencyFieldset.querySelector('input[name="currency-from"]:checked'),
  currencyTo = currencyFieldset.querySelector('input[name="currency-to"]:checked');

const currencyMap = new Map([
  ['USD', 'Доллар США (USD)'],
  ['EUR', 'Евро (USD)'],
  ['RUB', 'Российский рубль (RUB)'],
]);

const updateCurrencyLabel = (label, currency) => {
  label.textContent = currencyMap.get(currency);
};

const getCurrencyData = async (currencyFrom = 'USD', currencyTo = 'RUB', url = 'https://api.exchangeratesapi.io/latest') => {
  const response = await fetch(`${url}?base=${currencyFrom.toUpperCase()}`);

  if (!response.ok) throw new Error(response.status);

  const data = await response.json();

  const rate = data.rates[currencyTo] ? data.rates[currencyTo] : 1;
  outputAmount.value = (inputAmount.value * rate).toFixed(3);

  return data;
};

getCurrencyData(currencyFrom.value, currencyTo.value)
  .catch(err => console.error(err));

currencyFieldset.addEventListener('input', evt => {
  const target = evt.target;

  if (!target.matches('input[type="radio"]')) return;

  if (target.name === 'currency-from') {
    currencyFrom = target;
    updateCurrencyLabel(inputLabel, target.value);
  } else if (target.name === 'currency-to') {
    currencyTo = target;
    updateCurrencyLabel(outputLabel, target.value);
  }

  getCurrencyData(currencyFrom.value, currencyTo.value)
    .catch(err => console.error(err));
});

convertBtn.addEventListener('click', () => {
  getCurrencyData(currencyFrom.value, currencyTo.value)
    .catch(err => console.error(err));
});

import './css/styles.css';
import debounce from 'lodash.debounce';
import { fetchCountries } from './fetchCountries';
import Notiflix from 'notiflix';

const inputEl = document.querySelector('#search-box');
const countryListEl = document.querySelector('.country-list');
const countryInfoEl = document.querySelector('.country-info');

const DEBOUNCE_DELAY = 300;

function renderCountries(allCountry) {
  const countries = allCountry.filter(country =>
    country.name.common.toLowerCase().includes(inputEl.value.trim())
  );

  let countriesName;

  if (countries.length === 1) {
    countriesName = countries
      .map(country => {
        return `<li class="list"><div class="country-list__single-item"><img width=50px height=30px src="${
          country.flags.png
        }" alt="Flag of ${country.name.common}" />
      <h1> ${country.name.common}<h1></div>
      <p><span class="header">Capital:</span> ${country.capital}</p>
      <p><span class="header">Population:</span> ${country.population}</p>
      <p><span class="header">Languages:</span> ${Object.values(
        country.languages
      )}</p></li>`;
      })
      .join('');
  } else {
    countriesName = countries
      .map(country => {
        return `<li class="country-list__item list"><img width=50px height=auto src="${country.flags.png}" alt="Flag of ${country.name.common}" />
      <p> ${country.name.common}<p></li>`;
      })
      .join('');
  }

  if (inputEl.value === '') {
    countryListEl.innerHTML = '';
  }

  countryListEl.innerHTML = countriesName;
  numberOfCountries(countries);
}

function numberOfCountries(arrayOfCountries) {
  if (arrayOfCountries.length > 10) {
    countryListEl.innerHTML = '';
    Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
  }
  if (arrayOfCountries.length === 0) {
    inputEl.value = '';
    Notiflix.Notify.failure('"Oops, there is no country with that name"');
  }
}

inputEl.addEventListener(
  'input',
  debounce(
    () =>
      fetchCountries()
        .then(country => {
          renderCountries(country);
        })
        .catch(error => console.log(error)),
    DEBOUNCE_DELAY
  )
);

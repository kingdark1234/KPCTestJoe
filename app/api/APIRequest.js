import axios from 'axios';
export const requestNational = () =>
  axios.get('https://restcountries.eu/rest/v2/all?fields=name;demonym');

export const requestCallingCodes = () =>
  axios.get(
    'https://restcountries.eu/rest/v2/all?fields=name;callingCodes;flag',
  );

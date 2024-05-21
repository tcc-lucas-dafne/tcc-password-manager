const API_URL_HML = process.env.REACT_APP_API_URL_HML;
const API_URL_PROD = process.env.REACT_APP_API_URL_PROD;

export const API_URL = process.env.NODE_ENV === 'production' ? API_URL_PROD : API_URL_HML;
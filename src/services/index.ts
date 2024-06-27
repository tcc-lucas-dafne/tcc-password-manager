import axios from 'axios';
import { API_URL } from '../constants/baseUrl';

export const API = axios.create({ baseURL: `${API_URL}/api/v1` })

API.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("token");
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
})

API.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  if (error?.response?.status === 401) {
    localStorage.clear();
    window.location.reload();
  }

  return Promise.reject(error);
});
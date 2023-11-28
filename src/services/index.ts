import axios from 'axios';
import { API_URL } from '../constants/baseUrl';

export const API = axios.create({ baseURL: `${API_URL}/api/v1` })
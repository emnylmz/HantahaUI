import axios from 'axios';
import { API_BASE_URL } from './EndPoints';
import {getCookie, logOutErrorCodes, logOutTransactions, showAlert, showError } from 'utils/utils';

export async function get(endpoint) {
  const api = axios.create({
    baseURL: API_BASE_URL
  });

  const token = getCookie('hanTaha-auth-token');

  if (token != null && token !== '') api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

  try {
    const response = await api.get(endpoint);
    return response.data.data;
  } catch (error) {
    if(logOutErrorCodes.includes(error.response.status))
      logOutTransactions();
    else if(error.response.status===500)
    showError("Hata","Sorun sizde değil bizde. Sorun ile en yakın zamanda ilgileneceğiz.")
  }
}

export async function post(endpoint, data) {
  const api = axios.create({
    baseURL: API_BASE_URL
  });
  
  const token = getCookie('hanTaha-auth-token');

  if (token != null && token !== '') api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

  try {
    const response = await api.post(endpoint, data);
    return response.data;
  } catch (error) {
  }
}

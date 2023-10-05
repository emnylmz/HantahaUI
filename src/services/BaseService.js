import axios from 'axios';
import { API_BASE_URL } from './EndPoints';
import {getCookie, logOutErrorCodes, logOutTransactions, showAlert } from 'utils/Utils';

const handleErrorResponse = (error) => {
  if (error.response) {
    return {
      status: error.response.status,
      data: error.response.data
    };
  } else if (error.request) {
    return {
      status: 0,
      data: 'No response received from the server.'
    };
  } else {
    return {
      status: -1,
      data: 'An error occurred while making the request.'
    };
  }
};

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
    showAlert("Hata","Sorun sizde değil bizde. Sorun ile en yakın zamanda ilgileneceğiz.")
      
    throw handleErrorResponse(error);
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
    throw handleErrorResponse(error);
  }
}

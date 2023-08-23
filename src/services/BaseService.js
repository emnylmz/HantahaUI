import axios from 'axios';
import React, { useState } from 'react';
import { API_BASE_URL } from './EndPoints/EndPoints';
function BaseServiceComponent() {

  const api = axios.create({
    baseURL: API_BASE_URL,
  });

  const handleErrorResponse = (error) => {
    if (error.response) {
      return {
        status: error.response.status,
        data: error.response.data,
      };
    } else if (error.request) {
      return {
        status: 0,
        data: 'No response received from the server.',
      };
    } else {
      return {
        status: -1,
        data: 'An error occurred while making the request.',
      };
    }
  };

  const get = async (endpoint) => {
    try {
      const response = await api.get(endpoint);
      return response.data;
    } catch (error) {
      throw handleErrorResponse(error);
    }
  };

  const post = async (endpoint, data) => {
    try {
      const response = await api.post(endpoint, data);
      return response.data;
    } catch (error) {
      throw handleErrorResponse(error);
    }
  };

  // Diğer HTTP metodlarına ait fonksiyonları da benzer şekilde tanımlayabilirsiniz

  return (
    <div>
      {/* Bileşen içeriği */}
    </div>
  );
}

export default BaseServiceComponent;

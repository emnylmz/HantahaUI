
const API_BASE_URL = 'https://api.example.com'; // Sabit API URL'si


const createEndpoint = (path) => `${API_BASE_URL}${path}`;

//örnek
const END_POINTS = {
  login: createEndpoint('/login'), 
  logout: createEndpoint('/logout'), 
  getUserInfo: createEndpoint('/user/info'), 
};

export { API_BASE_URL,END_POINTS, createEndpoint };
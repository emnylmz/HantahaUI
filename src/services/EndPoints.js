
const API_BASE_LOCAL_URL = 'https://localhost:7058/HantahaAPI'; // Sabit API URL'si
const API_BASE_TEST_URL = 'https://testapi.hantaha.com/HantahaAPI'; // Sabit API URL'si


const createEndpoint = (path) => `${API_BASE_TEST_URL}${path}`;

//örnek
const END_POINTS = {
  login: createEndpoint('/users/login'), 
  logout: createEndpoint('/logout'), 
  register: createEndpoint('/users/register'),
  getAllCountries:createEndpoint('/country/GetAllCountries') 
};

export { API_BASE_LOCAL_URL,API_BASE_TEST_URL,END_POINTS, createEndpoint };
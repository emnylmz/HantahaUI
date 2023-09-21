
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const createEndpoint = (path) => `${API_BASE_URL}${path}`;

//örnek
const END_POINTS = {
  login: createEndpoint('/users/login'), 
  logout: createEndpoint('/logout'), 
  register: createEndpoint('/users/register'),
  getAllCountries:createEndpoint('/country/GetAllCountries') 
};

export { API_BASE_URL,END_POINTS, createEndpoint };
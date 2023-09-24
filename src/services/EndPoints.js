
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const createEndpoint = (path) => `${API_BASE_URL}${path}`;

//örnek
const END_POINTS = {
  //user
  getAllUsers:createEndpoint('/users/GetAll'),
  register: createEndpoint('/users/register'),
  
  //authentication
  login: createEndpoint('/authentication/Login'), 
  logout: createEndpoint('/authentication/logout'), 

  //country
  getAllCountries:createEndpoint('/country/GetAllCountries') ,
};

export { API_BASE_URL,END_POINTS, createEndpoint };
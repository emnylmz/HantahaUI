const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const createEndpoint = (path) => `${API_BASE_URL}${path}`;

//örnek
const END_POINTS = {
  //user
  getAllUsers: createEndpoint('/users/GetAll'),
  register: createEndpoint('/users/register'),
  updateUser: createEndpoint('/users/update'),

  //authentication
  login: createEndpoint('/authentication/Login'),
  logout: createEndpoint('/authentication/logout'),

  //country
  getAllCountries: createEndpoint('/country/GetAllCountries'),

  //language
  languageList: createEndpoint('/language/List'),
  languageComboList: createEndpoint('/language/ComboList'),
  createOrUpdateLanguage: createEndpoint('/language/CreateOrUpdate'),
  removeLanguage: createEndpoint('/language/Remove'),
  getLanguage: createEndpoint('/language/GetLanguage'),

  //verb
  verbList: createEndpoint('/verb/List'),
  createOrUpdateVerb: createEndpoint('/verb/CreateOrUpdate'),
  removeVerb: createEndpoint('/verb/Remove'),
  getVerb: createEndpoint('/verb/Get'),
};

export { API_BASE_URL, END_POINTS, createEndpoint };

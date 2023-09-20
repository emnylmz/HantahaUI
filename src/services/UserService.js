import { post } from "./BaseService";

class UserService {
  register = async (userData) => {
    const response = await post('/users/register', userData);
    return response.data;
  };
}

export default UserService;

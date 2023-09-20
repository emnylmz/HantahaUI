import { post } from "./BaseService";

class AuthService {
  login = async (loginDto) => {
    const response = await post('/authentication/Login', loginDto);
    return response.data;
  };
}

export default AuthService;
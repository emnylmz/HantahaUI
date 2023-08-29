import BaseService from './BaseService';

class UserService extends BaseService {

  getUser = async (userId) => {
    try {
      const response = await this.get(`/users/${userId}`);
      return response;
    } catch (error) {
      throw error;
    }
  };

  createUser = async (userData) => {
    try {
      const response = await this.post('/users', userData);
      return response;
    } catch (error) {
      throw error;
    }
  };

  // Diğer UserService özel metodları buraya eklenebilir
}

export default UserService;

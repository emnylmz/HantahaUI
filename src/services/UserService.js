import { showMultiLineError, showSuccess } from 'utils/utils';
import { post, get } from './BaseService';
import { END_POINTS } from './EndPoints';

class UserService {
  register = async (userData) => {
    try {
      const response = await post(END_POINTS.register, userData);
      if (response.data.errors) {
        showMultiLineError(response.data.errors);
        return false;
      } else {
        showSuccess('Kayıt başarıyla oluşturuldu.');
        return true;
      }
    } catch (response) {
      if (response.data.errors) showMultiLineError(response.data.errors);
    }
  };

  updateUser = async (userData) => {
    try {
      const response = await post(END_POINTS.updateUser, userData);
      if (response.data && response.data.errors) {
        showMultiLineError(response.data.errors);
        return false;
      } else {
        showSuccess('Kayıt başarıyla güncellendi.');
        return true;
      }
    } catch (response) {
      if (response.data.errors) showMultiLineError(response.data.errors);
      return false;
    }
  };

  getAllUsers = async () => {
    const response = await get(END_POINTS.getAllUsers);
    return response;
  };
}

export default UserService;

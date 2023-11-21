import { showMultiLineError, showSuccess } from 'utils/utils';
import { post, get } from './BaseService';
import { END_POINTS } from './EndPoints';

class UserService {
  register = async (userData) => {
    try {
      const response = await post(END_POINTS.register, userData);
      if (response.data && response.data.errors) {
        showMultiLineError(response.data.errors);
        return false;
      } else {
        showSuccess('Kayıt başarılı.Giriş yapabilirsiniz.');
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

  forgotPassword = async (email) => {
    try {
      const response = await post(END_POINTS.forgotPassword, email);
      if (response.errors) 
        showMultiLineError(response.errors);
      else 
      {
        showSuccess('Şifre sıfırlama maili iletilmiştir.Lütfen spam kutunuzuda kontrol etmeyi unutmayınız.');
      }
      return response.data;
    } catch (response) {
      if (response.data && response.data.errors) {
        showMultiLineError(response.data.errors);
      }
      return null;
    }
  };

  resetPassword = async (resetPasswordDto) => {
    try {
      const response = await post(END_POINTS.forgotPassword, resetPasswordDto);
      if (response.errors) 
        showMultiLineError(response.errors);
      else 
      {
        return true;
      }
    } catch (response) {
      if (response.data && response.data.errors) {
        showMultiLineError(response.data.errors);
      }
      return null;
    }
  };

  checkToken = async (token) => {
    try {
      const response = await post(END_POINTS.checkToken, token);
      if (response.errors) 
        return response.errors[0];
      return "FOUND";
    } catch (response) {
      if (response.data && response.data.errors) {
        showMultiLineError(response.data.errors);
      }
      return null;
    }
  };
}

export default UserService;

import { clearCookies, setTokenCookie, showMultiLineError, showSuccess } from 'utils/utils';
import { post } from './BaseService';
import { END_POINTS } from './EndPoints';

class AuthService {
  login = async (loginDto) => {
    try {
      const response = await post(END_POINTS.login, loginDto);
      await setTokenCookie(response.data);
      showSuccess('Hoşgeldiniz.');
      return response.data;
    } catch (response) {
      if (response.data && response.data.errors) {
        showMultiLineError(response.data.errors);
      }
      return null;
    }
  };

  logout = async () => {
    try {
      const response = await post(END_POINTS.logout);
      clearCookies();
      showSuccess('Çıkış yapıldı');
      return response.data;
    } catch (response) {
      if (response.data.errors) {
        showMultiLineError(response.data.errors);
      }
      return null;
    }
  };
}

export default AuthService;

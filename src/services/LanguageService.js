import { showMultiLineError, showSuccess } from 'utils/utils';
import { get,post } from './BaseService';
import { END_POINTS } from './EndPoints';
class LanguageService {
  list = async () => {
    const response = await get(END_POINTS.languageList);
    return response;
  };

  createOrUpdateLanguage = async (languageData) => {
    try {
      debugger;
      const response = await post(END_POINTS.createOrUpdateLanguage, languageData);
      if (response.data && response.data.errors) 
        showMultiLineError(response.data.errors);
      else 
      {
        showSuccess(languageData.id===0?'Kayıt başarıyla oluşturuldu.':'Kayıt başarıyla güncellendi.');

      }
      
    } catch (response) {
      if (response.data && response.data.errors) showMultiLineError(response.data.errors);
    }
  };

  removeLanguage = async (languageId) => {
    try {
      
      const response = await post(END_POINTS.removeLanguage, {Id:languageId});
      if (response.data && response.data.errors) 
        showMultiLineError(response.data.errors);
      else 
        showSuccess('Kayıt başarıyla silindi.');
      
    } catch (response) {
      if (response.data && response.data.errors) showMultiLineError(response.data.errors);
    }
  };

  getLanguage = async (id) => {
    const response = await post(END_POINTS.getLanguage,{Id:id});
    return response.data;
  };
}

export default LanguageService;

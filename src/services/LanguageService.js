import { get,post } from './BaseService';
import { END_POINTS } from './EndPoints';
class LanguageService {
  list = async () => {
    const response = await get(END_POINTS.languageList);
    return response;
  };

  createOrUpdateLanguage = async (languageData) => {
    try {
      const response = await post(END_POINTS.createOrUpdateLanguage, languageData);
      if (response.data.errors) 
        showMultiLineError(response.data.errors);
      else 
        showSuccess('Kayıt başarıyla oluşturuldu.');
      
    } catch (response) {
      if (response.data && response.data.errors) showMultiLineError(response.data.errors);
    }
  };

  removeLanguage = async (languageId) => {
    try {
      
      const response = await post(END_POINTS.removeLanguage, {Id:languageId});
      if (response.data.errors) 
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

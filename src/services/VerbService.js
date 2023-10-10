import { showMultiLineError, showSuccess } from 'utils/utils';
import { get,post } from './BaseService';
import { END_POINTS } from './EndPoints';

class VerbService {
  
  list = async () => {
    const response = await get(END_POINTS.verbList);
    return response;
  };

  createOrUpdateVerb = async (verbData) => {
    try {
      const response = await post(END_POINTS.createOrUpdateVerb, verbData);
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

  removeVerb = async (verbId) => {
    try {
      
      const response = await post(END_POINTS.removeVerb, {Id:verbId});
      if (response.data && response.data.errors) 
        showMultiLineError(response.data.errors);
      else 
        showSuccess('Kayıt başarıyla silindi.');
      
    } catch (response) {
      if (response.data && response.data.errors) showMultiLineError(response.data.errors);
    }
  };

  getVerb = async (id) => {
    const response = await post(END_POINTS.getVerb,{Id:id});
    return response.data;
  };
}

export default VerbService;

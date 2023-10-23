import { showMultiLineError, showSuccess } from 'utils/utils';
import { get,post } from './BaseService';
import { END_POINTS } from './EndPoints';

class SentenceService {
  
  list = async () => {
    const response = await get(END_POINTS.sentenceList);
    return response;
  };

  createOrUpdateSentence = async (sentenceData) => {
    try {
      const response = await post(END_POINTS.createOrUpdateSentence, sentenceData);
      if (response.data && response.data.errors) 
        showMultiLineError(response.data.errors);
      else 
      {
        Promise.resolve().then(function() {
          showSuccess(sentenceData.Id === 0 ? 'Kayıt başarıyla oluşturuldu.' : 'Kayıt başarıyla güncellendi.');
          setTimeout(function() {
            window.location.href = '/sentence';
          }, 1000);
        });
      }
      
    } catch (response) {
      if (response.data && response.data.errors) showMultiLineError(response.data.errors);
    }
  };

  setIsDeleted = async (sentenceId,isDeleted) => {
    try {
      
      const response = await post(END_POINTS.setIsDeletedSentence, {Id:sentenceId});
      if (response.data && response.data.errors) 
        showMultiLineError(response.data.errors);
      else 
        showSuccess(isDeleted===false?'Kayıt başarıyla silindi.':'Kayıt başarıyla geri alındı.');
      
    } catch (response) {
      if (response.data && response.data.errors) showMultiLineError(response.data.errors);
    }
  };

  getSentence = async (id) => {
    const response = await post(END_POINTS.getSentence,{Id:id});
    return response.data;
  };
}

export default SentenceService;

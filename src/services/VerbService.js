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
        Promise.resolve().then(function() {
          showSuccess(verbData.Id === 0 ? 'Kayıt başarıyla oluşturuldu.' : 'Kayıt başarıyla güncellendi.');
          setTimeout(function() {
            window.location.href = '/verb';
          }, 1000);
        });
      }
      
    } catch (response) {
      if (response.data && response.data.errors) showMultiLineError(response.data.errors);
    }
  };

  setIsDeletedVerb = async (verbId,isDeleted) => {
    try {
      
      const response = await post(END_POINTS.setIsDeletedVerb, {Id:verbId});
      if (response.data && response.data.errors) 
        showMultiLineError(response.data.errors);
      else 
        showSuccess(isDeleted===false?'Kayıt başarıyla silindi.':'Kayıt başarıyla geri alındı.');
      
    } catch (response) {
      if (response.data && response.data.errors) showMultiLineError(response.data.errors);
    }
  };

  getVerb = async (id) => {
    const response = await post(END_POINTS.getVerb,{Id:id});
    return response.data;
  };

  comboList = async () => {
    const response = await get(END_POINTS.verbComboList);
    return response;
  };

  getVerbItemListByPageNumber = async (pageNumber,searchText) => {
    try {
      
      const response = await post(END_POINTS.getUserVerbList, {PageNumber:pageNumber,Search:searchText});
      if (response.data && response.data.errors) 
        showMultiLineError(response.data.errors);
      else
        return response.data;
      
    } catch (response) {
      if (response.data && response.data.errors) showMultiLineError(response.data.errors);
    }
  };
}

export default VerbService;

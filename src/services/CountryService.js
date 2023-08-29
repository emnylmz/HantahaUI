import {get} from './BaseService';
import { END_POINTS } from './EndPoints';
class CountryService {

  getAllCountries = async () => {
    try {
      const response = await get(END_POINTS.getAllCountries);
      return response;
    } catch (error) {
      throw error;
    }
  };


}

export default CountryService;

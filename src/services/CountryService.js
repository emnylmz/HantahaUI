import {get} from './BaseService';
import { END_POINTS } from './EndPoints';
class CountryService {

  getAllCountries = async () => {
    const response = await get(END_POINTS.getAllCountries);
      return response;
  };


}

export default CountryService;

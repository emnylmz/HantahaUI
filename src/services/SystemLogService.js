import {get} from './BaseService';
import { END_POINTS } from './EndPoints';
class SystemLogService {

  list = async () => {
    const response = await get(END_POINTS.systemLog);
      return response;
  };


}

export default SystemLogService;

import enviroment from "../config/enviroment";
import {http} from "../config/http";

function HistoricService() {
  const global_url = `${enviroment.backend_url}/history`;

  const add = async (keyId: number) => {
    const local_url = `${global_url}/add`;

    const response = await http.post(local_url, {keyId: keyId});
    if (response) {
      return response.data;
    }
  };

  const get = async (id: number) => {
    const local_url = `${global_url}/get/${id}`;
    const response = await http.get(local_url);
    if (response) {
      return response.data;
    }
  };

  return {add, get};
}

export default HistoricService;

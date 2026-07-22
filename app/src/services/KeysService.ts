import enviroment from "../config/enviroment";
import { http } from "../config/http";
import type { Key } from "../interfaces/key";

function KeysService() {
  const global_url = `${enviroment.backend_url}/keys`;

  const add = async (payload: Key, userId: number) => {
    const local_url = `${global_url}/add`;

    const response = await http.post(local_url, { ...payload, userId });
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

  const getById = async (id: number) => {
    const local_url = `${global_url}/get/id/${id}`;

    const response = await http.get(local_url);
    if (response) {
      return response.data;
    }
  };

  const remove = async (id: number) => {
    const local_url = `${global_url}/remove/${id}`;

    const response = await http.delete(local_url);
    if (response) {
      return response.data;
    }
  };

  return { add, get, getById, remove };
}

export default KeysService;

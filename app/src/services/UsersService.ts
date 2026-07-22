import enviroment from "../config/enviroment";
import { http } from "../config/http";
import type { User } from "../interfaces/user";

function UsersService() {
  const global_url = `${enviroment.backend_url}/users`;

  const add = async (payload: User) => {
    const local_url = `${global_url}/add`;

    const response = await http.post(local_url, { ...payload });
    if (response) {
      return response.data;
    }
  };
  const get = async () => {
    const local_url = `${global_url}/get`;

    const response = await http.get(local_url);
    if (response) {
      return response.data;
    }
  };

  const getById = async (id: number) => {
    const local_url = `${global_url}/get/${id}`;

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

export default UsersService;

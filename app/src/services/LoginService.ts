import enviroment from "../config/enviroment";
import { http } from "../config/http";

function LoginService() {
  const global_url = `${enviroment.backend_url}/login`;

  const login = async (email: string) => {
    const local_url = `${global_url}/`;
    
    const response = await http.post(local_url, { email });
    if (response) {
      return response.data;
    }
  };

  const verifyCode = async (code: string, email: string) => {
    const local_url = `${global_url}/verify`;

    const response = await http.post(local_url, { code, email });
    if (response) {
      return response.data;
    }
  };

  return { login, verifyCode };
}

export default LoginService;

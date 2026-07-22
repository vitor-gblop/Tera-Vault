import type {User} from "../interfaces/user";

function useAuth() {
  const authenticate = async (jwt_token: string) => {
    const jwt_payload = jwt_token.split(".")[1];

    // console.log(jwt_token);
    // console.log(jwt_payload);

    localStorage.setItem("authenticationToken", jwt_token);
    localStorage.setItem("authenticationData", jwt_payload);
  };

  const authData = (): User => {
    const payload_token = localStorage.getItem("authenticationData") || "";
    const payload = atob(payload_token);
    return JSON.parse(payload);
  };

  const authToken = (): string => {
    return localStorage.getItem("authenticationToken") || "";
  };

  const deauthenticate = () => {
    localStorage.removeItem("authenticationData");
    localStorage.removeItem("authenticationToken");
  };

  return {authenticate, authData, authToken, deauthenticate};
}

export default useAuth;

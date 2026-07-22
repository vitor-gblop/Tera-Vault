import axios, { type AxiosInstance, type AxiosRequestConfig } from "axios";
import toast from "react-hot-toast";
import useAuth from "../hooks/UseAuth";
import enviroment from "./enviroment";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: enviroment.backend_url || "no_enviroment_variable",
  timeout: 10000,
});

// adiciona o token ao header
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authenticationToken") || "";

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      // tempo atual
      const currentTime = Math.floor(Date.now() / 1000);
      //
      if (useAuth().authData().exp! < currentTime) {
        // toast amarelo customizado
        toast.error("Desautenticado", {
          duration: 3000,
          position: "top-right",
          style: {
            borderRadius: "10px",
          },
          iconTheme: {
            primary: "#ffc400",
            secondary: "#fff",
          },
        });
        setTimeout(() => {}, 4000); // intervalo do toast
        useAuth().deauthenticate(); // limpar o storage local
        location.href = "/login";
      }
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export const http = {
  get: <T>(url: string, config?: AxiosRequestConfig) =>
    axiosInstance.get<T>(url, config),

  post: <T>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
    axiosInstance.post<T>(url, data, config),

  put: <T>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
    axiosInstance.put<T>(url, data, config),

  delete: <T>(url: string, config?: AxiosRequestConfig) =>
    axiosInstance.delete<T>(url, config),

  patch: <T>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
    axiosInstance.patch<T>(url, data, config),
};

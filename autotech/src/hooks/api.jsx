import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:4001/",
});

export const useApi = () => ({
  validateToken: async (token) => {
    try {
      const response = await api.post("/validate", { token });
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  },
  signin: async (dados, tipo) => {
    try {
      const response = await api.post(`${tipo}/login`, dados);
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  },
  register: async (dados, tipo) => {
    try{
      const response = await api.post(`${tipo}/cadastro`, dados)
      return response.data
    }catch(error){
      return error.response.data
    }
  },
  perfil: async (tipo, id) => {
    try {
      const response = await api.get(`${tipo}/${id}`);
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  },
});

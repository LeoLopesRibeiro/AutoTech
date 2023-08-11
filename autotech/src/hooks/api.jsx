import axios from "axios"

export const api = axios.create({
    baseURL: "http://localhost:4001/"
})

export const useApi = () => ({
    validateToken: async (token) => {
        const response = await api.post("/validate", token)
        return response.data
    },
    signin: async (dados,tipo) => {
        const response = await api.post(`${tipo}/login`, dados)
        return response.data
    },
    logout: async ()=> {
        const response = await api.post("logout/");
        return response.data
    }
})


import { createContext, useEffect, useState } from "react";
import { useApi } from "../hooks/api";
import Loading from "../components/Loading";

export const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [autenticado, setAutenticado] = useState(false)
  const api = useApi();
  

  useEffect(() => {
    async function validateToken() {
      const storageData = localStorage.getItem("token");
      if (storageData.length > 0) {
        const data = await api.validateToken(storageData);
        // console.log(data, "ERRO")
        if (data.result) {
          setAutenticado(true)
          setUser(data.result.email);
          setLoading(false);
        }
      }
      setLoading(false);
    }
    validateToken();
  }, [api]);

  async function handleLogin(dados, tipo) {
    const data = await api.signin(dados, tipo);
    if (data.idCliente || (data.idVendedor && data.token)) {
      setUser(dados.email);
      //guardando o token no localstorage
      // localStorage.setItem("dados", ); 
      setAutenticado(true)
      localStorage.setItem("token", data.token);
      return true;
    }
    return false;
  }

  function handleLogout() {
    console.log("Executou");
    setUser(null);
    setLoading(false)
    localStorage.setItem("token", "");
    setAutenticado(false)
    window.location.href = "/login";
  }

  if (loading) {
    return <Loading />;
  }
  return (
    <AuthContext.Provider
      value={{ user, autenticado, handleLogin, handleLogout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

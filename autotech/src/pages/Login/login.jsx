// import api from "../../hooks/api";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/auth";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate()
  const auth = useContext(AuthContext)
  const [dados, setDados] = useState({
    email: "",
    senha: "",
    confirmarSenha: "",
  });


  async function Log() {
   if(dados){
    const isLogged = auth.handleLogin(dados, "clientes")
    if(isLogged){
      console.log(isLogged)
      navigate('/')
    }else{
      console.log("Erro")
    }
   }
  }

  return (
    <div>
      <div>
          <input
            type="email"
            name="email"
            value={dados.email}
            placeholder="Digite o seu email"
            onChange={(e) => setDados({email: e.target.value, senha: dados.senha })}
          />
          <input
            type="password"
            name="password"
            value={dados.senha}
            placeholder="Digite a senha"
            onChange={(e) => setDados({ email: dados.email, senha: e.target.value })}
          />
          <input
            type="password"
            name="password"
            value={dados.confirmarSenha}
            placeholder="Confirme a senha"
            onChange={(e) => setDados({ email: dados.email, senha: dados.senha, confirmarSenha: e.target.value })}
          />
          <button
            type="submit"
            className="text-red-500"
            onClick={()=> {Log()}}
          >
            Login
          </button>
      </div>
    </div>
  );
}

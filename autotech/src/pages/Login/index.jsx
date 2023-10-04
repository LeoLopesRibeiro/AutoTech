// import api from "../../hooks/api";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/auth";
import { useNavigate } from "react-router-dom";
import loginIMG from "../../assets/Login-amico.svg";
export default function Login() {
  const navigate = useNavigate();
  // const [effect, setEffect] = useState(false);
  const [tipoLogin, setTipoLogin] = useState("clientes");
  const auth = useContext(AuthContext);
  const [dados, setDados] = useState({
    email: "",
    senha: "",
    confirmarSenha: "",
  });

  async function Log() {
    if (dados) {
      const isLogged = auth.handleLogin(dados, tipoLogin);
      if (isLogged) {
        console.log(isLogged, "yyy");
        navigate("/");
      } else {
        console.log("Erro");
      }
    }
  }

  console.log(tipoLogin);

  return (
    <div className="flex h-[calc(100vh-56px)] w-full items-center justify-center align-middle ">
      <div className="flex h-3/4 w-2/4 rounded-lg bg-cinza shadow-2xl">
        <div className="flex flex-col align-middle justify-between p-10">
          <div>
            <span className="border-b-2 border-black w-10 h-10 font-poppins font-medium text-lg pb-4">
              Bem-vindo de volta
            </span>
          </div>
          <div className="flex flex-row w-min">
            <span
              onClick={() => setTipoLogin("clientes")}
              className="cursor-pointer shadow-md p-2 w-28 text-center bg-branco"
            >
              Clientes
            </span>
            <span
              onClick={() => setTipoLogin("vendedores")}
              className="cursor-pointer shadow-md p-2 bg-white w-28 text-center bg-branco"
            >
              Vendedores
            </span>
          </div>
          <input
            type="email"
            name="email"
            value={dados.email}
            placeholder="Digite o seu email"
            onChange={(e) =>
              setDados({ email: e.target.value, senha: dados.senha })
            }
          />
          <input
            type="password"
            name="password"
            value={dados.senha}
            placeholder="Digite a senha"
            onChange={(e) =>
              setDados({ email: dados.email, senha: e.target.value })
            }
          />
          <input
            type="password"
            name="password"
            value={dados.confirmarSenha}
            placeholder="Confirme a senha"
            onChange={(e) =>
              setDados({
                email: dados.email,
                senha: dados.senha,
                confirmarSenha: e.target.value,
              })
            }
          />
          <button
            type="submit"
            className="text-red-500"
            onClick={() => {
              Log();
            }}
          >
            Login
          </button>
        </div>
        <div className="flex justify-center align-middle items-center w-full">
          <img src={loginIMG} className=" w-96 h-96"></img>
        </div>
      </div>
    </div>
  );
}

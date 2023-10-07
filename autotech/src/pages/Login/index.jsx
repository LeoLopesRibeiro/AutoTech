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
    <div className="flex h-[calc(100vh-56px)] w-full items-center justify-center align-middle font-poppins ">
      <div className="flex h-3/4 w-2/4 rounded-lg bg-cinza shadow-2xl md:h-4/5 md:mt-5 sm:w-3/4">
        <div className="flex flex-col align-middle justify-around  p-10 -mt-5 xl:w-full">
          <div className="sm:text-center sm:w-full">
            <span className="border-b-2 border-black w-10 h-10 font-poppins font-medium text-xl">
              Bem-vindo de volta
            </span>
          </div>
          <div className="flex flex-row w-min font-normal sm:flex-wrap sm:w-full sm:justify-center">
            <span
              onClick={() => setTipoLogin("clientes")}
              className={`cursor-pointer shadow-md p-2 h-10 w-28 text-center bg-branco ${
                tipoLogin === "clientes"
                  ? "bg-preto ease-in duration-300 text-branco"
                  : null
              }`}
            >
              Clientes
            </span>
            <span
              onClick={() => setTipoLogin("vendedores")}
              className={`cursor-pointer h-10 shadow-md p-2 w-28 text-center bg-branco ${
                tipoLogin === "vendedores"
                  ? "bg-preto ease-in duration-300 text-branco"
                  : null
              }`}
            >
              Vendedores
            </span>
          </div>
          <div className="flex flex-col justify-between h-2/4 md:w-full">
            <label className=" font-semibold text-sm">
              Email
            </label>
              <input
                className="w-80 h-10 p-2 shadow-md xl:w-full"
                type="email"
                name="email"
                value={dados.email}
                placeholder="Digite o seu email"
                onChange={(e) =>
                  setDados({ email: e.target.value, senha: dados.senha })
                }
              />
            <label className=" font-semibold text-sm">
              Senha
            </label>
              <input
              className=" w-80 h-10 p-2 shadow-md xl:w-full"
                type="password"
                name="password"
                value={dados.senha}
                placeholder="Digite a senha"
                onChange={(e) =>
                  setDados({ email: dados.email, senha: e.target.value })
                }
              />
            <button
            className="w-80 h-10 p-2 shadow-md bg-preto text-branco xl:w-full xl:mt-10"
              type="submit"
              onClick={() => {
                Log();
              }}
            >
              Efetuar Login
            </button>
          </div>
        </div>
        <div className="flex justify-center align-middle items-center w-full xl:hidden">
          <img src={loginIMG} className=" w-96 h-96"></img>
        </div>
      </div>
    </div>
  );
}

import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import registerIMG from "../../assets/register.svg";

export default function Register(){
    const navigate = useNavigate();
  // const [effect, setEffect] = useState(false);
  const [tipoLogin, setTipoLogin] = useState("clientes");
  const [dados, setDados] = useState({
    nome: "",
    cpf: 0,
    email: "",
    senha: "",
    confirmarSenha: "",
  });


  console.log(tipoLogin);

  return (
    <div className="flex h-[calc(150vh-56px)] w-full items-center justify-center align-middle font-poppins ">
      <div className="flex h-3/4 w-2/4 mt-5 rounded-lg bg-cinza shadow-2xl md:h-4/5 md:mt-5 sm:w-3/4">
        <div className="flex flex-col align-middle justify-around p-10  xl:w-full">
          <div className="sm:text-center sm:w-full">
            <span className="border-b-2 border-black w-10 h-10 font-poppins font-medium text-xl">
             Cadastre-se
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
          <div className="flex flex-col justify-between h-3/4 md:w-full">
            <label className=" font-semibold text-sm">
              Nome
            </label>
              <input
                className="w-80 h-10 p-2 shadow-md xl:w-full"
                type="text"
                name="Nome"
                value={dados.nome}
                placeholder="Digite o seu nome completo"
                onChange={(e) =>
                  setDados({ nome: e.target.value, cpf: e.target.value, email: e.target.value, senha: dados.senha, confirmarSenha: e.target.value })
                }
              />
            <label className=" font-semibold text-sm">
              CPF
            </label>
              <input
                className="w-80 h-10 p-2 shadow-md xl:w-full"
                type="text"
                name="CPF"
                value={dados.nome}
                placeholder="Digite o seu nome completo"
                onChange={(e) =>
                  setDados({ nome: e.target.value, cpf: e.target.value, email: e.target.value, senha: dados.senha, confirmarSenha: e.target.value })
                }
              />
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
                    setDados({ nome: e.target.value, cpf: e.target.value, email: e.target.value, senha: dados.senha, confirmarSenha: e.target.value })
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
                    setDados({ nome: e.target.value, cpf: e.target.value, email: e.target.value, senha: dados.senha, confirmarSenha: e.target.value })
                }
              />
            <label className=" font-semibold text-sm">
              Confirmar senha
            </label>
              <input
              className="w-80 h-10 p-2 shadow-md xl:w-full"
                type="password"
                name="password"
                value={dados.confirmarSenha}
                placeholder="Digite a mesma senha"
                onChange={(e) =>
                    setDados({ nome: e.target.value, cpf: e.target.value, email: e.target.value, senha: dados.senha, confirmarSenha: e.target.value })
                }
              />
            <button
            className="w-80 h-10 p-2 shadow-md bg-preto text-branco xl:w-full mt-10"
              type="submit"
              onClick={() => {
               
              }}
            >
              Efetuar Login
            </button>
          </div>
        </div>
        <div className="flex justify-center align-middle items-center w-full xl:hidden">
          <img src={registerIMG} className=" w-96 h-96"></img>
        </div>
      </div>
    </div>
  );
}
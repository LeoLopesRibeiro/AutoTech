import { useContext } from "react";
import { AuthContext } from "../../context/auth";
import { Link, Outlet } from "react-router-dom";
export default function Header() {
  const auth = useContext(AuthContext);
  // console.log(auth);
  return (
    <div>
      <header className="flex justify-between justify-items-center w-full shadow-md font-poppins text-base h-14 flex-wrap pt-4 pb-4 pr-2">
        <div className="flex flex-wrap w-max ml-8">
        <h1 className="font-bold mr-10">AutoTech</h1>
        <p className="font-medium mr-5">Produtos</p>
        <p className="font-medium mr-5">Categorias</p>
        <p className="font-medium mr-5">Motos</p>
        <p className="font-medium mr-5">Bicicletas</p>
        <p className="font-medium mr-5">Carros</p>
        </div>
        {auth.user ? (
          <div className="flex justify-between align-middle items-center">
            <button className=" mr-4" onClick={auth.handleLogout}>Sair</button>
            <Link to="/perfil">Perfil</Link>
          </div>
        ) : (
          <div className="flex justify-between w-max">
            <Link to="/login">Login</Link>
            <Link className="ml-2" to="/register">Register</Link>
          </div>
        )}
      </header>
      <Outlet />
    </div>
  );
}

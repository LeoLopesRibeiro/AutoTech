import { useContext } from "react";
import { AuthContext } from "../../context/auth";
import { Link, Outlet } from "react-router-dom";
export default function Header() {
  const auth = useContext(AuthContext);

  // console.log(auth);
  return (
    <div>
      <header className="flex justify-between align-middle w-full border-b-2 border-black p-2">
        <h1>AutoTech</h1>
        {auth.user ? (
          <div className="flex justify-between align-middle">
            <button className=" mr-4" onClick={auth.handleLogout}>Sair</button>
            <Link to="/perfil">Perfil</Link>
          </div>
        ) : (
          <div>
            <Link to="/login">Login</Link>
          </div>
        )}
      </header>
      <Outlet />
    </div>
  );
}

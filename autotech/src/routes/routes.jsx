import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useContext } from "react";
import Cadastro from "../pages/Cadastro/cadastro";
import Login from "../pages/Login/login";
import LandingPage from "../pages/LandinPage";
import Perfil from "../pages/Perfil";
import { AuthContext } from "../context/auth";

// eslint-disable-next-line react/prop-types
const PrivateRoutes = ({Item}) => {
  const auth = useContext(AuthContext)

  console.log(auth)
  if(!auth.user){
    return <Login/>
  }
  return Item
};
const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/cadastro",
    element: <Cadastro />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/perfil",
    element: <PrivateRoutes Item={<Perfil/>}/>
  },
]);

export default function Routes() {
  return <RouterProvider router={router} />;
}

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Cadastro from "../pages/Cadastro/cadastro";
import Login from "../pages/Login";
import Register from "../pages/Register";
import LandingPage from "../pages/LandingPage";
import Perfil from "../pages/Perfil";
import Header from "../components/Header";
import PrivateRoutes from "../context/requireAuth";

const router = createBrowserRouter([
  {
    element: <Header />,
    children: [
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
        path: "/register",
        element: <Register />,
      },
      {
        path: "/perfil",
        element: <PrivateRoutes Item={<Perfil />} />,
      },
    ],
  },
]);

export default function Routes() {
  return <RouterProvider router={router} />;
}

import { useContext } from "react";
import { AuthContext } from "./auth";
import Login from "../pages/Login/login";

// eslint-disable-next-line react/prop-types
export default function PrivateRoutes({Item}) {
    const {autenticado} = useContext(AuthContext);
    console.log(autenticado);
   return !autenticado ? <Login/> : Item
  }
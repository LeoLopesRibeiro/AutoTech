import { Link } from "react-router-dom";

export default function LandingPage(){
    return(
        <div>
            <Link to="/login">
                <h1>Login</h1>
                </Link>
            <Link to="/perfil">
                <h1>Perfil</h1>
                </Link>
        </div>
    )
}
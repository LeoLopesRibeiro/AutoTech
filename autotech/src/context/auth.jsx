import { createContext, useState } from "react";
import { useApi } from "../hooks/api";

export const AuthContext = createContext()


// eslint-disable-next-line react/prop-types
export function AuthProvider({children}){
    const [user, setUser] = useState(null)
    const api = useApi()
    console.log(user)

    // useEffect(()=> {
    //     const token = localStorage.getItem("token")
    //     const userStorage = localStorage.getItem("user")

    //     if(userStorage && token){
    //         const hasUser = JSON.parse(userStorage)?.filter(
    //             (user)=> user.email === JSON.parse(token).email
    //         )

    //         if(hasUser){
    //             setUser(hasUser[0])
    //         }
    //     }
        
    // }, [])

    async function handleLogin(dados, tipo){
        const data = await api.signin(dados, tipo)
        console.log(data)
        if(data.id && data.token){
            setUser(dados.email)
            return true
        }

        return false
    }

    const handleLogout = async () =>{
        await api.logout()
        setUser(null)
    }
    return <AuthContext.Provider value={{user, handleLogin, handleLogout}}>{children}</AuthContext.Provider>
}
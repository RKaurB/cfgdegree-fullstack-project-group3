import { useSelector } from 'react-redux'
import { Navigate } from "react-router-dom";

export function ProtectRoutes({children}){
    const currentUsername = useSelector((state) => state.user.username)
    if(currentUsername == ""){
        return <Navigate to="/"/>
    }
    return children
}
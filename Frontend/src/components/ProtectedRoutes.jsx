import { useDispatch } from 'react-redux'
import { Navigate } from "react-router-dom";
import { useEffect } from 'react';
import {updateUserInfoforVariable} from "../feature/UserSlice"

export function ProtectRoutes({children}){
    const dispatch = useDispatch();
      useEffect(()=>{
        let input = {
                email: localStorage.getItem("email"),
                id: localStorage.getItem("id"),
                username: localStorage.getItem("username"),
              };
              dispatch(updateUserInfoforVariable(input))
      },[])
      
    if(localStorage.getItem("username") == "" ||!localStorage.getItem("username") ){
        return <Navigate to="/"/>
    }
    return children
}
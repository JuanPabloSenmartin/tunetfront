import React from "react";
import '../Styles/artistHome.css'
import {useNavigate} from "react-router";
import { useTokenManager } from "../tokenManager";



export const ArtistHome = () => {
    const navigate = useNavigate();
    const auth = useTokenManager()
    const token = auth.getToken();


    const handleClick = () => {
        navigate("/editArtistProfile");
    }
    
    return (
        <button  onClick={handleClick}>editar perfil</button>
    )
}
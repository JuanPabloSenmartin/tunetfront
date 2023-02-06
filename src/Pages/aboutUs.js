import React, { useState, useEffect} from "react";
import InitialNavbar from "../Components/InitialNavbar";
import HomeNavbar from "../Components/HomeNavbar";
import '../Styles/aboutUs.css'
import {useTokenManager} from "../tokenManager"
import { useLocation } from 'react-router-dom'
import Background from "../Components/Background";



export const AboutUs = () => {
    const auth = useTokenManager()
    const token = auth.getToken()
    const location = useLocation()
    const data = location.state



    return (
        <div style={Background()}>
            
            {data.isSignedIn ? <HomeNavbar isArtist= {data.isArtist}/> : <InitialNavbar/>}
            <div className="space"/>
            <h1 className="title">ABOUT US</h1>
            <h2 className="body">Tunet is a website for locals to search for potential artists and bands</h2>
            
        </div>
    )
}
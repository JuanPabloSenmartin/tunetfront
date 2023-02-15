import React, { useState, useEffect} from "react";
import InitialNavbar from "../Components/InitialNavbar";
import HomeNavbar from "../Components/HomeNavbar";
import '../Styles/aboutUs.css'
import {useTokenManager} from "../tokenManager"
import { useLocation } from 'react-router-dom'
import Background from "../Components/Background";
import img1 from "../Images/playingGuitar.png";
import img2 from "../Images/playingPiano.png";



export const AboutUs = () => {
    const auth = useTokenManager()
    const token = auth.getToken()
    const location = useLocation()
    const data = location.state



    return (
        <div >
            
            {data.isSignedIn ? <HomeNavbar isArtist= {data.isArtist}/> : <InitialNavbar/>}
            <div className="space"/>
            <div className="about-us-left">
                <div className="about-us-left-mid-div">
                    <h1 className="about-us-title">ABOUT TUNET</h1>
                    <br/>
                    <br/>
                    <h2 className="about-us-body">Tunet is a website that connects artists and bands with businesses.</h2>
                    <br/>
                    <h2 className="about-us-body">Our main objective is to simplify the connectivity for both sides and therefore increase the professional network.</h2>
                    <br/>
                    <h2 className="about-us-body">Tunet was founded in 2021 by Juan Pablo Senmartin and Julian Recio</h2>
                </div>
            </div>
            <div className="about-us-right">
                <img className="about-us-img" src={img1}/>
                <img className="about-us-img" src={img2}/>
            </div>
            
            
        </div>
    )
}
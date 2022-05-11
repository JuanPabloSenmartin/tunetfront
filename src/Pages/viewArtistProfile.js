import React, { useState, useEffect } from "react";
import '../Styles/viewArtistProfile.css'
import { useLocation } from 'react-router-dom'
import {useMySystem} from "../mySystem";
import {useNavigate} from "react-router";
import { useTokenManager } from "../tokenManager";

export const ViewArtistProfile = () => {
    const location = useLocation()
    const {mail} = location.state
    const [userMail, setUserMail] = useState(mail)

    const auth = useTokenManager()
    const token = auth.getToken();

    const [videoUrl, setVideoUrl] = useState('')
    const [username, setUsername] = useState('')
    const [description, setDescription] = useState('')
    const [pictureUrl, setPictureUrl] = useState('')
    const [profilePictureUrl, setProfilePictureUrl] = useState('')
    const [errorMsg, setErrorMsg] = useState(undefined)
    const navigate = useNavigate();
    const mySystem = useMySystem();

    useEffect(() => {
        const color = "#8860D0";
        document.body.style.background = color;
        fetchData();
    }, [])

    const fetchData = () => {
        //fetches all information from this user
        mySystem.getProfileDataByMail(userMail, (info) => {
            setVideoUrl(info.videoUrl)
            setUsername(info.username)
            setDescription(info.description)
            setPictureUrl(info.pictureUrl)
            setProfilePictureUrl(info.profilePictureUrl)
        }, () => setErrorMsg('ERROR'))
    }
    
    return (
        
        <div>
            <h1>ViewArtistProfile</h1>
            <h2>mail :  {userMail}</h2>
            <h2>videoUrl : {videoUrl}</h2>
            <h2>username : {username}</h2>
            <h2>description : {description}</h2>
            <h2>pictureUrl : {pictureUrl}</h2>
            <h2>profilePictureUrl : {profilePictureUrl}</h2>
        </div>
    )
}
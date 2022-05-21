import React, { useState, useEffect } from "react";
import '../Styles/viewArtistProfile.css'
import { useLocation } from 'react-router-dom'
import {useMySystem} from "../mySystem";
import ReactAudioPlayer from 'react-audio-player';

export const ViewArtistProfile = () => {
    const location = useLocation()
    const {mail} = location.state
    const [userMail, setUserMail] = useState(mail)

    const [audioUrl, setAudioUrl] = useState('')
    const [username, setUsername] = useState('')
    const [description, setDescription] = useState('')
    const [pictureUrl, setPictureUrl] = useState('')
    const [profilePictureUrl, setProfilePictureUrl] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [errorMsg, setErrorMsg] = useState(undefined)
    const mySystem = useMySystem();

    useEffect(() => {
        const color = "#8860D0";
        document.body.style.background = color;
        fetchData();
    }, [])

    const fetchData = () => {
        //fetches all information from this user
        mySystem.getProfileDataByMail(userMail, (info) => {
            setAudioUrl(info.audioUrl)
            setUsername(info.username)
            setDescription(info.description)
            setPictureUrl(info.pictureUrl)
            setProfilePictureUrl(info.profilePictureUrl)
            setPhoneNumber(info.phoneNumber)
        }, () => setErrorMsg('Couldn`t connnect with API'))
    }
    
    return (
        
        <div>
            <br/>
            <br/>
            <div className="titleEditProf">
                   <h1 className="profh1">{username}`s profile</h1>
            </div>
            <div className="profForm">
                
                <div className="profile-Pic">
                    <img src={profilePictureUrl} />
                </div>

                <div className="profile-Settings">
                    <div>
                        <label className="profLabel">Username</label>
                        <p>{username}</p>
                    </div>
                    <br/>
                    <div>
                    <label className="profLabel">Email</label>
                        <p>{userMail}</p>
                    </div>
                    <br/>
                    <div>
                        <label className="profLabel">Phone number</label>
                        <p>{phoneNumber}</p>
                    </div>
                    <br/>
                    <div>
                        <label className="DescriptionLabel">Description</label>
                        <p>{description}</p>
                    </div>
                    
                </div>


                <div className="MusicSample">
                    <h1 className="profh1">Music samples</h1>
                    <div>
                        <ReactAudioPlayer
                            src={audioUrl}
                            controls
                            />
                    </div>
                </div>
                <div className="images">
                    <h1 className="imagesh1">Images</h1>
                    <img src={pictureUrl} className="imgLocalProf"/>
                </div>
                {errorMsg && <div className="alertWarning" role="alert">{errorMsg}</div>}
            </div>
        </div>
    )
}
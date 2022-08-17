import React, { useState, useEffect } from "react";
import '../Styles/viewArtistProfile.css'
import { useLocation } from 'react-router-dom'
import {useMySystem} from "../mySystem";
import ReactAudioPlayer from 'react-audio-player';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';

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
    const [rating, setRating] = useState('')
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
            setRating(info.rating)
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
                <div className="ite">
                        <img src={profilePictureUrl} />
                    </div>
                </div>

                <div className="profile-Settings">
                    <div>
                        <label className="profLabelView">Username</label>
                        <p className="resp">{username}</p>
                    </div>
                    <br/>
                    <div>
                        <label className="profLabelView">Email</label>
                        <p className="resp">{userMail}</p>
                    </div>
                    <br/>
                    <div>
                        <label className="profLabelView">Phone number</label>
                        <p className="resp">{phoneNumber}</p>
                    </div>
                    <br/>
                    <div>
                        <label className="profLabelView">Description</label>
                        <p className="resp">{description}</p>
                    </div>
                    <div className="ratings">
                        <Rating name="read-only" value={rating} readOnly />
                    </div>
      
    
                    
                </div>


                <div className="MusicSampleView">
                    <h1 className="profh1View">Music samples</h1>
                    <div>
                        <ReactAudioPlayer
                            src={audioUrl}
                            controls
                            />
                    </div>
                </div>
                <div className="imagesProf">
                    <h1 className="imagesView">Images</h1>
                    <img src={pictureUrl} className="imgLocalProf"/>
                </div>
                {errorMsg && <div className="alertWarning" role="alert">{errorMsg}</div>}
            </div>
        </div>
    )
}
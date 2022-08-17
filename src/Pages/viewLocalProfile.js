import React, { useState, useEffect } from "react";
import '../Styles/viewLocalProfile.css'
import { useLocation } from 'react-router-dom'
import {useMySystem} from "../mySystem";


export const ViewLocalProfile = () => {
    const location = useLocation()
    const {mail} = location.state
    const [userMail, setUserMail] = useState(mail)
    const [locations, setLocation] = useState('')
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
        fetchData()
    }, [])

    const fetchData = () => {
        //fetches all information from this user
        mySystem.getProfileDataByMail(userMail, (info) => {
            setLocation(info.location)
            setUsername(info.username)
            setDescription(info.description)
            setPictureUrl(info.pictureUrl)
            setProfilePictureUrl(info.profilePictureUrl)
            setPhoneNumber(info.phoneNumber)
            setRating(info.rating)
        }, () => setErrorMsg('ERROR: CANNOT CONNECT WITH API'))
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
                        <label className="profLabelView">Username:</label>
                        <p className="resp">{username}</p>
                    </div>
                    <br/>
                    <div>
                    <label className="profLabelView">Location:</label>
                        <p className="resp">{locations}</p>
                    </div>
                    <br/>
                    <div>
                        <label className="profLabelView">Phone number:</label>
                        <p className="resp">{phoneNumber}</p>
                    </div>
                    <br/>
                    <div>
                        <label className="profLabelView">Description:</label>
                        <p className="resp">{description}</p>
                    </div>
                    <div>
                        <label className="profLabel">Rating</label>
                        <p className="resp">{rating}</p>
                    </div>
                    
                </div>

                <div className="imagesProf">
                    <h1 className="imagesView">Images</h1>
                    <img src={pictureUrl} className="imgLocalProfView"/>
                </div>

                {errorMsg && <div className="alertWarning" role="alert">{errorMsg}</div>}
            </div> 
        </div>
    )
}
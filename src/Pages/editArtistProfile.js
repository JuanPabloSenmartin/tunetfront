import React, { useState, useEffect } from "react";
import {useMySystem} from "../mySystem";
import {useNavigate} from "react-router";
import { useTokenManager } from "../tokenManager";
import '../Styles/editArtistProfile.css'
import DefaultProfilePicture from '../Images/defaultProfilePicture.png'
import ReactAudioPlayer from 'react-audio-player';
import Song from '../mp3/song.mp3'


export const EditArtistProfile = () => {
    const auth = useTokenManager()
    const token = auth.getToken();
    
    const [email, setEmail] = useState('')
    const [videoUrl, setVideoUrl] = useState('')
    const [username, setUsername] = useState('')
    const [description, setDescription] = useState('')
    const [pictureUrl, setPictureUrl] = useState('')
    const [profilePictureUrl, setProfilePictureUrl] = useState('')
    const [location, setLocation] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [errorMsg, setErrorMsg] = useState(undefined)
    const [successMsg, setSuccessMsg] = useState(undefined)
    const navigate = useNavigate();
    const mySystem = useMySystem();

    useEffect(() => {
        const color = "#8860D0";
        document.body.style.background = color;
        fetchData()
    }, [])

    const fetchData = () => {
        //fetches all information from this user
        mySystem.getProfileData(token, (info) => {
            setEmail(info.email)
            setVideoUrl(info.videoUrl)
            setUsername(info.username)
            setDescription(info.description)
            setPictureUrl(info.pictureUrl)
            setProfilePictureUrl(info.profilePictureUrl)
            setLocation(info.location)
            setPhoneNumber(info.phoneNumber)
        }, () => setErrorMsg('ERROR'))
    }



    const handleSubmit = async e => {
        e.preventDefault();
        refreshDatabase({
            email: email,
            artistVideoUrl: videoUrl,
            username: username,
            description: description,
            pictureUrl: pictureUrl,
            profilePictureUrl: profilePictureUrl,
            location: location,
            phoneNumber: phoneNumber
        })
    }

    const refreshDatabase = (data) => {
        mySystem.refreshDatabaseAfterProfileEdit(data, 
            () => setSuccessMsg('Your profile has been edited successfully!'), 
            () => setErrorMsg('Your profile couldn`t be updated due to an error with out API'))
    }
    

    const videoUrlChange = (event) => {
        setVideoUrl(event.target.value)
    }
    const usernameChange = (event) => {
        setUsername(event.target.value)
    }
    const descriptionChange = (event) => {
        setDescription(event.target.value)
    }
    const pictureUrlChange = (event) => {
        setPictureUrl(event.target.value)
    }
    const profilePictureUrlChange = (event) => {
        setProfilePictureUrl(event.target.value)
    }
    const locationChange = (event) => {
        setLocation(event.target.value)
    }
    const phoneNumberChange = (event) => {
        setPhoneNumber(event.target.value)
    }

    
    return (
        
        <div>
            <br/>
            <br/>
            <div className="titleEditProf">
                   <h1 className="profh1">Modify your profile</h1>
            </div>
            <form onSubmit={handleSubmit} className="profForm">
                
                <div className="profile-Pic">
                    <div className="item-relative">
                        <img src={DefaultProfilePicture} />
                    </div>
                    <div className="change-Profile-Picture">
                        <button>Change profile picture</button>
                    </div>
                </div>

                <div className="profile-Settings">
                    <div>
                        <label className="profLabel">Username</label>
                        <input type="text"
                            placeholder="Username"
                            value={username}
                            name="username"
                            onChange={usernameChange}/>
                    </div>
                    <br/>
                    <div>
                    <label className="profLabel">Location (private)</label>
                        <input type="text"
                            placeholder="Location"
                            value={location}
                            name="username"
                            onChange={locationChange}/>
                    </div>
                    <br/>
                    <div>
                        <label className="profLabel">Phone number</label>
                        <input type="text"
                            placeholder="Phone number"
                            value={phoneNumber}
                            name="phoneNumber"
                            onChange={phoneNumberChange}/>
                    </div>
                    <br/>
                    <div>
                        <label className="DescriptionLabel">Description</label>
                        <textarea rows="4" cols="50" type="text"
                            placeholder="Add a description"
                            value={description}
                            name="description"
                            onChange={descriptionChange}/>
                    </div>
                    
                </div>

                <button type="submit" className="submitButtonEdit">Save Changes</button>

                <div className="MusicSample">
                <h1 className="profh1">Music samples</h1>

                <div>
                <textarea rows="4" cols="50" type="text" placeholder="Descripcion"/>
                <ReactAudioPlayer
                    src={Song}
                    controls
/>
                </div>
            </div>

                {errorMsg && <div className="alertWarning" role="alert">{errorMsg}</div>}
                {successMsg && <div className="successArt" role="alert">{successMsg}</div>}

                {/*
                <input type="text"
                            placeholder="videoUrl"
                            value={videoUrl}
                            name="videoUrl"
                            onChange={videoUrlChange}/>
                <input type="text"
                            placeholder="username"
                            value={username}
                            name="username"
                            onChange={usernameChange}/>
                <input type="text"
                            placeholder="description"
                            value={description}
                            name="description"
                            onChange={descriptionChange}/>
                <input type="text"
                            placeholder="pictureUrl"
                            value={pictureUrl}
                            name="pictureUrl"
                            onChange={pictureUrlChange}/>
                <input type="text"
                            placeholder="profilePictureUrl"
                            value={profilePictureUrl}
                            name="profilePictureUrl"
                            onChange={profilePictureUrlChange}/>
                
                */}
            </form>
            
        </div>
    )
}
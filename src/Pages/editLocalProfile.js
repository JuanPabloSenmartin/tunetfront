import React, { useState, useEffect } from "react";
import {useMySystem} from "../mySystem";
import {useNavigate} from "react-router";
import { useTokenManager } from "../tokenManager";
import '../Styles/editLocalProfile.css'
import DefaultProfilePicture from '../Images/defaultProfilePicture.png'
import UniversidadAustral from '../Images/universidadAustral.jpg'
import FileBase64 from 'react-file-base64';


export const EditLocalProfile = () => {
    const auth = useTokenManager()
    const token = auth.getToken();
    const [email, setEmail] = useState('')
    const [location, setLocation] = useState('')
    const [username, setUsername] = useState('')
    const [description, setDescription] = useState('')
    const [pictureUrl, setPictureUrl] = useState('')
    const [profilePictureUrl, setProfilePictureUrl] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [errorMsg, setErrorMsg] = useState(undefined)
    const [successMsg, setSuccessMsg] = useState(undefined)
    const navigate = useNavigate();
    const mySystem = useMySystem();
    var base = ''


    useEffect(() => {
        const color = "#8860D0";
        document.body.style.background = color;
        fetchData()
    }, [])

    const fetchData = () => {
        //fetches all information from this user
        mySystem.getProfileData(token, (info) => {
            setEmail(info.email)
            setLocation(info.location)
            setUsername(info.username)
            setDescription(info.description)
            setPictureUrl(info.pictureUrl)
            setProfilePictureUrl(info.profilePictureUrl)
            setPhoneNumber(info.phoneNumber)
        }, () => setErrorMsg('ERROR: CANNOT CONNECT WITH API'))
    }



    const handleSubmit = async e => {
        e.preventDefault();
        refreshDatabase({
            email: email,
            location: location,
            username: username,
            description: description,
            pictureUrl: pictureUrl,
            profilePictureUrl: profilePictureUrl,
            phoneNumber: phoneNumber
        })
    }

    const refreshDatabase = (data) => {
        mySystem.refreshDatabaseAfterProfileEdit(data, 
            () => setSuccessMsg('Your profile has been edited successfully!'), 
            () => setErrorMsg('Your profile couldn`t be updated due to an error with out API'))
    }

    const convertToBase64 = (file) => {
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function() {
            var aux = [];
            var base64 = reader.result;
            //aux = base64.split(',');
            //var imgInBase64 = aux[1];
            handleImgInBase64(base64);
        }
    }
    const handleImgInBase64 = (imgInBase64) => {
        console.log(imgInBase64);
        setProfilePictureUrl(imgInBase64);
        base = imgInBase64;
    }
    

    const locationChange = (event) => {
        setLocation(event.target.value)
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
        console.log(event.target.files[0])
        //setProfilePictureUrl(event.target.files[0])
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
                        <img src={profilePictureUrl} />
                    </div>
                    <div className="change-Profile-Picture">
                        <input type="file" 
                        title= " "
                        onChange={(event) => convertToBase64(event.target.files[0])}/>
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
                            name="location"
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

                

                <div className="imagesProf">
                    <h1 className="imagesh1">Images</h1>
                    <img src={UniversidadAustral} className="imgLocalProf"/>
                </div>

                {errorMsg && <div className="alertWarning" role="alert">{errorMsg}</div>}
                {successMsg && <div className="successArt" role="alert">{successMsg}</div>}

                <button type="submit" className="submitButtonEditProf">Save Changes</button>
                {/*
                <input type="text"
                            placeholder="location"
                            value={location}
                            name="location"
                            onChange={LocationChange}/>
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
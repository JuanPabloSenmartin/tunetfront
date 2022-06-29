import React, { useState, useEffect } from "react";
import {useMySystem} from "../mySystem";
import {useNavigate} from "react-router";
import { useTokenManager } from "../tokenManager";
import '../Styles/editLocalProfile.css'
import { useBase64Helper } from "../base64";


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
    const [rating, setRating] = useState('')
    const [errorMsg, setErrorMsg] = useState(undefined)
    const [successMsg, setSuccessMsg] = useState(undefined)
    const navigate = useNavigate();
    const mySystem = useMySystem();
    const Base64Helper = useBase64Helper();



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
            setRating(info.rating)
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
            () => {
                setSuccessMsg('Your profile has been edited successfully!')
                navigate("/localHome");
            }, 
            () => setErrorMsg('Your profile couldn`t be updated due to an error with out API'))
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
        Base64Helper.convertToBase64(event.target.files[0],
            (i) => {
                setPictureUrl(i)
            })
    }
    const profilePictureUrlChange = (event) => {
        Base64Helper.convertToBase64(event.target.files[0],
            (i) => {
                setProfilePictureUrl(i)
            })
        
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
                    <div className="ite">
                        <img src={profilePictureUrl} />
                    </div>
                    <div className="change-Profile-Picture">
                        <input type="file" 
                        title= " "
                        accept="image/png, image/jpeg, image/jpg"
                        onChange={profilePictureUrlChange}/>
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
                    <label className="profLabel">Location</label>
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
                    <div>
                        <label className="profLabel">Rating</label>
                        <p className="resp">{rating}</p>
                    </div>
                    
                </div>

                

                <div className="imagesProf">
                    <h1 className="imagesh1">Images</h1>
                    <img src={pictureUrl} className="imgLocalProf"/>
                    <div className="change-Profile-Picture">
                        <input type="file" 
                        title= " "
                        accept="image/png, image/jpeg, image/jpg"
                        onChange={pictureUrlChange}/>
                    </div>
                </div>

                {errorMsg && <div className="alertWarning" role="alert">{errorMsg}</div>}
                {successMsg && <div className="successArt" role="alert">{successMsg}</div>}

                <button type="submit" className="submitButtonEdit">Save Changes</button>
            </form> 
        </div>
    )
}
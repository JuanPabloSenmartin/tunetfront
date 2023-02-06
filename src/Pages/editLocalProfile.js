import React, { useState, useEffect } from "react";
import {useMySystem} from "../mySystem";
import { useTokenManager } from "../tokenManager";
import '../Styles/editLocalProfile.css'
import { useBase64Helper } from "../base64";
import HomeNavbar from "../Components/HomeNavbar";
import Background from "../Components/Background";
import {FaUserAlt} from 'react-icons/fa'
import {FaMapMarkerAlt} from 'react-icons/fa'
import {FaPhone} from 'react-icons/fa'
import {FaPencilAlt} from 'react-icons/fa'
import {FaRegStar} from 'react-icons/fa'
import {FaTimes} from 'react-icons/fa'
import {FaTrash} from 'react-icons/fa'
import {FaCamera} from 'react-icons/fa'
import {FaImages} from 'react-icons/fa'
import Rating from '@mui/material/Rating';



export const EditLocalProfile = () => {
    const auth = useTokenManager()
    const token = auth.getToken();
    const [email, setEmail] = useState('')
    const [location, setLocation] = useState('')
    const [username, setUsername] = useState('')
    const [description, setDescription] = useState('')
    const [profilePictureUrl, setProfilePictureUrl] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [rating, setRating] = useState(0)
    const [images, setImages] = useState([])
    const [popped, setPopped] = useState(false)
    const [poppedImage, setPoppedImage] = useState('')
    const [x, setX] = useState(false)
    const [errorMsg, setErrorMsg] = useState(undefined)
    const [successMsg, setSuccessMsg] = useState(undefined)
    const mySystem = useMySystem();
    const Base64Helper = useBase64Helper();



    useEffect(() => {
        fetchData()
    }, [x])

    

    const fetchData = () => {
        //fetches all information from this user
        mySystem.getProfileData(token, (info) => {
            setEmail(info.email)
            setLocation(info.location)
            setUsername(info.username)
            setDescription(info.description)
            setPhoneNumber(info.phoneNumber)
            setRating(info.rating)
            
            mySystem.getGalleryImages(info.email,
                (data) => setImages(data),
                () => setErrorMsg('ERROR: CANNOT CONNECT WITH API') )
            
            
            mySystem.getPicFromMail(info.email,
                (data) => setProfilePictureUrl(data),
                () => setErrorMsg('ERROR: CANNOT CONNECT WITH API'))    
        }, () => setErrorMsg('ERROR: CANNOT CONNECT WITH API'))

        
    }



    const handleSubmit = async e => {
        e.preventDefault();
        refreshDatabase({
            email: email,
            location: location,
            username: username,
            description: description,
            phoneNumber: phoneNumber
        })
    }

    const refreshDatabase = (data) => {
        mySystem.refreshDatabaseAfterProfileEdit(data, 
            () => {
                setSuccessMsg('Your profile has been edited successfully!')
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
                addGalleryPicture(i)
            })
    }
    const profilePictureUrlChange = (event) => {
        Base64Helper.convertToBase64(event.target.files[0],
            (img) => {
                setProfilePictureUrl(img)
                mySystem.changeProfilePic({email: email, imageUrl: img},
                    () => setX(!x))
            })
        
    }
    const phoneNumberChange = (event) => {
        setPhoneNumber(event.target.value)
    }

    const popImg = (img) => {
        setPoppedImage(img);
        setPopped(true)
    }

    const eliminateImg = (img) => {
        setPopped(false);
        mySystem.deleteGalleryImage({email: email, imageUrl: img},
            () => setX(!x))
        
    }

    const addGalleryPicture = (img) =>{
        mySystem.addGalleryImage({email: email, imageUrl: img}, 
            () => setX(!x))
    }
    
    return (
        
        <div style={Background()}>
            <HomeNavbar isArtist= {false}/>
            <div className="space"/>
            
            <div className="editProf-top">
            <div className="editProf-image-div">
                <div className="change-pic-div">
                    <label htmlFor="filePicker" className="change-pic-label">
                        <FaCamera/> Change profile picture
                        </label>
                        <input id="filePicker" 
                        style={{visibility:"hidden"}} 
                        type="file"
                        accept="image/png, image/jpeg, image/jpg"
                        onChange={profilePictureUrlChange}/>
                </div>
                <div className="editProf-profPic-div">
                    <img src={profilePictureUrl} className="editProf-profPic-image"/>
                </div >
                
                
            </div>

            <div className="editProf-form-div">
                <form onSubmit={handleSubmit} className="profForm">
                <div className="profile-Settings">

                    <div className="editProf-info">
                        <h1 className="imagesh1">Profile settings</h1>
                        <label className="profLabel"><FaUserAlt/> Username</label>
                        <input type="text"
                            placeholder="Username"
                            value={username}
                            name="username"
                            onChange={usernameChange}/>
                    </div>
                    <br/>
                    <div className="editProf-info">
                        <label className="profLabel"><FaMapMarkerAlt/> Location</label>
                        <input type="text"
                                placeholder="Location"
                                value={location}
                                name="location"
                                onChange={locationChange}/>
                    </div>
                    <br/>
                    <div className="editProf-info">
                        <label className="profLabel"><FaPhone/> Phone number</label>
                        <input type="text"
                            placeholder="Phone number"
                            value={phoneNumber}
                            name="phoneNumber"
                            onChange={phoneNumberChange}/>
                    </div>
                    <br/>
                    <br/>
                    <div className="editProf-info">
                        <label className="DescriptionLabel"><FaPencilAlt/> Description</label>
                        <textarea rows="4" cols="50" type="text"
                            placeholder="Add a description"
                            value={description}
                            name="description"
                            onChange={descriptionChange}/>
                    </div>
                </div>

                <div className="editprof-rightside">
                    <div className="editProf-info">
                        <label className="profLabel"><FaRegStar/> Your Rating</label>
                        <Rating name="read-only" value={rating} readOnly />
                        
                    </div>
                    {errorMsg && <div className="alertWarning" role="alert">{errorMsg}</div>}
                    {successMsg && <div className="successArt" role="alert">{successMsg}</div>}

                    <button type="submit" className="submitButtonEdit">Save Changes</button>
                </div>
                
            </form>
            </div>
            </div>
            <hr className="editProf-hr"/>

            <div className="imagesProfDiv">
                    <h1 className="imagesh1">Image gallery</h1>
                    <div className="add-pic-div">
                        <label htmlFor="filePicker2" className="add-pic-label">
                        <FaImages/> Add picture to your gallery
                        </label>
                        <input id="filePicker2" 
                        style={{visibility:"hidden"}} 
                        type="file"
                        accept="image/png, image/jpeg, image/jpg"
                        onChange={pictureUrlChange}/>
                    </div>
                    

                    
                    <div className="gallery">
                        {images.map((item, index)=>{
                            return(
                                <div className="images-in-gallery" key={index} onClick={() => popImg(item)}>
                                    <img src={item} style={{width: '100%'}}/>
                                </div>
                            )
                        })}
                    </div>
            </div>

            <div className={popped ? "popped-img open" : "popped-img"}>
                <img src={poppedImage}/>
                <FaTimes className="popped-img-closed-Icon" onClick={() => setPopped(false)}/>
                <FaTrash className="popped-img-trash-Icon" onClick={() => eliminateImg(poppedImage)}/>
            </div>

        </div>
    )
}
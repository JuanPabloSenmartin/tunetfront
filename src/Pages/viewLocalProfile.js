import React, { useState, useEffect } from "react";
import '../Styles/viewLocalProfile.css'
import { useLocation, useParams } from 'react-router-dom'
import {useMySystem} from "../mySystem";
import HomeNavbar from "../Components/HomeNavbar";
import Background from "../Components/Background";
import {FaUserAlt} from 'react-icons/fa'
import {FaMapMarkerAlt} from 'react-icons/fa'
import {FaPhone} from 'react-icons/fa'
import {FaPencilAlt} from 'react-icons/fa'
import {FaRegStar} from 'react-icons/fa'
import {FaTimes} from 'react-icons/fa'
import Rating from '@mui/material/Rating';
import InitialNavbar from "../Components/InitialNavbar";


export const ViewLocalProfile = () => {
    const params = useParams()
    const myMail = params.userMail
    const l = useLocation()
    const data = l.state
    const [isSignedIn, setIsSignedIn] = useState(false)
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
    const [errorMsg, setErrorMsg] = useState(undefined)
    const mySystem = useMySystem();

    const unkwnow = "(unknown)";

    useEffect(() => {
        if(data != null && data.isSignedIn) setIsSignedIn(true)
        fetchData()
    }, [])

    const fetchData = () => {
        //fetches all information from this user
        mySystem.getProfileDataByMail(myMail, (info) => {
            setEmail(info.email)
            setLocation(info.location)
            setUsername(info.username)
            setDescription(info.description)
            setPhoneNumber(info.phoneNumber)
            setRating(info.rating)
            
            mySystem.getGalleryImages(myMail,
                (data) => setImages(data),
                () => setErrorMsg('ERROR: CANNOT CONNECT WITH API') )
            
            
            mySystem.getPicFromMail(myMail,
                (data) => setProfilePictureUrl(data),
                () => setErrorMsg('ERROR: CANNOT CONNECT WITH API'))    
        }, () => setErrorMsg('ERROR: CANNOT CONNECT WITH API'))

        
    }

    const popImg = (img) => {
        setPoppedImage(img);
        setPopped(true)
    }

    return (
        <div style={Background()}>
            {isSignedIn ? <HomeNavbar isArtist= {true}/> : <InitialNavbar />}
            <div className="space"/>

            <div className="editProf-top">
            <div className="editProf-image-div">
                
                <div className="editProf-profPic-div">
                    <img src={profilePictureUrl} className="editProf-profPic-image"/>
                </div >
                
                
            </div>

            <div className="editProf-form-div">
                
                <div className="viewprofile-Settings">

                    <div className="viewProf-info">
                        <label className="profLabel"><FaUserAlt/> Username</label>
                        {username != null ? username : unkwnow}
                    </div>
                    <br/>
                    <div className="viewProf-info">
                        <label className="profLabel"><FaMapMarkerAlt/> Location</label>
                        {location != null ? location : unkwnow}
                    </div>
                    <br/>
                    <div className="viewProf-info">
                        <label className="profLabel"><FaPhone/> Phone number</label>
                        {phoneNumber != null ? phoneNumber : unkwnow}
                    </div>
                    <br/>
                    <div className="viewProf-info">
                        <label className="DescriptionLabel"><FaPencilAlt/> Description</label>
                        {description != null ? description : unkwnow}
                    </div>
                    <br/>
                    <div className="viewProf-info">
                        <label className="profLabel"><FaRegStar/> Rating</label>
                        <Rating name="read-only" value={rating} readOnly />
                        {rating == "0" || rating == null ? "No rating given yet" : ""}
                    </div>
                </div>

                
            
            </div>
            </div>
            <hr className="editProf-hr"/>

            <div className="imagesProfDiv">
                    <h1 className="imagesh1">Image gallery</h1>
                    
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
            </div>
        </div>
    )
}
import React, { useState, useEffect } from "react";
import '../Styles/viewArtistProfile.css'
import { useLocation } from 'react-router-dom'
import {useMySystem} from "../mySystem";
import ReactAudioPlayer from 'react-audio-player';
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



export const ViewArtistProfile = () => {
    const l = useLocation()
    const data = l.state
    

    const [username, setUsername] = useState('')
    const [description, setDescription] = useState('')
    const [profilePictureUrl, setProfilePictureUrl] = useState('')
    const [location, setLocation] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [rating, setRating] = useState(0)
    const [images, setImages] = useState([])
    const [songs, setSongs] = useState([])
    const [popped, setPopped] = useState(false)
    const [poppedImage, setPoppedImage] = useState('')
    const [errorMsg, setErrorMsg] = useState(undefined)
    const mySystem = useMySystem();

    const unkwnow = "(unknown)";

    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = () => {
        //fetches all information from this user
        mySystem.getProfileDataByMail(data.mail, (info) => {
            setUsername(info.username)
            setDescription(info.description)
            setLocation(info.location)
            setPhoneNumber(info.phoneNumber)
            setRating(info.rating)

            mySystem.getGalleryImages(data.mail,
                (dataa) => setImages(dataa),
                () => setErrorMsg('ERROR: CANNOT CONNECT WITH API') )
            
            mySystem.getSongs(data.mail,
                (dataa) => setSongs(dataa),
                () => setErrorMsg('ERROR: CANNOT CONNECT WITH API') )
            
            mySystem.getPicFromMail(data.mail,
                (dataa) => setProfilePictureUrl(dataa),
                () => setErrorMsg('ERROR: CANNOT CONNECT WITH API')) 
            
               
        }, () => setErrorMsg('ERROR'))
    }
    
    const popImg = (img) => {
        setPoppedImage(img);
        setPopped(true)
    }

    return (
        
        <div style={Background()}>
            {data.isSignedIn ? <HomeNavbar isArtist= {false}/> : <InitialNavbar />}
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
                        <label className="profLabel"><FaPhone/> Phone number</label>
                        {phoneNumber != null ? phoneNumber : unkwnow}
                    </div>
                    <br/>
                    <div className="viewProf-info">
                        <label className="DescriptionLabel"><FaPencilAlt/> Description</label>
                        {description != null ? description : unkwnow}
                    </div>
                    <br/>
                    <br/>
                    <div className="viewProf-info">
                        <label className="profLabel"><FaRegStar/> Rating</label>
                        <Rating name="read-only" value={rating} readOnly />
                        {rating == 0 || rating == null ? "No rating given yet" : ""}
                    </div>
                </div>
                
            
            </div>
            </div>
            <hr className="editProf-hr"/>

            <div className="MusicSamples">
                <h1 className="imagesh1">Music samples</h1>

                <div>
                    
                    <div className="music-gallery">
                        {songs.map((song, index)=> {
                            return(
                                <div className="song-in-gallery" key={index}>
                                    <ReactAudioPlayer
                                    src={song}
                                    controls
                                    />
                                    
                                </div>
                            )
                        })}
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
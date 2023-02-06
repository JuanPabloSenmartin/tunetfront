import React, { useState, useEffect} from "react";
import '../Styles/postInArtistFeed.css'
import {useNavigate} from "react-router";
import {useMySystem} from "../mySystem";
import {useTokenManager} from "../tokenManager"
import { Link } from "react-router-dom";
import {FaUserAlt} from 'react-icons/fa'
import {FaCalendar} from 'react-icons/fa'
import {FaMusic} from 'react-icons/fa'
import {FaMapMarkedAlt} from 'react-icons/fa'
import {FaRegStar} from 'react-icons/fa'
import {FaPencilAlt} from 'react-icons/fa'
import Rating from '@mui/material/Rating';


export const PostInArtistFeed = (props) => {
    
    const title = props.post.title;
    const postID = props.post.id;
    const description = props.post.description;
    const date = props.post.date;
    const mail = props.post.localEmail;
    const pic = props.post.picture;
    const distance = props.post.distance;
    const genre = props.post.genre;
    const rating = props.post.rating;
    const [clicked, setClicked] = useState(false)
    const [hovered, setHovered] = useState(false)
    const mySystem = useMySystem()
    const auth = useTokenManager()
    const token = auth.getToken();
    

    const submitApplication = () => {
        mySystem.addArtistToPostList({
            token: token,
            postID: postID
        },
        () => {
            setClicked(true)
        },
        
        )
    }
    const unSubmitApplication = () => {
        mySystem.deleteArtistFromPostList({
            token: token,
            postID: postID
        },
        () => {
            
            setClicked(false)
        },
        
        )
    }

    return(
            <div className="postInFeed">
                <div className="left-of-post">
                    <div className="title-post">
                        <h1 className="h1Title">{title}</h1>
                    </div>
                    <div className="imgDivPic">
                        <img className="profPicInPost" src={pic} />
                    </div>
                    <div className="view-profile-div-post">
                            <Link to="/viewLocalProfile" state={{ mail: mail, isSignedIn: props.isSignedIn} } >
                                <button className="view-profile-button-post">
                                    View Profile
                                </button>
                            </Link>
                    </div>
                </div>
                
                <div className="right-of-post">
                    <br/>
                    <div className="post-detail-info">
                        <label><FaUserAlt/> Email</label>
                        <div className="post-info-response">
                            {mail}
                        </div>
                    </div>
                    <div className="post-detail-info">
                        <label><FaCalendar/> Date</label>
                        <div className="post-info-response">
                            {date}
                        </div>
                    </div>
                    <div className="post-detail-info">
                        <label><FaMusic/> Genre</label>
                        <div className="post-info-response">
                            {genre != null && genre != "" ? genre : "Any"}
                        </div>
                    </div>
                    <div className="post-detail-info">
                        <label><FaMapMarkedAlt/> Km from you</label>
                        <div className="post-info-response">
                            {distance != -1 ? distance : "undifined"}
                        </div>
                    </div>
                    <div className="post-detail-info">
                        <label><FaRegStar/> Rating</label>
                        <div className="post-info-response">
                            <Rating name="read-only" value={rating} readOnly />
                        </div>
                    </div>
                    <div className="post-decription-info">
                        <label><FaPencilAlt/> Description</label>
                        <div className="post-decription-response">
                            <br/>
                            {description}
                        </div>
                    </div>

                    
                    <div className="submit-app-div-post">
                         {props.isSignedIn && (!clicked ? <button className="submitButton-post" onClick={submitApplication}>Submit my application</button> : <button className="submitButton-post-clicked" onMouseLeave={() => setHovered(false)} onMouseEnter={() => setHovered(true)} onClick={unSubmitApplication}>{hovered ? "Unsubmit application" : "Application submitted"}</button>)}
                    </div>
                    
                </div>
            </div>
        )
    
}
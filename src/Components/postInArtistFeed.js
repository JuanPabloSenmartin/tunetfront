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
    const [pic, setPic] = useState('')
    const navigate = useNavigate();
    const mySystem = useMySystem()
    const auth = useTokenManager()
    const token = auth.getToken();
    const [errorMsg, setErrorMsg] = useState(undefined)
    const [successMsg, setSuccessMsg] = useState(undefined)
    const [submitButton, setSubmitButton] = useState(true)

    
    useEffect(() => {
        fetchProfPic();
    }, [])

    const fetchProfPic = () => {
        mySystem.getPicFromMail(mail, 
            (i) =>  setPic(i),
            () => setErrorMsg('error in fetch picture'))
    }

    const submitApplication = () => {
        mySystem.addArtistToPostList({
            token: token,
            postID: postID
        },
        () => {
            setSuccessMsg('You have applied sucessfully')
            setSubmitButton(false)
        },
        () => setErrorMsg('ERROR'),
        () => setErrorMsg('Already submited'))
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
                            <Link to="/viewLocalProfile" state={{ mail: mail} } >
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
                        <label><FaMusic/> Gendre</label>
                        <div className="post-info-response">
                            GENDRES
                        </div>
                    </div>
                    <div className="post-detail-info">
                        <label><FaMapMarkedAlt/> Km from you</label>
                        <div className="post-info-response">
                            10 km
                        </div>
                    </div>
                    <div className="post-detail-info">
                        <label><FaRegStar/> Rating</label>
                        <div className="post-info-response">
                            <Rating name="read-only" value={3} readOnly />
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
                         {submitButton && <button className="submitButton-post" onClick={submitApplication}>Submit my application</button>}
                    </div>
                    
                    
                    {errorMsg && <div className="alertWarning" role="alert">{errorMsg}</div>}
                    {successMsg && <div className="successArt" role="alert">{successMsg}</div>}
                    
                    
                </div>
            </div>
        )
    
}
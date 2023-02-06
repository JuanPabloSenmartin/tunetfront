import React, {useState} from "react";
import { Link } from "react-router-dom";
import {FaUserAlt} from 'react-icons/fa'
import {FaCalendar} from 'react-icons/fa'
import {FaMusic} from 'react-icons/fa'
import {FaMapMarkedAlt} from 'react-icons/fa'
import {FaRegStar} from 'react-icons/fa'
import {FaPencilAlt} from 'react-icons/fa'
import Rating from '@mui/material/Rating';

export const GenericPost = (props) => {
    const [newRating, setNewRating] = useState(0);
    const post = props.post;

    return(
        <div className="artistEvents-post">
                                <div className="artistEvents-post-left">
                                    <br/>
                                    <div className="artistEvents-post-detail-info">
                                        <label><FaUserAlt/> Email</label>
                                        <div className="artistEvents-post-info-response">
                                            {post.localEmail}
                                        </div>
                                    </div>
                                    <div className="artistEvents-post-detail-info">
                                        <label><FaCalendar/> Date</label>
                                        <div className="artistEvents-post-info-response">
                                            {post.date}
                                        </div>
                                    </div>
                                    <div className="artistEvents-post-detail-info">
                                        <label><FaMusic/> Genre</label>
                                        <div className="artistEvents-post-info-response">
                                            {post.genre != null && post.genre != "" ? post.genre : "Any"}
                                        </div>
                                    </div>
                                    <div className="artistEvents-post-detail-info">
                                        <label><FaMapMarkedAlt/> Km from you</label>
                                        <div className="artistEvents-post-info-response">
                                            {post.distance != -1 ? post.distance : "undifined"}
                                        </div>
                                    </div>
                                    <div className="artistEvents-post-detail-info">
                                        <label><FaRegStar/> Rating</label>
                                        <div className="artistEvents-post-info-response">
                                            <Rating name="read-only" value={post.rating} readOnly />
                                        </div>
                                    </div>
                                    <div className="artistEvents-post-decription-info">
                                        <label><FaPencilAlt/> Description</label>
                                        <div className="artistEvents-post-decription-response">
                                            {post.description}
                                        </div>
                                    </div>
                                </div>
                                <div className="artistEvents-post-middle">
                                    <div className="w100-h85"/>
                                    <div className="artistEvents-buton-post-div">
                                        {props.type != "previous" && <button className="artistEvents-cancelPostulation-buton" onClick={()=> props.cancelPostulation(post.id)}>{props.type == "postulated" ? "Cancel postulation" : "Cancel event"}</button>}
                                        {props.type == "previous" && newRating == 0 && <Rating name="simple-controlled" value={newRating} onChange={(event, newValue) => {
                                            setNewRating(newValue);
                                            props.rateLocal(post.localEmail, newValue);
                                            }} />}
                                        {props.type == "previous" && newRating != 0 && <Rating name="read-only" value={newRating} readOnly /> }
                                        {props.type == "previous" && newRating != 0 && "thanks for feedback" }
                                    </div>
                                </div>
                                <div className="artistEvents-post-right">
                                    <div className="artistEvents-profpic-div">
                                        <img className="profPicInPost" src={post.picture} />
                                    </div>
                                    <div className="view-profile-div-post">
                                        {props.type == "accepted" &&
                                            <Link to="/chat" state={{emailHIM: post.localEmail, emailME: post.artistEmail, isMEartist: true, fromPost: true}} >
                                                <button className="view-profile-button-post">
                                                    Chat
                                                </button>
                                            </Link>}
                                            
                                            <Link to="/viewLocalProfile" state={{ mail: post.localEmail, isSignedIn: true} } >
                                            <button className="view-profile-button-post">
                                                View Profile
                                            </button>
                                            </Link>
                                    </div>
                                </div>
                            </div>
    )
}
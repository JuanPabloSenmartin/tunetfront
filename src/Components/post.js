import React from "react";
import '../Styles/post.css'
import { Link } from "react-router-dom";
import Rating from '@mui/material/Rating';
import {FaSortDown} from 'react-icons/fa'
import {FaSortUp} from 'react-icons/fa'
import {FaTrash} from 'react-icons/fa'




export const Post = (props) => {
    const post = props.post;
    
 
    
    return(
            <div className="local-post-div">
                <div className="local-post-title-div">
                        <div className="artistEvents-post-title-text">{post.title}</div>
                        {props.selected == post ? <FaSortDown className="artistEvents-post-title-icon-down" onClick={()=> props.setSelected(undefined)}/> : <FaSortUp className="artistEvents-post-title-icon-up" onClick={()=> props.setSelected(post)}/>}
                </div>

                {props.selected == post && 
                <div className="local-post-inside-div">
                    <div className="local-post-inside-info">
                        <h1 className="localpost-h1">Post information</h1>
                        <div className="local-post-inside-info-left">
                            <p className="localPost-p">Date:  {post.date}</p>
                            <p className="localPost-p">Description:    {post.description}</p>
                        </div>
                        <div className="local-post-inside-info-right">
                            <button onClick={() => props.deletePost(post.id)} className="local-post-button-delete">
                                <FaTrash/> Delete post
                            </button>
                        </div>
                    </div>
                    <div className="localpost-h1-div">
                        <h1 className="localpost-h1">Postulated artists</h1>
                    </div>
                    <ul className="local-post-artistList-ul">
                    {post.artistList.length == 0 ? "No artist has postulated yet" : post.artistList.map((data, index) => {
                        return(
                            <li key={index} className="local-post-artistList-li">
                                <div className="local-post-artistList-li-left">
                                    <div className="localpost-profPic-div">
                                        <img src={data.artistProfPic} className="localpost-profPic"/>
                                    </div>
                                    {data.artistEmail}
                                    <Rating name="read-only" value={data.artistRating} readOnly />
                                </div>
                                <div className="local-post-artistList-li-right">
                                <Link to={"/viewArtistProfile/" + data.artistEmail} state={{ isSignedIn: true} } >
                                         <button className="local-post-artistList-ul-button">
                                             View Profile
                                         </button>
                                </Link> 

                                <Link to="/chat" state={{emailHIM: data.artistEmail, emailME: post.localEmail, isMEartist: false, fromPost: true}} >
                                         <button className="local-post-artistList-ul-button">
                                             Chat
                                         </button>
                                </Link>
                                <Link to="/myEvents" state={{isArtist:false}} >
                                    <button className="local-post-artistList-ul-button-accept" onClick={() => {
                                        props.acceptArtist(post.id, data.id);
                                        props.sendEmail(data.artistEmail, post.title);
                                        }}>Accept Artist</button>
                                </Link>
                                </div>

                            </li>
                        )   
                    })}
                </ul>
                </div>
                }

            </div>
    )
    
}

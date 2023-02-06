import React, { useState, useEffect } from "react";
import '../Styles/post.css'
import { Link } from "react-router-dom";
import {useMySystem} from "../mySystem";
import Rating from '@mui/material/Rating';
import {FaSortDown} from 'react-icons/fa'
import {FaSortUp} from 'react-icons/fa'




export const Post = (props) => {
    const post = props.post;
    
 
    
    return(
            <div className="post">
                <div className="artistEvents-post-title-div">
                        <div className="artistEvents-post-title-text">{post.title}</div>
                        {props.selected == post ? <FaSortDown className="artistEvents-post-title-icon-down" onClick={()=> props.setSelected(undefined)}/> : <FaSortUp className="artistEvents-post-title-icon-up" onClick={()=> props.setSelected(post)}/>}
                </div>

                {props.selected == post && 
                <ul>
                    {post.artistList.map((data, index) => {
                        return(
                            <li key={index}>
                                mail:{data.artistEmail}
                                <Link to="/viewArtistProfile" state={{ mail: data.artistEmail, isSignedIn: true} } >
                                         <button >
                                             View Profile
                                         </button>
                                </Link> 

                                <Link to="/chat" state={{emailHIM: data.artistEmail, emailME: post.localEmail, isMEartist: false, fromPost: true}} >
                                         <button >
                                             Chat
                                         </button>
                                </Link>
                                <Link to="/myEvents" state={{isArtist:false}} >
                                    <button onClick={() => props.acceptArtist(post.id, data.id)}>Accept Artist</button>
                                </Link>
                                <Rating name="read-only" value={data.rating} readOnly />

                            </li>
                        )   
                    })}
                </ul>
                }

            </div>
    )
    
}

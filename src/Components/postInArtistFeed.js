import React, { useState, useEffect } from "react";
import '../Styles/postInArtistFeed.css'
import {useNavigate} from "react-router";
import {useMySystem} from "../mySystem";
import {useTokenManager} from "../tokenManager"



export const PostInArtistFeed = (props) => {
    
    const title = props.post.title;
    const postID = props.post.id;
    const description = props.post.description;
    const date = props.post.date;
    const navigate = useNavigate();
    const mySystem = useMySystem()
    const auth = useTokenManager()
    const token = auth.getToken();
    const [errorMsg, setErrorMsg] = useState(undefined)

    const handleClick = () => {
        navigate("/viewLocalProfile")
    }

    const submitApplication = () => {
        mySystem.addArtistToPostList({
            token: token,
            postID: postID
        },
        () => {
            console.log('se aplico')
        },
        () => setErrorMsg('ERROR'))
    }
    
    return(
            <div className="postInFeed">
                <h2>Title : {title}</h2>
                <p>PostID : {postID}</p>
                <p>Description : {description}</p>
                <p>Date : {date}</p>
                <button onClick={handleClick}>View Local Profile</button>
                <button onClick={submitApplication}>Submit my application</button>
            </div>
        )
    
}
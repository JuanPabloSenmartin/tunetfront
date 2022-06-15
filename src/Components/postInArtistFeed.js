import React, { useState, useEffect} from "react";
import '../Styles/postInArtistFeed.css'
import {useNavigate} from "react-router";
import {useMySystem} from "../mySystem";
import {useTokenManager} from "../tokenManager"
import { Link } from "react-router-dom";



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
        },
        () => setErrorMsg('ERROR'),
        () => setErrorMsg('Already submited'))
    }
    
    return(
            <div className="postInFeed">
                <h1 className="h1Title">{title}</h1>
                <div className="imgDivPic">
                    <img className="picFeed" src={pic} />
                </div>
                <div className="infoInPost">
                    <div className="mss">
                    <label >Email</label>
                    <p>{mail}</p>
                    <Link  to="/viewLocalProfile" state={{ mail: mail} } >
                        <button className="linkToviewLocal">
                            View Profile
                        </button>
                    </Link>
                    </div>
                    
                    <div className="mss">
                    <label >Date</label>
                    <p className="ll">{date}</p>
                    </div>
                    <div className="mss">
                    <label >Description</label>
                    <p>{description}</p>
                    </div>

                    {errorMsg && <div className="alertWarning" role="alert">{errorMsg}</div>}
                    {successMsg && <div className="successArt" role="alert">{successMsg}</div>}
                    
                    <button className="buttonSubmitApp" onClick={submitApplication}>Submit my application</button>
                </div>
            </div>
        )
    
}
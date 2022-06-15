import React, { useState, useEffect } from "react";
import '../Styles/post.css'
import { Link } from "react-router-dom";
import {useMySystem} from "../mySystem";



export const Post = (props) => {
    
    const title = props.post.title;
    const postID = props.post.id;
    const description = props.post.description;
    const date = props.post.date;
    const [errorMsg, setErrorMsg] = useState(undefined)
    const mySystem = useMySystem()
    const [artistList, setArtistList] = useState([])
    
    useEffect(() => {
        handleArtistList(postID)
    }, [])

    const handleArtistList = (postID) => {
        mySystem.getArtistList(postID,
            (i) => setArtistList(i),
            () => setErrorMsg('Unable to get artist list')
            )
    }

    const handleClick = () => {
        props.setSelectedPost(props.post)
    }

    
    return(
            <div className="post">
                <nav>
                    
                    <label onClick={handleClick} >
                        <span>{title}</span>
                    </label>               
                    {/* <input type="checkbox" id="touch"/>  */}

                    <ul key={title}  >
                        
                       {props.opened ? artistList.map((i) => {
                            return(
                                <li className="slide" 
                                key={i.artistEmail}>
                                    mail:{i.artistEmail} 
                                    
                                    <Link to="/viewArtistProfile" state={{ mail: i.artistEmail} } >
                                        <button >
                                            View Profile
                                        </button>
                                    </Link> 
                                </li>
                            )
                        }) : "" }
                    </ul>
                </nav> 
            </div>
    )
    
}

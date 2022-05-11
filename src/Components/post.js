import React, { useState, useEffect } from "react";
import '../Styles/post.css'
import { Link } from "react-router-dom";
import { useLocation } from 'react-router-dom'


export const Post = (props) => {
    
    const title = props.title;
    const artistList = props.artistList;
    
    

    const handleClick = () => {

    }

    
    return(
            <div className="post">
                <nav>
                    <label htmlFor="touch"><span>{title}</span></label>               
                    <input type="checkbox" id="touch"/> 

                    <ul className="slide" key={title} >
                        
                        {artistList.map((i) => {
                            return(
                                <li key={i.mail}>
                                    name:{i.name} mail:{i.mail} 
                                    <Link to="/viewArtistProfile" state={{ mail: i.mail} } >
                                        <button >
                                            View Profile
                                        </button>
                                    </Link> 
                                </li>
                            )
                        })
                        }
                    </ul>
                </nav> 
            </div>
        )
    
}

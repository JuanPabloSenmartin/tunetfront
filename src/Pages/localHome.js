import React, { useState, useEffect } from "react";
import '../Styles/localHome.css'
import ConfigurationIcon from '../Images/configurationIcon.png'
import NewPostIcon from '../Images/newPostIcon.png'
import {Link} from 'react-router-dom'
import {Post} from '../Components/post'
import {useMySystem} from "../mySystem";
import {useNavigate} from "react-router";
import {useTokenManager} from "../tokenManager"



export const LocalHome = () => {
    const navigate = useNavigate()
    const mySystem = useMySystem()
    const auth = useTokenManager()
    const [errorMsg, setErrorMsg] = useState(undefined)
    const [posts, setPosts] = useState([])
    const token = auth.getToken();

    useEffect(() => {
        const color = "#8860D0";
        document.body.style.background = color;
        //fetchPosts();
    }, [])
    
    const signOut = () => {
        console.log(token)
        auth.removeToken();
        navigate("/login");
    }

    const fetchPosts = () => {
        mySystem.getPostList(token, (posts) => setPosts(posts), () => setErrorMsg('ERROR'));
    }

    const handleClick = () => {
        navigate("/editLocalProfile");
    }


    const data = [{
        "title": "test1",
        "artistList": [{
            "name": "juampi",
            "mail": "gg"
        },
        {
            "name": "juampi2",
            "mail": "juampi.sen2"
        }]
    },
    {
        "title": "test2",
        "artistList": [{
            "name": "julian",
            "mail": "julia@"
        }]
    }]
    return (
        <div >
            <div className="div1">
                <Link to="/createPost"><img src={NewPostIcon} className="add"/> </Link>
                <div className="dropdown">
                    
                </div>
                <button onClick={handleClick}>Edit Profile</button>
            </div>
            <div className="div2">
                <h2>My posts</h2>
            </div>
            <div className="div3">

                <h1>ACA ESTAN LOS POSTS</h1>
                {data.map((info) => {
                    return(
                        <Post key={info.title} title={info.title}  artistList={info.artistList} />
                    )
                })}
                
            </div>
   
             
        </div>
    )
}


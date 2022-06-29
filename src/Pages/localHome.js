import React, { useState, useEffect } from "react";
import '../Styles/localHome.css'
import NewPostIcon from '../Images/newPostIcon.png'
import {Link} from 'react-router-dom'
import {Post} from '../Components/post'
import {useMySystem} from "../mySystem";
import {useNavigate} from "react-router";
import {useTokenManager} from "../tokenManager"
import { LogOut } from "../Components/logOut";



export const LocalHome = () => {
    const navigate = useNavigate()
    const mySystem = useMySystem()
    const auth = useTokenManager()
    const token = auth.getToken()
    const [errorMsg, setErrorMsg] = useState(undefined)
    const [posts, setPosts] = useState([])
    
    const [selectedPost, setSelectedPost] = useState(undefined)
    

    useEffect(() => {
        const color = "#8860D0";
        document.body.style.background = color;
        fetchPosts()
    }, [])
    
    

    const fetchPosts = () => {
        mySystem.getPosts(token,
             (p) => {
                 setPosts(p)
            },
              () => setErrorMsg('ERROR'));
    }

    const handleClick = () => {
        navigate("/editLocalProfile");
    }

    return (
        <div>
            <div className="div1">
                <Link to="/createPost"><img src={NewPostIcon} className="add"/> </Link>
                <Link to="/chat" state={{
                            emailHIM: '', 
                            emailME: '', 
                            isMEartist: false,
                            fromPost: false           
                        }}><button>My chats</button></Link>
                <LogOut/>
                <button onClick={handleClick}>Edit Profile</button> 
            </div>
            
            <div className="div3">

                <h1>YOUR POSTS</h1>
                
                {posts.map((info) => {
                    return(
                        <div>
                            <Post setSelectedPost={setSelectedPost}  post={info} opened={selectedPost && info.id === selectedPost.id} key={info.id}  />
                        </div>
                    )
                })}
                
            </div>     
        </div>
    )
}


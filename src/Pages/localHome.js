import React, { useState, useEffect } from "react";
import '../Styles/localHome.css'
import {Post} from '../Components/post'
import {useMySystem} from "../mySystem";
import {useTokenManager} from "../tokenManager"
import HomeNavbar from "../Components/HomeNavbar";
import Background from "../Components/Background";
import {FaRegPlusSquare} from 'react-icons/fa'
import {useNavigate} from "react-router";





export const LocalHome = () => {
    const mySystem = useMySystem()
    const auth = useTokenManager()
    const token = auth.getToken()
    const navigate = useNavigate();
    const [x, setX] = useState(false)
    const [errorMsg, setErrorMsg] = useState(undefined)
    const [posts, setPosts] = useState([])
    const [selectedPost, setSelectedPost] = useState(undefined)
    

    useEffect(() => {
        fetchPosts()
    }, [x])
    
    

    const fetchPosts = () => {
        mySystem.getLocalPosts(token,
             (p) => {
                 setPosts(p)
            },
              () => setErrorMsg('ERROR'));
    }

    const acceptArtist = (postId, artistListId) => {
        mySystem.acceptArtistInPost({
            token:token,
            artistListId: artistListId,
            postId: postId
        },
        () => {},
        ()=> {})
    }
    const sendEmail = (artistEmail, title) => {
        mySystem.sendMail({
            emailTo:artistEmail,
            type:"accepted",
            token:token,
            postTitle:title
        },
        () => {},
        () => {})
    }
    const deletePost = (id) => {
        mySystem.deletePost(id,
        () => {setX(!x)},
        () => {})
    }


    return (
        <div style={Background()}>
            <HomeNavbar isArtist= {false}/>
            <div className="space"/>

            <div className="div1">
                <FaRegPlusSquare className="plus-icon" onClick={() => navigate("/createPost")}/> Create Post
            </div>
            
            <div className="div3">

                <h1 className="current-posts-title">Your current posts</h1>
                
                {posts.map((info, index) => {
                    return(
                        <div>
                            <Post setSelected={setSelectedPost} selected={selectedPost} key={index} post={info} acceptArtist={acceptArtist} sendEmail={sendEmail} deletePost={deletePost} />
                        </div>
                    )
                })}
                
            </div>     
        </div>
    )
}


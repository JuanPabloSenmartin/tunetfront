import React, { useEffect , useState} from "react";
import {useNavigate} from "react-router";
import {useMySystem} from "../mySystem";
import { PostFeed } from "../Components/postFeed";
import {useTokenManager} from "../tokenManager"
import InitialNavbar from "../Components/InitialNavbar";
import '../Styles/discover.css'
import Background from "../Components/Background";



export const Discover = () => {
    const auth = useTokenManager()
    const token = auth.getToken()
    const mySystem = useMySystem()
    const [posts, setPosts] = useState([])
    

    useEffect(() => {
        fetchPostsInFeed()
    }, [])

    const fetchPostsInFeed = () => {
        mySystem.getAllPosts(
            (i) => {
                setPosts(i)
            },
            () => {});
    }

    
    return (
        <div style={Background()}>
            <InitialNavbar/>
            <div className="space"/>
            <PostFeed posts={posts}/>
            
        </div>
    )
}
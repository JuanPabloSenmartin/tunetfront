import React, { useEffect , useState} from "react";
import '../Styles/artistHome.css'
import {useNavigate} from "react-router";
import { LogOut } from "../Components/logOut";
import {useMySystem} from "../mySystem";
import { PostInArtistFeed } from "../Components/postInArtistFeed";
import {Link} from 'react-router-dom'
    



export const ArtistHome = () => {
    const navigate = useNavigate()
    const mySystem = useMySystem()
    const [posts, setPosts] = useState([])
    const [errorMsg, setErrorMsg] = useState(undefined)

    useEffect(() => {
        fetchPostsInFeed()
    }, [])

    const fetchPostsInFeed = () => {
        mySystem.getAllPosts( 
            (i) => {
                setPosts(i)
            },
            () => setErrorMsg('ERROR'));
    }


    const handleClick = () => {
        navigate("/editArtistProfile");
    }
    
    
    return (
        <div>
            <button  onClick={handleClick}>editar perfil</button>
            <LogOut/>
            <Link to="/chat" state={{
                            emailHIM: '', 
                            emailME: '', 
                            isMEartist: true,
                            fromPost: false           
                        }}><button>My chats</button></Link>
            
            <h1>POSTS</h1>


            {posts.map((info) => {
                    return(
                        <div>
                            <PostInArtistFeed post={info} key={info.title}  />
                            <br/>
                            <br/>    
                        </div>
                    )
                })}
            
            {errorMsg && <div className="alertWarning" role="alert">{errorMsg}</div>}
        </div>
    )
}
import React, { useEffect , useState} from "react";
import '../Styles/artistHome.css'
import {useNavigate} from "react-router";
import { useTokenManager } from "../tokenManager";
import { LogOut } from "../Components/logOut";
import {useMySystem} from "../mySystem";
import { PostInArtistFeed } from "../Components/postInArtistFeed";



export const ArtistHome = () => {
    const navigate = useNavigate()
    const mySystem = useMySystem()
    const auth = useTokenManager()
    const token = auth.getToken();
    const [posts, setPosts] = useState([])
    const [errorMsg, setErrorMsg] = useState(undefined)

    useEffect(() => {
        fetchPostsInFeed()
    }, [])

    const fetchPostsInFeed = () => {
        mySystem.getAllPosts(null, 
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
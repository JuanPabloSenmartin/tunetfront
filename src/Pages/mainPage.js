import React, { useEffect , useState} from "react";
import '../Styles/mainMenu.css'
import {useNavigate} from "react-router";
import {useMySystem} from "../mySystem";
    



export const MainPage = () => {
    
    const navigate = useNavigate()
    const mySystem = useMySystem()
    const [posts, setPosts] = useState([])
    const [errorMsg, setErrorMsg] = useState(undefined)

    useEffect(() => {
        
    }, [])

    
    
    return (
        <div>
            <button onClick={() => navigate("/login")}>Log in</button>
            <button onClick={() => navigate("/register")}>Register</button>
        </div>
    )
}
import React, {useState} from "react";
import '../Styles/dropdown.css'
import {useMySystem} from "../mySystem";
import {useTokenManager} from "../tokenManager"
import { Link } from "react-router-dom";





export const Dropdown= (props) => {
    const mySystem = useMySystem()
    const auth = useTokenManager()
    const token = auth.getToken()
    const [click, setClick] = useState(false)

    const handleClick = () => setClick(!click)

    const handleLogOut = () => {
        setClick(false)
        mySystem.logout(token, () => auth.removeToken(), )
    }

    return (
        <>
            <ul onClick={handleClick} className={click ? 'dropdown-menu clicked' : 'dropdown-menu'}>
                <li key={0}>
                    
                    <Link to={props.isArtist ? "/editArtistProfile" : "/editLocalProfile"} className="dropdown-link" onClick={() => setClick(false)}>
                        Edit profile
                    </Link>
                </li>
                <li key={1}>
                    
                    <Link to="/login" className="dropdown-link" onClick={handleLogOut}>
                        Sign out
                    </Link>
                </li>
            </ul>
        </>
    )
}

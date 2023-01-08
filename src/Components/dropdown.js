import React, {useState} from "react";
import '../Styles/dropdown.css'
import {useMySystem} from "../mySystem";
import {useTokenManager} from "../tokenManager"




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
                    <a href={props.isArtist ? "editArtistProfile" : "editLocalProfile"} className="dropdown-link" onClick={() => setClick(false)}>
                        Edit profile 
                    </a>
                </li>
                <li key={1}>
                    <a href="login" onClick={handleLogOut} className="dropdown-link" >
                        Sign out
                    </a>
                </li>
            </ul>
        </>
    )
}

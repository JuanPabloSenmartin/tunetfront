import React, { useState, useEffect } from "react";
import {useNavigate} from "react-router";
import { useMySystem } from "../mySystem";
import {useTokenManager} from "../tokenManager"

export const LogOut = () => {
    const navigate = useNavigate()
    const auth = useTokenManager()
    const token = auth.getToken()
    const mySystem = useMySystem()
    const [errorMsg, setErrorMsg] = useState(undefined)


    const handleClick = () => {
        mySystem.logout(token, () => navigate("/login"), (msg) => setErrorMsg(msg))
        auth.removeToken()
    }

    return(
        <div>
            <button onClick={handleClick}>Log out</button>
            {errorMsg && <div className="alertWarning" role="alert">{errorMsg}</div>}
        </div>
    )
}
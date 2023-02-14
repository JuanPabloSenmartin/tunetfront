import {React, useState} from "react";
import '../Styles/login.css'
import {Link} from "react-router-dom";
import {useMySystem} from "../mySystem";
import {useNavigate} from "react-router";
import { useTokenManager } from "../tokenManager";
import InitialNavbar from "../Components/InitialNavbar";
import {FaEnvelope} from 'react-icons/fa'
import {FaKey} from 'react-icons/fa'
import Background from "../Components/Background";
import {useLocation} from 'react-router-dom';



export const Login = () => {
    

    const [mail, setMail] = useState('')
    const [password, setPassword] = useState('')
    const [errorMsg, setErrorMsg] = useState(undefined)
    const navigate = useNavigate();
    const mySystem = useMySystem();
    const myTokenManager = useTokenManager();
    const location = useLocation();


    const handleSubmit = async e => {
        e.preventDefault();
        logUser({
            email: mail,
            password: password
        })
    }

    

    const resetForm = () => {
        setMail('')
        setPassword('')
    }

    const logUser = (user) => {
        mySystem.login(
            user,
            (token) => {
                myTokenManager.setToken(token)
                navigate("/artistHome", {replace: true})
            },
            (token) => {
                myTokenManager.setToken(token)
                navigate("/localHome", {replace: true})
            },
            (msg) => {
                setErrorMsg(msg);
                resetForm();
            }
        )
    }

    const passwordChange = (event) => {
        setPassword(event.target.value)
    }

    const mailChange = (event) => {
        setMail(event.target.value)
    }

    

    return(
        <div style={Background()} >
            
            <InitialNavbar/>
            <div className="space"/>

            <h1 className="big-title">WELCOME TO TUNET</h1>
            <div className="testbox-login">
                <h1 className="small-title">Sign in</h1>
                <br/>
                
                <form onSubmit={handleSubmit} className="login-form">
                    <hr />
                    <br/>
                    <br/>
                    <br/>
                    <div className="login-label-input">
                    <label id="icon" ><FaEnvelope/></label>
                    <input type="text"
                            className="input-login"
                            placeholder="Mail"
                            value={mail}
                            name="email"
                            onChange={mailChange}/>
                    </div>
                    <label id="icon" ><FaKey/></label>
                    <input type="password"
                            className="input-password-login"
                            id="floatingPassword"
                            placeholder="Password"
                            name="password"
                            value={password}
                            onChange={passwordChange}/>
                    <div className="bottom-text">
                        <p className="login-p">Not registered yet? <Link to="/register" style={{paddingLeft: 13, color: 'inherit',  backgroundColor: 'inherit'}}>Register here</Link></p>
                        <button className="submitButton" type="submit">Sign in</button>
                    </div>
                    {location.state != null && <div className="successArt" role="alert">You have registered in Tunet!</div>}
                    {errorMsg && <div className="alertWarning" role="alert">{errorMsg}</div>}
                </form> 
            </div>
        </div>
    )

}
    

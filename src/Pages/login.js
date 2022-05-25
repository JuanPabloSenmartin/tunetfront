import {React, useEffect, useState} from "react";
import '../Styles/login.css'
import {Link} from "react-router-dom";
import logoTest from '../Images/logoTest1.png'
import {useMySystem} from "../mySystem";
import {useNavigate} from "react-router";
import { useTokenManager } from "../tokenManager";

export const Login = () => {
    useEffect(() => {
        const color = "#8860D0";
        document.body.style.background = color;
      });

    const [mail, setMail] = useState('')
    const [password, setPassword] = useState('')
    const [errorMsg, setErrorMsg] = useState(undefined)
    const navigate = useNavigate();
    const mySystem = useMySystem();
    const myTokenManager = useTokenManager();


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
        <div className="loginMain">
            
            <link href='https://fonts.googleapis.com/css?family=Open+Sans:400,300,300italic,400italic,600' 
            rel='stylesheet' type='text/css' />
            <link href="//netdna.bootstrapcdn.com/font-awesome/3.1.1/css/font-awesome.css" rel="stylesheet" />

            <div className="testbox">
                <img src={logoTest}/>
                <h1>Log in</h1>

                <form onSubmit={handleSubmit}>
                    <label id="icon" ><i className="icon-envelope "></i></label>
                    <input type="text"
                            placeholder="Mail"
                            value={mail}
                            name="email"
                            onChange={mailChange}/>
                    <label id="icon" ><i className="icon-shield"></i></label>
                    <input type="password"
                            id="floatingPassword"
                            placeholder="Password"
                            name="password"
                            value={password}
                            onChange={passwordChange}/>
                    <p>Not registered yet? <Link to="/register" style={{paddingLeft: 13, color: 'inherit',  backgroundColor: 'inherit'}}>Register here</Link></p>
                    <button className="submitButton" type="submit">Log in</button>

                    {errorMsg && <div className="alertWarning" role="alert">{errorMsg}</div>}
                </form> 
            </div>
        </div>
    )

}
    

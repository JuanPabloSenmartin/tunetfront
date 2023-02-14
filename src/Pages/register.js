import {React, useEffect} from "react";
import {useState} from "react";
import {useNavigate} from "react-router";
import '../Styles/register.css';
import {useMySystem} from "../mySystem";
import {FaEnvelope} from 'react-icons/fa'
import {FaKey} from 'react-icons/fa'
import {FaUserAlt} from 'react-icons/fa'
import InitialNavbar from "../Components/InitialNavbar";
import Background from "../Components/Background";


export const Register = () => {
    const [mail, setMail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [isArtist, setIsArtist] = useState('')
    const [errorMsg, setErrorMsg] = useState(undefined)
    const [uncompleteFormMsg, setUncompleteFormMsg] = useState(undefined)
    const navigate = useNavigate();
    const mySystem = useMySystem();


    const handleSubmit = async e => {
        e.preventDefault();
        registerUser({
            email: mail,
            username: username,
            password: password,
            isArtist: isArtist
        })
        
    }

    const resetForm = () => {
        setMail('')
        setUsername('')
        setPassword('')
        setIsArtist('')
    }

    const registerUser = (user) => {
        mySystem.register(
            user,
            () => {
                navigate("/login",{state:{fromRegister:true}})
            },
            () => {
                setErrorMsg('User already exists')
                resetForm();
            },
            () => {
                setUncompleteFormMsg("Complete all the parameters")
            }
        )
    }

    const usernameChange = (event) => {
        setUsername(event.target.value)
    }

    const passwordChange = (event) => {
        setPassword(event.target.value)
    }

    const mailChange = (event) => {
        setMail(event.target.value)
    }


    const isArtistChange = () => {
        setIsArtist('true')
    }
    const isntArtistChange = () => {
        setIsArtist('false')
    }

    return(
        <div style={Background()}>
            <InitialNavbar/>
            <div className="space"/>

            <div className="testbox-login">
                <h1 className="small-title">Sign Up</h1>

                <form onSubmit={handleSubmit} className="login-form">
                    
                    <hr />
                    
                    <div className="accounttype">
                        <input type="radio"
                         value="None"
                         id="radioOne" 
                         name="account"
                         onChange={isArtistChange}
                         />
                        <label htmlFor="radioOne" className="radio" >Artist/Band</label>
                        <input type="radio" 
                        value="None" 
                        id="radioTwo" 
                        name="account" 
                        onChange={isntArtistChange}
                        />
                        <label htmlFor="radioTwo" className="radio">Local</label>
                    </div>
                    
                    <hr />
                    <br/>
                    <label id="icon" htmlFor="name"><FaEnvelope/></label>
                    <input type="text"
                            className="input-login"
                            placeholder="Mail"
                            value={mail}
                            name="email"
                            onChange={mailChange}/>
                    <label id="icon" htmlFor="name"><FaUserAlt/></label>
                    <input type="text"
                            className="input-login"
                            placeholder="Username"
                            value={username}
                            name="username"
                            onChange={usernameChange}/>
                    <label id="icon" htmlFor="password"><FaKey/></label>
                    <input type="password"
                            className="input-password-login"
                            id="floatingPassword"
                            placeholder="Password"
                            name="password"
                            value={password}
                            onChange={passwordChange}/>
                    
                    <div className="bottom-register">
                        <button className="submitButton" type="submit">Sign Up</button>
                    </div>

                    {errorMsg && <div className="alertWarning" role="alert">{errorMsg}</div>}
                    {uncompleteFormMsg && <div className="alertWarning" role="alert">{uncompleteFormMsg}</div>}
                </form>
            </div>
        </div>
    )
}
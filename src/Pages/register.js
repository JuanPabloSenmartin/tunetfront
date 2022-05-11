import {React, useEffect} from "react";
import {useState} from "react";
import {useNavigate} from "react-router";
import '../Styles/register.css';
import {useMySystem} from "../mySystem";

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

    useEffect(() => {
        const color = "#8860D0";
        document.body.style.background = color;
      });

    const resetForm = () => {
        setMail('')
        setUsername('')
        setPassword('')
        setIsArtist('')
    }

    const registerUser = (user) => {
        mySystem.register(
            user,
            () => navigate("/login"),
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
        <div >
            <link href='https://fonts.googleapis.com/css?family=Open+Sans:400,300,300italic,400italic,600' 
            rel='stylesheet' type='text/css' />
            <link href="//netdna.bootstrapcdn.com/font-awesome/3.1.1/css/font-awesome.css" rel="stylesheet" />

            <div className="testbox">
                <h1>Register</h1>

                <form onSubmit={handleSubmit}>
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
                    <label id="icon" htmlFor="name"><i className="icon-envelope "></i></label>
                    <input type="text"
                            placeholder="Mail"
                            value={mail}
                            name="email"
                            onChange={mailChange}/>
                    <label id="icon" htmlFor="name"><i className="icon-user"></i></label>
                    <input type="text"
                            placeholder="Username"
                            value={username}
                            name="username"
                            onChange={usernameChange}/>
                    <label id="icon" htmlFor="password"><i className="icon-shield"></i></label>
                    <input type="password"
                            id="floatingPassword"
                            placeholder="Password"
                            name="password"
                            value={password}
                            onChange={passwordChange}/>
                    
                    <button className="submitButton" type="submit">Register</button>

                    {errorMsg && <div className="alertWarning" role="alert">{errorMsg}</div>}
                    {uncompleteFormMsg && <div className="alertWarning" role="alert">{uncompleteFormMsg}</div>}
                </form>
            </div>
        </div>
    )
}
import React, { useEffect, useState } from "react";
import '../Styles/chat.css'

import { useTokenManager } from "../tokenManager";
import {useMySystem} from "../mySystem";


export const Chat = () => {
    const auth = useTokenManager()
    const token = auth.getToken();
    const mySystem = useMySystem();

    const [email, setEmail] = useState('')
    const [user, setUser] = useState('')
    const [message, setMessage] = useState('')
    const [prevMessage, SetprevMessage] = useState('')
    
    useEffect(() => {
        mySystem.getMailfromToken(token, 
            (mail) => setEmail(mail),
            () => console.log("getMail error"))
    }, [])

    
    var webSocket = new WebSocket("ws://" + "localhost:4321" + "/chat");
    webSocket.onmessage = function (msg) { updateChat(msg); };
    webSocket.onclose = function () { alert("WebSocket connection closed") };

    function updateChat(msg) {       
        id("chat").insertAdjacentHTML("beforeend", htmlForMe(msg.data))
    }
    function insert(targetId, message) {
        id(targetId).insertAdjacentHTML("afterbegin", message);
    }
    
    //Helper function for selecting element by id
    function id(id) {
        return document.getElementById(id);
    }

    const getTime = () => {
        var currentDateTime = Date().toLocaleString();
        return currentDateTime.substring(16, 21);
    }
    const htmlForMe = (ms) => {
        return '<li class="me"><div class="entete"><h3>' + getTime() + '</h3></div><div class="message">' + ms + '</div></li>'
    }
    const htmlForHim = (ms) => {
        return '<li class="you"><div class="entete"><h3>' + getTime() + '</h3></div><div class="message">' + ms + '</div></li>'
    }

    

   
    //Send a message if it's not empty, then clear the input field
    const sendMessage = async e => {
        e.preventDefault();
        if (message !== "") {
            webSocket.send(message);
            SetprevMessage(message)
            setMessage('')
        }
    }


    const handleMessageChange = (e) => {
        setMessage(e.target.value)
    }

    // return(
    //     <div>
    //     {/* <input id="message" placeholder="Type your message" onChange={handleMessageChange} value={message}/>
    //     <button id="send" onClick={sendMessage}>Send</button> */}
        
    //     <head>
    //         <meta name="viewport" content="width=device-width, initial-scale=1"/>
    //         <title>WebsSockets</title>
    //         <link rel="stylesheet" href="style.css"/>
    //     </head>
    //     <body>
    //         <div id="chatControls">
    //             <input id="message" placeholder="Type your message" onChange={handleMessageChange} value={message}/>
    //             <button id="send" onClick={sendMessage}>Send</button>
    //         </div>
    //         <ul id="userlist">  </ul>
    //         <div id="chat"></div>
    //         {/* <script type="text/javascript" src="websocketDemo.js"></script> */}
    //     </body>
    
    //     </div>
    // )


    return (
        <div>
            <div id="container">
	            <aside>
		        <ul>
                    <li>
                        <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1940306/chat_avatar_01.jpg" alt=""/>
                        <div>
                            <h2>Prénom Nom</h2>
                            
                        </div>
                    </li>
                    <li>
                        <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1940306/chat_avatar_02.jpg" alt=""/>
                        <div>
                            <h2>Prénom Nom</h2>
                            
                        </div>
                    </li>
                    <li>
                        <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1940306/chat_avatar_03.jpg" alt=""/>
                        <div>
                            <h2>Prénom Nom</h2>
                            
                        </div>
                    </li>
                    
                    
                </ul>
            </aside>
	<main>
		<header >
			<h1>Vincent Porter</h1>
		</header>
		<ul id="chat">
			<li class="you">
				<div class="entete">
					<h3>10:12AM</h3>
				</div>
				<div class="triangle"></div>
				<div class="message">
                    Hola
				</div>
			</li>
			<li class="me">
				<div class="entete">
					<h3>10:12AM</h3>
				</div>
				<div class="message">
                    Como andas
				</div>
			</li>
			<li class="me">
				<div class="entete">
					<h3>10:12AM</h3>
				</div>
				<div class="message">
					OK
				</div>
			</li>
			<li class="you">
				<div class="entete">
					<h3>10:12AM</h3>
				</div>
				
				<div class="message">
                    asdla
				</div>
			</li>
			<li class="me">
				<div class="entete">
					<h3>10:12AM</h3>
				</div>
				
				<div class="message">
                    asas
				</div>
			</li>
			<li class="me">
				<div class="entete">
					<h3>10:12AM</h3>
				</div>
				
				<div class="message">
					OK
				</div>
			</li>
		</ul>
		<footer>
			<textarea placeholder="Type your message" onChange={handleMessageChange} value={message}></textarea>
			
			<button onClick={sendMessage}>Send</button>
		</footer>
	</main>
</div>
        </div>
    )
}
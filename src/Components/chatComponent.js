import React, { useEffect, useState } from "react";
import '../Styles/chat.css'
import {useMySystem} from "../mySystem";
import {FaTelegramPlane} from 'react-icons/fa'



export const ChatComponent = (props) => {
    const mySystem = useMySystem();

    
    const chatData = props.selectedUser;

    const [newMessages, setNewMessages] = useState([])
    const [prevMessages, setPrevMessages] = useState('')
    const [message, setMessage] = useState('')
    const [errorMsg, setErrorMsg] = useState(undefined)

    var webSocket = new WebSocket("ws://" + "localhost:4321" + "/chat");
    webSocket.onmessage = function (msg) { updateChat(msg.data); };
    // webSocket.onclose = function () { alert("WebSocket connection closed") };
    webSocket.onopen = function() {onConect(webSocket)};

    useEffect(() => {
        if(chatData.emailME){
            fetchMessages()
        }
        
    }, [])



    const fetchMessages = () => {
        mySystem.getMessagesInChat(chatData.emailME, chatData.emailHIM,
            (i) => {
                if(i != null && i != undefined){
                    setPrevMessages(i)
                }
            },
            () => setErrorMsg('ERROR'))
    }

    
    

    function onConect() {
        if(chatData.emailME){
            webSocket.send("#" + chatData.emailME)
        }
    }
    function updateChat(msg) {   
        setNewMessages([...newMessages, msg]) 
    }
    
    
    

    const getTime = () => {
        var currentDateTime = Date().toLocaleString();
        return currentDateTime.substring(16, 21);
    }
    

   
    //Send a message if it's not empty, then clear the input field
    const sendMessage = async e => {
        e.preventDefault();
        if (message !== "") {
            webSocket.send(fullMessage())
            setMessage('')
        }
    }

    const fullMessage = () => {
        return chatData.emailME + '~' + chatData.emailHIM + '~' + message;
    }

    const handleMessageChange = (e) => {
        setMessage(e.target.value)
    }

    return (
        <div className="chat-component">
		    <header className="chat-header">
                <div className="img-chat-header-div">
                    <img src={chatData.profPicHIM} className="img-chat-header"/>
                </div>
                <div className="chat-header-h1-div">
                    <h1 className="title-chat-header">{chatData.usernameHIM}</h1>
                </div>
		    </header>
		<ul id="chat" >
			{prevMessages == "" ? '' : 
            prevMessages.split('~').map((element, index) => {
                if(chatData.isArtistME == "true"){
                    
                    if(element.substring(0, 1) == 2){
                        return <li className="me"><div className="entete"></div><div className="message">{element.substring(1)}</div></li>
                    }
                    else {
                        return <li className="you"><div className="entete"></div><div className="message">{element.substring(1)}</div></li>
                    }
                }
                else{
                    if(element.substring(0, 1) == 1){
                        return <li className="me"><div className="entete"></div><div className="message">{element.substring(1)}</div></li>
                    }
                    else {
                        return <li className="you"><div className="entete"></div><div className="message">{element.substring(1)}</div></li>
                    } 
                }   
            })
            }
            
            {
                newMessages ? 
                newMessages.map((element) => {
                    if(element.substring(0, 1) == 1){
                        return <li className="me"><div className="entete"></div><div className="message">{element.substring(1)}</div></li>
                    }
                    else{
                        return <li className="you"><div className="entete"></div><div className="message">{element.substring(1)}</div></li>
                    }  
                })
                 : ''
            }

		</ul>
		<footer className="chat-footer">
			<textarea placeholder="Type your message" onChange={handleMessageChange} value={message}></textarea>
			<FaTelegramPlane className="send-icon-chat" onClick={sendMessage}/>
		</footer>
	
</div>
        
    )
}
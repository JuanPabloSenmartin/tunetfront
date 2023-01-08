import React, { useEffect, useState } from "react";
import '../Styles/chat.css'
import HomeNavbar from "../Components/HomeNavbar";
import { useTokenManager } from "../tokenManager";
import {useMySystem} from "../mySystem";
import { useLocation } from 'react-router-dom'
import { ChatComponent } from "../Components/chatComponent";
import {useNavigate} from "react-router";
import Background from "../Components/Background";


export const Chat = () => {
    const auth = useTokenManager();
    const token = auth.getToken();
    const mySystem = useMySystem();
    const navigate = useNavigate()

    const location = useLocation();
    const data = location.state;

    const [usersData, setUsersData] = useState([])
    
    const [selectedUserChat, setSelectedUserChat] = useState({id: "", emailME:"", emailHIM:"", profPicHIM:"",profPicME:"",usernameHIM:"",usernameME:"",isArtistME:""})
    const [errorMsg, setErrorMsg] = useState(undefined)

    
    const [dataOfSpecificHIM, setDataOfSpecificHIM] = useState({id: "", emailME:"", emailHIM:"", profPicHIM:"",profPicME:"",usernameHIM:"",usernameME:"",isArtistME:""})


    useEffect(() => {
        if(data.fromPost){
            fetchAchat()
        }
        fetchUsersInChat()  
    }, [])

    const fetchUsersInChat = () => {
        mySystem.getUsersInChat(token,
            (i) => {
                setUsersData(i)
                setFirstUserChat(i)
           },
             () => setErrorMsg('ERROR'));
    }

    const fetchAchat = () => {
        mySystem.getChatOfaMailHIM(data.emailME,
            data.emailHIM,
            (i) => {
                setDataOfSpecificHIM(i)
                setSelectedUserChat(i)
           },
             () => setErrorMsg('ERROR'));
    }
    const setFirstUserChat = (u) => {
        if(u.length == 0) {
            
        }
        else if(!data.fromPost){
            setSelectedUserChat(u[0])
        }
    }

    const handleClick = (i) => {
        setSelectedUserChat(i)
    }
    return (
        <div style={Background()}>
            <HomeNavbar isArtist= {data.isMEartist}/>
            <div className="space"/>

            <div className="chat-container">
	            <aside className="chat-aside">
		            <ul className="chat-ul">
                        {data.fromPost ? 
                            <li onClick={() => handleClick(dataOfSpecificHIM)} key={data.emailHIM} className="chat-li">
                                <img src={dataOfSpecificHIM.profPicHIM}/>
                                <h2>{dataOfSpecificHIM.usernameHIM}</h2>
                            </li> 
                        : ''}

                    
                        {usersData.map((info) => {
                            if(info.emailHIM == data.emailHIM){}
                            else{
                                return(
                                <li onClick={() => handleClick(info)} key={info.emailHIM} className="chat-li">
                                    <img src={info.profPicHIM} alt=""/>
                                        <h2>{info.usernameHIM}</h2>
                                </li>
                                )
                            }
                        })}                   
                    </ul>
                </aside>
            
                <main className="chat-main"> 
                    {(usersData.length != 0 || data.fromPost) ? <ChatComponent selectedUser={selectedUserChat} key={selectedUserChat.id}/> : 
                    "" 
                    }  
                </main>
	
            </div>
        </div>
    )
}
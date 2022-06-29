import React, { useEffect, useState } from "react";
import '../Styles/chat.css'

import { useTokenManager } from "../tokenManager";
import {useMySystem} from "../mySystem";
import { useLocation } from 'react-router-dom'
import { ChatComponent } from "../Components/chatComponent";
import {useNavigate} from "react-router";


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
    const handleBackClick = () => {
        if(data.isMEartist){
            navigate("/artistHome")
        }
        else{
            navigate("/localHome")
        }
    }

    const handleClick = (i) => {
        setSelectedUserChat(i)
    }
    return (
        <div>
            <div id="container">
	            <aside>
		        <ul>
                {data.fromPost ? 
                <li onClick={() => handleClick(dataOfSpecificHIM)} key={data.emailHIM}>
                    <img src={dataOfSpecificHIM.profPicHIM}/>
                    <div>
                    <h2>{dataOfSpecificHIM.usernameHIM}</h2>
                </div>
                </li> 
                : ''}

                    
                {usersData.map((info) => {
                    if(info.emailHIM == data.emailHIM){
                        
                    }
                    else{
                        return(
                            <li onClick={() => handleClick(info)} key={info.emailHIM}>
                            <img src={info.profPicHIM} alt=""/>
                            <div>
                                <h2>{info.usernameHIM}</h2>
                            </div>
                                
                        </li>
                        )
                    }
                })}                   
                </ul>
            </aside>
            
            <main> 
                <button onClick={handleBackClick}>Go back</button>
                {(usersData.length != 0 || data.fromPost) ? <ChatComponent selectedUser={selectedUserChat} key={selectedUserChat.id}/> : 
                <h1>No conversations yet!</h1> 
            }  
            </main>
	
</div>
        </div>
    )
}
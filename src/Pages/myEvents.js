import React, { useState, useEffect } from "react";
import {useMySystem} from "../mySystem";
import {useTokenManager} from "../tokenManager"
import HomeNavbar from "../Components/HomeNavbar";
import Background from "../Components/Background";
import { useLocation } from 'react-router-dom'
import { ArtistEvents } from "../Components/artistEvents";
import { LocalEvents } from "../Components/localEvents";

export const MyEvents = () => {
    const mySystem = useMySystem()
    const auth = useTokenManager()
    const token = auth.getToken()
    const location = useLocation()
    const data = location.state
    const [posts, setPosts] = useState([])
    const [selectedArtist, setSelectedArtist] = useState('postulated')
    const [selectedLocal, setSelectedLocal] = useState('accepted')
    const [change, setChange] = useState(false)
    

    const [errorMsg, setErrorMsg] = useState(undefined)

    useEffect(() => {
        fetchData()
    }, [selectedArtist, selectedLocal, change])

    const fetchData = () => {
        if(data.isArtist){
            mySystem.getPostsInfo({
                token: token,
                type: selectedArtist
            },
                (p) => {
                    setPosts(p)
               },
                 () => setErrorMsg('ERROR'));
        }
        else{
            mySystem.getLocalPostsInfo({
                token: token,
                type: selectedLocal
            },
                (p) => {
                    setPosts(p)
               },
                 () => setErrorMsg('ERROR'));
        }
    }
    const refresh = () => {
        setChange(!change);
    }
    

    return(
        <div style={Background()}>
            <HomeNavbar isArtist={data.isArtist}/>
            <div className="space"/>

            <h1 className="current-posts-title">{data.isArtist ? "Events" : "Events"}</h1>

            {data.isArtist ? <ArtistEvents posts={posts} selected={selectedArtist} refresh={refresh} setSelected={setSelectedArtist} /> : <LocalEvents posts={posts} selected={selectedLocal} setSelected={setSelectedLocal}/>}

        </div>
    )
}
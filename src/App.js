import React, { useEffect } from "react"
// import './Styles/app.css'
import { BrowserRouter as Router, Route, Routes} from "react-router-dom"
import {Login} from './Pages/login'
import {Register} from './Pages/register'
import {NotFound} from "./Pages/notFound"
import {LocalHome} from "./Pages/localHome"
import {ArtistHome} from "./Pages/artistHome"
import { Discover } from "./Pages/discover"
import {ViewArtistProfile} from './Pages/viewArtistProfile'
import {EditArtistProfile} from './Pages/editArtistProfile'
import {ViewLocalProfile} from './Pages/viewLocalProfile'
import {EditLocalProfile} from './Pages/editLocalProfile'
import {Chat} from './Pages/chat'
import { CreatePost } from "./Pages/createPost"
import { RequireAuth } from "./Components/RequireAuth"
import { AboutUs } from "./Pages/aboutUs"
import { MyEvents } from "./Pages/myEvents"



export default function App () {
    useEffect(()=> {
        document.body.style.background = 'rgb(2,0,0)';
        document.body.style.background = 'linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(22,246,255,1) 0%, rgba(154,0,255,1) 100%)';
        document.body.style.minWidth = '100vw';
        document.body.style.minHeight = '100vh';
    }, []);
        
    return(
        <Routes >
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="*" element={<NotFound />} />
            <Route path="discover" element={<Discover/>}/>
            <Route path="aboutUs" element={<AboutUs/>}/>
            <Route path="localHome" element={
                <RequireAuth>
                    <LocalHome />
                </RequireAuth>
            } />
            <Route path="artistHome" element={
                <RequireAuth>
                    <ArtistHome />
                </RequireAuth>
            } />

            <Route path="viewArtistProfile/:userMail" element={
                <ViewArtistProfile/>
            } />
            <Route path="editArtistProfile" element={
                <RequireAuth>
                    <EditArtistProfile/>
                </RequireAuth>
            } />
            <Route path="viewLocalProfile/:userMail" element={
                <ViewLocalProfile/>
            } />
            <Route path="editLocalProfile" element={
                <RequireAuth>
                    <EditLocalProfile/>
                </RequireAuth>
            } />
            <Route path="chat" element={
                <RequireAuth>
                    <Chat/>
                </RequireAuth>
            } />
            <Route path="createPost" element={
                <RequireAuth>
                    <CreatePost/>
                </RequireAuth>
            } />
            <Route path="myEvents" element={
                <RequireAuth>
                    <MyEvents />
                </RequireAuth>
            } />
        </Routes>
    )
       
        
    
// );
        }

// export default App
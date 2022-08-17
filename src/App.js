import React from "react"
import { BrowserRouter as Router, Route, Routes} from "react-router-dom"
import {Login} from './Pages/login'
import {Register} from './Pages/register'
import {NotFound} from "./Pages/notFound"
import {LocalHome} from "./Pages/localHome"
import {ArtistHome} from "./Pages/artistHome"
import { MainPage } from "./Pages/mainPage"
import {ViewArtistProfile} from './Pages/viewArtistProfile'
import {EditArtistProfile} from './Pages/editArtistProfile'
import {ViewLocalProfile} from './Pages/viewLocalProfile'
import {EditLocalProfile} from './Pages/editLocalProfile'
import {Chat} from './Pages/chat'
import { CreatePost } from "./Pages/createPost"
import { RequireAuth } from "./Components/RequireAuth"

const App = () => (
    
        <Routes>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="*" element={<NotFound />} />
            <Route path="homePage" element={<MainPage/>}/>
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

            <Route path="viewArtistProfile" element={
                <RequireAuth>
                    <ViewArtistProfile/>
                </RequireAuth>
            } />
            <Route path="editArtistProfile" element={
                <RequireAuth>
                    <EditArtistProfile/>
                </RequireAuth>
            } />
            <Route path="viewLocalProfile" element={
                <RequireAuth>
                    <ViewLocalProfile/>
                </RequireAuth>
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
        </Routes>
    
)

export default App
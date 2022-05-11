import React from "react"
import { BrowserRouter as Router, Route, Routes} from "react-router-dom"
import {Login} from './Pages/login'
import {Register} from './Pages/register'
import {NotFound} from "./Pages/notFound"
import {LocalHome} from "./Pages/localHome"
import {ArtistHome} from "./Pages/artistHome"
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
            {
                /*
                <Route 
                path="localHome" 
                element={
                    <RequireAuth>
                        <LocalHome />
                    </RequireAuth>
                } 
            />
            <Route 
                path="artistHome" 
                element={
                    <RequireAuth>
                        <ArtistHome />
                    </RequireAuth>
                } 
            />
                */
            }
            <Route path="localHome" element={<LocalHome />}/>
            <Route path="artistHome" element={<ArtistHome />}/>
            <Route path="viewArtistProfile" element={<ViewArtistProfile/>} />
            <Route path="editArtistProfile" element={<EditArtistProfile/>} />
            <Route path="viewLocalProfile" element={<ViewLocalProfile/>} />
            <Route path="editLocalProfile" element={<EditLocalProfile/>} />
            <Route path="chat" element={<Chat/>} />
            <Route path="createPost" element={<CreatePost/>} />
        </Routes>
    
)

export default App
import React from "react"
import { BrowserRouter as Router, Route, Routes} from "react-router-dom"
import Login from './Pages/login'
import Register from './Pages/register'
import NotFound from "./Pages/notFound"
import LocalHome from "./Pages/localHome"
import ArtistHome from "./Pages/artistHome"
import ViewArtistProfile from './Pages/viewArtistProfile'
import EditArtistProfile from './Pages/editArtistProfile'
import ViewLocalProfile from './Pages/viewLocalProfile'
import EditLocalProfile from './Pages/editLocalProfile'
import Chat from './Pages/chat'

const App = () => (
    <Router>
        <Routes>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="*" element={<NotFound />} />
            <Route path="localHome" element={<LocalHome />} />
            <Route path="artistHome" element={<ArtistHome />} />
            <Route path="viewArtistProfile" element={<ViewArtistProfile/>} />
            <Route path="editArtistProfile" element={<EditArtistProfile/>} />
            <Route path="viewLocalProfile" element={<ViewLocalProfile/>} />
            <Route path="editLocalProfile" element={<EditLocalProfile/>} />
            <Route path="chat" element={<Chat/>} />
        </Routes>
    </Router>
)

export default App
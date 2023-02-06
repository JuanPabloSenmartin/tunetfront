import { Component } from "react";
import '../Styles/NavbarStyles.css'
import {FaInfo} from 'react-icons/fa'
import {FaRocketchat} from 'react-icons/fa'
import {FaBars} from 'react-icons/fa'
import {FaTimes} from 'react-icons/fa'
import {FaHome} from 'react-icons/fa'
import {FaCog} from 'react-icons/fa'
import {FaHistory} from 'react-icons/fa'
import { Link } from "react-router-dom";
import {Dropdown} from "./dropdown";



class HomeNavbar extends Component{
    state = {clicked: false, dropdown: false}

    handleBarClick = () => {
        this.setState({clicked: !this.state.clicked})
    }
    handleDropdownClick = () => {
        this.setState({dropdown: !this.state.dropdown})
    }

    render(){
        return(
            <nav className="NavbarItems">
                <h1 className="navLogo">TUNET</h1>
                <div className="menu-icon" onClick={this.handleBarClick}>
                    
                    {this.state.clicked ? 
                    <FaTimes className="bars"/>
                    
                    :
                    <FaBars className="bars"/>    
                    }
                </div>
                <ul className={this.state.clicked ? "nav-menu active" : "nav-menu"}>
                    <li>
                        <a href={this.props.isArtist ? "artistHome" : "localHome"} className="nav-links">
                            <FaHome className="navLinkIcons"/>Home
                        </a>
                    </li>
                    <li>
                        <Link to="/myEvents" className="nav-links" state={{isArtist:this.props.isArtist}}>
                            <FaHistory className="navLinkIcons"/>{this.props.isArtist ? "Events" : "Events"}
                        </Link>
                    </li>
                    <li>
                        <Link to="/aboutUs" className="nav-links" state={{isSignedIn:true, isArtist:this.props.isArtist}}>
                            <FaInfo className="navLinkIcons"/>About us
                        </Link>
                    </li>
                    <li>
                        <Link to="/chat" className="nav-links" state={{
                            emailHIM: '', 
                            emailME: '', 
                            isMEartist: this.props.isArtist,
                            fromPost: false           
                            }}><FaRocketchat className="navLinkIcons"/>My chats
                        </Link>
                    </li>
                    <li onClick={this.handleDropdownClick} className="dropdown-logo"> 
                        <FaCog className="prof-pic-dropdown"></FaCog>
                        {this.state.dropdown && <Dropdown isArtist={this.props.isArtist}/>}
                    </li>
                </ul>
            </nav>
        )
    }
}
export default HomeNavbar;
import { Component } from "react";
import '../Styles/NavbarStyles.css'
import {FaInfo} from 'react-icons/fa'
import {FaCompass} from 'react-icons/fa'
import {FaBars} from 'react-icons/fa'
import {FaTimes} from 'react-icons/fa'
import { Link } from "react-router-dom";


class InitialNavbar extends Component{
    state = {clicked: false}

    handleBarClick = () => {
        this.setState({clicked: !this.state.clicked})
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
                        <Link to="/discover" className="nav-links">
                            <FaCompass className="navLinkIcons"/>Discover
                        </Link>
                    </li>
                    <li>
                        <Link to="/aboutUs" className="nav-links" state={{isSignedIn:false}}>
                            <FaInfo className="navLinkIcons"/>About us
                        </Link>
                    </li>
                    <li>
                        <Link to="/login" className="nav-links-signin-btn">
                            Sign in
                        </Link>
                    </li>
                </ul>
            </nav>
        )
    }
}
export default InitialNavbar;
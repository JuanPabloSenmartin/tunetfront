import { Component } from "react";
import '../Styles/NavbarStyles.css'
import {FaInfo} from 'react-icons/fa'
import {FaRocketchat} from 'react-icons/fa'
import {FaBars} from 'react-icons/fa'
import {FaTimes} from 'react-icons/fa'
import {FaHome} from 'react-icons/fa'
import {FaCog} from 'react-icons/fa'
import {FaHistory} from 'react-icons/fa'
import {FaBell} from 'react-icons/fa'
import { Link } from "react-router-dom";
import {Dropdown} from "./dropdown";
import {useMySystem} from "../mySystem";
import {useTokenManager} from "../tokenManager"



class HomeNavbar extends Component{
    state = {clicked: false, dropdown: false,notif:false, notifications:[], deletedNotifications:[], seen:false}

    mySystem = useMySystem()
    auth = useTokenManager()
    token = this.auth.getToken()

    componentDidMount() {
        this.mySystem.getNotifications(this.token, 
            (a)=>{
                this.setState({notifications: a});
            },
            ()=>{})
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevState.deletedNotifications !== this.state.deletedNotifications || prevState.notif !== this.state.notif) {
            this.forceUpdate()
        }
      }

    handleBarClick = () => {
        this.setState({clicked: !this.state.clicked})
    }
    handleDropdownClick = () => {
        this.setState({dropdown: !this.state.dropdown, notif:false})
    }
    handleNotificationClick = () => {
        this.setState({notif: !this.state.notif, dropdown:false})
        if(!this.state.notif == true && this.amountOfUnseenNotifications() != 0){
            this.mySystem.seeNotifications(this.token,
                () => {
                    this.setState({seen: true})
                },
                () =>{})
        }
    }
    handleDeleteNotification = (notification) => {
        this.setState({deletedNotifications: this.state.deletedNotifications.concat(notification.id)})
        this.mySystem.deleteNotification(notification.id,
            ()=> {},
            ()=>{})
    }
    isValid = (id) => {
        for (let index = 0; index < this.state.deletedNotifications.length; index++) {
            const id2 = this.state.deletedNotifications[index];
            if(id == id2) return false;
        }
        return true;
    }

    amountOfUnseenNotifications = () => {
        var counter = 0;
        this.state.notifications.map(notif => {
            if(notif.seen == "FALSE") counter += 1;
        })
        return counter;
    }

    render(){
        return(
            <nav className="NavbarItems">
                <h1 className="navLogo">TUNET</h1>
                <div className="menu-icon" onClick={this.handleBarClick}>
                    
                    {this.state.clicked ? 
                    <FaTimes className="bars-icon-narvbar"/>
                    :
                    <FaBars className="bars-icon-narvbar"/>    
                    }
                </div>
                <ul className={this.state.clicked ? "nav-menu active" : "nav-menu"}>
                    <li>
                        <Link to={this.props.isArtist ? "/artistHome" : "/localHome"} className="nav-links">
                            <FaHome className="navLinkIcons"/>Home
                        </Link>
                    </li>
                    <li>
                        <Link to="/myEvents" className="nav-links" state={{isArtist:this.props.isArtist}}>
                            <FaHistory className="navLinkIcons"/>Events
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
                    <li >
                        <FaBell className="navLinkIcons" onClick={this.handleNotificationClick}/>
                        {this.amountOfUnseenNotifications() > 0 && !this.state.seen && <div className="notification-counter">{this.amountOfUnseenNotifications()}</div>}
                        {this.state.notif && 
                        <ul className="notification-dropdown-menu">
                            {this.state.notifications.map((notification, index) => {
                                if(this.isValid(notification.id)) {
                                    return(
                                        <li key={index}>
                                            <div className="notification-dropdown-link">
                                                {notification.notification} 
                                                <Link to={notification.profileLink} className="prof-link-notif" state={{isSignedIn: true}}>
                                                    view profile
                                                </Link>
                                                <FaTimes className="img-closed-Icon-notif" onClick={() => this.handleDeleteNotification(notification)}/>
                                            </div>
                                            
                                        </li>
                                    )
                                }
                            })}
                        </ul>
                        }    
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
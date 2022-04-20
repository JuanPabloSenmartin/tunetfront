import React from "react";
import './Styles/localHome.css'
import ConfigurationIcon from '../Images/configurationIcon.png'
import NewPostIcon from '../Images/newPostIcon.png'
import {Link} from 'react-router-dom'


class LocalHomeComponent extends React.Component{
    render(){
        return (
            <div >
                <div className="div1">
                    <Link to="/home/local/createPost"><img src={NewPostIcon} className="post"/> </Link>
                    
                    <img src={ConfigurationIcon} className="config" />
                </div>
                
                <div className="div2">
                    <h2>My posts</h2>
                </div>
                <div className="div3">

                    <h1>ACA ESTAN LOS POSTS</h1>
                </div>
            </div>
        )
    }
}

export default LocalHomeComponent
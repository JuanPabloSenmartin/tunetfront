import React from "react";
import './Styles/login.css'
import logoTest from '../Images/logoTest1.png'
import RegisterLink from "./registerLink";
import { useNavigate, Link} from "react-router-dom";
import ArtistHome from "../Pages/artistHome";
import LocalHome from "../Pages/localHome";


class LoginComponent extends React.Component{
    state = {
        data : {}
    }

    async componentDidMount(){
        await this.fetchResponse()
    }
    fetchResponse = async () => {
        fetch('http://localhost:4321/users')
            .then(response => response.json())
            .then(response => {
                this.setState({data: response})
            });
        
        
    }
    
    handleChange = e => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    
    handleClick = () => {
        let navigate = useNavigate();
        if(this.state.data.log){
            if(this.state.data.isArtist){
                console.log("hola")
                navigate('artistHome')
            }
            else {
                return ''
            }
        }
        else{
            return ''
        }
    }

    

    render(){
        this.fetchResponse()
        return(
            <div className="main">
        <link href='https://fonts.googleapis.com/css?family=Open+Sans:400,300,300italic,400italic,600' 
        rel='stylesheet' type='text/css' />
        <link href="//netdna.bootstrapcdn.com/font-awesome/3.1.1/css/font-awesome.css" rel="stylesheet" />

        <div className="testbox">
            <img src={logoTest}/>
            <h1>Log in</h1>

            <form action="/">
                <label id="icon" ><i className="icon-envelope "></i></label>
                <input type="text" name="mail" id="mail" placeholder="Email" required onChange={this.handleChange}  value={this.state.mail}/>
                <label id="icon" ><i className="icon-shield"></i></label>
                <input type="password" name="password" id="password" placeholder="Password" required onChange={this.handleChange} value={this.state.password}/>
                <p>Not registered yet? <RegisterLink></RegisterLink></p>
                <Link to={this.state.data.isArtist ? '/artistHome' : '/localHome'}><button type="button"  className="button">Login</button></Link>
                
            </form>
        </div>
    </div>
        )
    }
}

export default LoginComponent
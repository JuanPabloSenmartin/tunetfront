import React from "react";
import { Link } from "react-router-dom";


function RegisterLink(){
    return(
        <Link to="/register" style={{paddingLeft: 13, color: 'inherit',  backgroundColor: 'inherit'}}>Register here</Link>
            
    )
}

export default RegisterLink
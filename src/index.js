import React from 'react';
import App from './app'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router} from "react-router-dom"

ReactDOM.render(
<React.StrictMode>
    <Router>
        <App/>
    </Router>
</React.StrictMode>
, document.getElementById('root'));

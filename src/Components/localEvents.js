import React, { useState }from "react";
import '../Styles/localEvents.css'
import {FaSortDown} from 'react-icons/fa'
import {FaSortUp} from 'react-icons/fa'
import {useMySystem} from "../mySystem";
import {useTokenManager} from "../tokenManager"

export const LocalEvents = (props) => {
    const [selectedPost, setSelectedPost] = useState(undefined)
    const mySystem = useMySystem()
    const auth = useTokenManager()
    const token = auth.getToken();

    return(
        <div className="artistEvents-main-div">
            <div className="artistEvents-header">
                <div className={props.selected == "accepted" ? "localEvents-header-inside-selected" : "localEvents-header-inside"} onClick={() => props.setSelected("accepted")}>
                    Accepted
                    {props.selected == "accepted" && <div className="underline-event"></div>}
                </div>
                <div className={props.selected == "previous" ? "localEvents-header-inside-selected" : "localEvents-header-inside"} onClick={() => props.setSelected("previous")}>
                    Previous
                    {props.selected == "previous" && <div className="underline-event"></div>}
                </div>
            </div>  
        </div>
    )
}
import React, { useState }from "react";
import '../Styles/artistEvents.css'
import {FaSortDown} from 'react-icons/fa'
import {FaSortUp} from 'react-icons/fa'
import {useMySystem} from "../mySystem";
import {useTokenManager} from "../tokenManager"
import { GenericPost } from "./postTypes/genericPost";
import { MyDateRangePicker } from "./filter/dateRangePicker";
import {FaChevronCircleRight} from 'react-icons/fa'
import {FaFilter} from 'react-icons/fa'

export const ArtistEvents = (props) => {

    const [selectedPost, setSelectedPost] = useState(undefined)
    const [filterOpen, setFilteredOpen] = useState(false)
    const mySystem = useMySystem()
    const auth = useTokenManager()
    const token = auth.getToken();

    const cancelPostulation = (postId) => {
        mySystem.deleteArtistFromPostList({
            token: token,
            postID: postId
        },
        () => {
            props.refresh();
        },
        )
    }

    const rateLocal = (localEmail, value) => {
        mySystem.addRating(localEmail, value, 
            () => {},
            () => {})
    }

    return(
        <div className="artistEvents-main-div">
            <div className="artistEvents-header">
                <div className={props.selected == "postulated" ? "artistEvents-header-inside-selected" : "artistEvents-header-inside"} onClick={() => props.setSelected("postulated")}>
                    Postulated
                    {props.selected == "postulated" && <div className="underline-event"></div>}
                </div>
                <div className={props.selected == "accepted" ? "artistEvents-header-inside-selected" : "artistEvents-header-inside"} onClick={() => props.setSelected("accepted")}>
                    Accepted
                    {props.selected == "accepted" && <div className="underline-event"></div>}
                </div>
                <div className={props.selected == "previous" ? "artistEvents-header-inside-selected" : "artistEvents-header-inside"} onClick={() => props.setSelected("previous")}>
                    Previous
                    {props.selected == "previous" && <div className="underline-event"></div>}
                </div>
            </div>

            <div className="artistEvents-body">
                <button className="filter-by-date-button" onClick={() => setFilteredOpen(!filterOpen)}><FaFilter/>Filter by date</button>
                {filterOpen && 
                <div>
                    <MyDateRangePicker 
                    selectedDate={props.date}
                    changeDate={props.setDate}
                    />
                    <FaChevronCircleRight className="max-distance-enter-icon" onClick={() => props.refresh()}/>
                </div> 
                }
                {props.posts.map((post, index)=> {
                    return(
                        <div key={index}>
                            <div className="artistEvents-post-title-div">
                                <div className="artistEvents-post-title-text">{post.title}</div>
                                {selectedPost == post ? <FaSortDown className="artistEvents-post-title-icon-down" onClick={()=> setSelectedPost(undefined)}/> : <FaSortUp className="artistEvents-post-title-icon-up" onClick={()=> setSelectedPost(post)}/>}
                            </div>
                            {selectedPost == post && 
                            <GenericPost post={post} cancelPostulation={cancelPostulation} type={props.selected} rateLocal={rateLocal}/>
                        }
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
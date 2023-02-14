
import React, {useState} from "react";
import Rating from '@mui/material/Rating';
import { Link } from "react-router-dom";



export const GenericLocalPost = (props) => {
    const post = props.post;
    const [newRating, setNewRating] = useState(0);
    const artistList = post.artistList[0]

    return(
        <div className="local-post-inside-div">
            <p className="localPost-p">Date:  {post.date}</p>
            <p className="localPost-p">Description:    {post.description}</p>
            <div className="localPost-artistPart">
                <div className="localpost-artistPart-left">
                Accepted artist:
                </div> 
                <div className="localpost-artistPart-middle">
                    <div className="localpost-profPic-div">
                        <img src={artistList.artistProfPic} className="localpost-profPic"/>
                    </div>
                    {artistList.artistEmail}
                    <Link to={"/viewArtistProfile/" + artistList.artistEmail} state={{ isSignedIn: true} } >
                        <button className="local-post-artistList-ul-button">
                            View Profile
                        </button>
                    </Link> 

                    <Link to="/chat" state={{emailHIM: artistList.artistEmail, emailME: post.localEmail, isMEartist: false, fromPost: true}} >
                        <button className="local-post-artistList-ul-button">
                            Chat
                        </button>
                    </Link>
                </div>
                <div className="localpost-artistPart-right">
                    {props.type == "accepted" && <button className="local-post-reject-button" onClick={()=> props.rejectArtist(artistList.id)}>Reject artist</button>}
                    {props.type == "previous" && 
                    <div>
                        Rate artist: 
                        {newRating == 0 && <Rating name="simple-controlled" value={newRating} onChange={(event, newValue) => {
                                            setNewRating(newValue);
                                            props.rateArtist(artistList.artistEmail, newValue);
                        }} />}
                        {newRating != 0 && <Rating name="read-only" value={newRating} readOnly /> }
                        {newRating != 0 && "thanks for feedback" }

                    </div>
                    }
                </div>
                
            </div>
            
        </div>
    )
}
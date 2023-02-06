import React, {useEffect} from "react";
import { PostInArtistFeed } from "./postInArtistFeed";



export const PostFeed = (props) => {
    
    return(
            <div className="postsFeed">
                {props.posts.map((info, index) => {
                    return(
                        <div>
                            <PostInArtistFeed post={info} isSignedIn={props.isSignedIn}  />
                            <br/>
                            <br/>    
                        </div>
                    )
                })}
            </div>
        )
    }
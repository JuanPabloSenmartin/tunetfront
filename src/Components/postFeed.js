import React, {useEffect} from "react";
import { PostInArtistFeed } from "./postInArtistFeed";



export const PostFeed = (props) => {
    const posts = props.posts
    return(
            <div className="postsFeed">
                {posts.map((info) => {
                    return(
                        <div>
                            <PostInArtistFeed post={info} key={info.title}  />
                            <br/>
                            <br/>    
                        </div>
                    )
                })}
            </div>
        )
    }
import React, { useEffect , useState} from "react";
import '../Styles/artistHome.css'
import {useNavigate} from "react-router";
import {useMySystem} from "../mySystem";
import { PostFeed } from "../Components/postFeed";
import {useTokenManager} from "../tokenManager"
import HomeNavbar from "../Components/HomeNavbar";
import Background from "../Components/Background";
import FilterPanel from "../Components/filter/filterPanel";
    



export const ArtistHome = () => {
    const auth = useTokenManager()
    const token = auth.getToken()
    const navigate = useNavigate()
    const mySystem = useMySystem()
    const [posts, setPosts] = useState([])
    const [errorMsg, setErrorMsg] = useState(undefined)
    const [selectedRating, setSelectedRating] = useState(null);
    const [selectedRange, setSelectedRange] = useState([1, 500]);
    const [genre, setGenre] = useState([
    { id: 1, checked: true, label: 'Any' },    
    { id: 2, checked: false, label: 'Rock' },
    { id: 3, checked: false, label: 'Pop' },
    { id: 4, checked: false, label: 'Jazz' },
    ]);

    useEffect(() => {
        fetchPostsInFeed()
    }, [selectedRating, genre, selectedRange])


    const handleSelectRating = (event, value) =>
    !value ? null : setSelectedRating(value);

    const handleChangeChecked = (id) => {
        const genreStateList = genre;
        const changeCheckedGenre = genreStateList.map((item) =>
          item.id === id ? { ...item, checked: !item.checked } : item
        );
        setGenre(changeCheckedGenre);
      };

    const handleChangeRange = (event, value) => {
        setSelectedRange(value);
    };

    // const fetchPostsInFeed = () => {
    //     mySystem.getAllPosts(token, 
    //         (i) => {
    //             setPosts(i)
    //         },
    //         () => setErrorMsg('ERROR'));
    // }
    const fetchPostsInFeed = () => {
        mySystem.getAllPosts(
            (i) => {
                setPosts(i)
            },
            () => setErrorMsg('ERROR'));
    }  
    
    return (
        <div style={Background()} className="homeFilter">
            <HomeNavbar isArtist= {true}/>
            <div className="space"/>
            
            <h1 className="posts-title">POSTS</h1>
            
            <div className='homeFilter_panelList-wrap'>
                <div className='homeFilter_panel-wrap'>
                    <FilterPanel
                        selectedRating={selectedRating}
                        selectedRange={selectedRange}
                        selectRating={handleSelectRating}
                        genre={genre}
                        changeChecked={handleChangeChecked}
                        changeRange={handleChangeRange}
                    />
                </div>
                <div className='posts-wrap'>
                    <PostFeed posts={posts}/>
                </div>
            </div>
            
            {errorMsg && <div className="alertWarning" role="alert">{errorMsg}</div>}
        </div>
    )
}
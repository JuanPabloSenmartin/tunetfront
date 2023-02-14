import React, { useEffect , useState} from "react";
import '../Styles/artistHome.css'
import {useMySystem} from "../mySystem";
import { PostFeed } from "../Components/postFeed";
import {useTokenManager} from "../tokenManager"
import HomeNavbar from "../Components/HomeNavbar";
import Background from "../Components/Background";
import FilterPanel from "../Components/filter/filterPanel";

export const ArtistHome = () => {
    const auth = useTokenManager()
    const token = auth.getToken()
    const mySystem = useMySystem()
    const [posts, setPosts] = useState([])
    const [errorMsg, setErrorMsg] = useState(undefined)
    const [selectedRating, setSelectedRating] = useState(null);
    const [selectedRange, setSelectedRange] = useState(null);
    const [x, setX] = useState(false)
    const [genre, setGenre] = useState([
    { id: 1, checked: true, label: 'Any' },    
    { id: 2, checked: false, label: 'Rock' },
    { id: 3, checked: false, label: 'Pop' },
    { id: 4, checked: false, label: 'Jazz' },
    { id: 5, checked: false, label: 'Blues' },
    { id: 6, checked: false, label: 'Classical' }
    ]);
    const [date, setDate] = useState([
        {
          startDate: null,
          endDate: null,
          key: 'selection'
        }
    ]);

    useEffect(() => {
        fetchPostsInFeed({
            token: token,
            rating: selectedRating,
            maxDistance: selectedRange,
            genres: getCheckedGenres(),
            dateRange: getDates()
        })
    }, [selectedRating, genre, x, date])


    const handleSelectRating = (event, value) => {
        if(event.target.value == selectedRating) setSelectedRating(null)
        else setSelectedRating(event.target.value)
    }

    const handleChangeChecked = (id) => {
        const genreStateList = genre;
        const changeCheckedGenre = genreStateList.map((item) =>
          item.id === id ? { ...item, checked: !item.checked } : item
        );
        setGenre(changeCheckedGenre);
      };

    const handleChangeRange = (event) => {
        setSelectedRange(event.target.value);
    };
    const handleChangeDate = (value) => {
        setDate(value);
    };
    
    const getDates = () => {
        return [date[0].startDate, date[0].endDate];
    }
    const getCheckedGenres = () => {
        const arr = [];
        genre.map((item) => {
            if(item.checked){
                arr.push(item.label);
            }
        })
        return arr;
    }
    const refresh = () => {
        setX(!x)
    }
   
    const fetchPostsInFeed = (data) => {
        mySystem.getPostFeed(
            data,
            (i) => {
                setPosts(i)
            },
            () => setErrorMsg('ERROR'));
    }  
    
    return (
        <div 
        style={Background()}
         className="homeFilter">
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
                        selectedDate={date}
                        changeDate={handleChangeDate}
                        refresh={refresh}
                    />
                </div>
                <div className='posts-wrap'>
                    <PostFeed posts={posts} isSignedIn={true} key="id1"/>
                </div>
            </div>
            
            {errorMsg && <div className="alertWarning" role="alert">{errorMsg}</div>}
        </div>
    )
}
import React, { useEffect , useState} from "react";
import {useMySystem} from "../mySystem";
import { PostFeed } from "../Components/postFeed";
import InitialNavbar from "../Components/InitialNavbar";
import '../Styles/discover.css'
import Background from "../Components/Background";
import FilterPanel from "../Components/filter/filterPanel";




export const Discover = () => {
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
    { id: 6, checked: false, label: 'Classical' },
    ]);
    const [date, setDate] = useState([
        {
          startDate: null,
          endDate: null,
          key: 'selection'
        }
    ]);
    

    useEffect(() => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(function(position) {
                fetchPostsInFeed({
                    location: [position.coords.latitude, position.coords.longitude],
                    rating: selectedRating,
                    maxDistance: selectedRange,
                    genres: getCheckedGenres(),
                    dateRange: getDates()
                })
            });
        }
        else{
            fetchPostsInFeed({
                rating: selectedRating,
                maxDistance: selectedRange,
                genres: getCheckedGenres(),
                dateRange: getDates()
            })
        }
        
    }, [selectedRating, genre, x, date])

    const fetchPostsInFeed = (data) => {
        mySystem.getAllPosts(data,
            (i) => {
                setPosts(i)
            },
            () => {});
    }
    const getDates = () => {
        return [date[0].startDate, date[0].endDate];
    }
    const refresh = () => {
        setX(!x)
    }
    const handleSelectRating = (event) =>{
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

    const getCheckedGenres = () => {
        const arr = [];
        genre.map((item) => {
            if(item.checked){
                arr.push(item.label);
            }
        })
        return arr;
    }

    
    return (
        <div 
        className="homeFilter">
            <InitialNavbar/>
            <div className="space"/>


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
                    <PostFeed posts={posts} isSignedIn={false} key="id2"/>
                </div>
            </div>
            
        </div>
    )
}
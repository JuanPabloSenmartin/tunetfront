import React, { useState, useEffect } from "react";
import {useMySystem} from "../mySystem";
import {useNavigate} from "react-router";
import { useTokenManager } from "../tokenManager";
import HomeNavbar from "../Components/HomeNavbar";
import Background from "../Components/Background";
import '../Styles/createPost.css'
import Select from 'react-select';
import makeAnimated from 'react-select/animated';


export const CreatePost = (props) => {
    const auth = useTokenManager()
    const token = auth.getToken();
    const [mail, setMail] = useState('')
    const [title, setTitle] = useState('')
    const [date, setDate] = useState('')
    const [description, setDescription] = useState('')
    const [genres, setGendres] = useState([{ value: 'any', label: 'Any' }])
    const genreOptions = [
        { value: 'any', label: 'Any' },
        { value: 'rock', label: 'Rock' },
        { value: 'pop', label: 'Pop' },
        { value: 'jazz', label: 'Jazz' },
        { value: 'blues', label: 'Blues' },
        { value: 'classical', label: 'Classical' }
    ]
    const animatedComponents = makeAnimated();
    const [errorMsg, setErrorMsg] = useState(undefined)
    const [uncompleteFormMsg, setUncompleteFormMsg] = useState(undefined)
    const navigate = useNavigate();
    const mySystem = useMySystem();

    useEffect(() => {
        fetchMail();
    }, [])

    
    const fetchMail = () => {
        mySystem.getMailfromToken(token, 
            (m) => {
                setMail(m)
            },
            () => {
                setErrorMsg('Unable to fetch mail')
            })
    }


    const handleSubmit = async e => {
        e.preventDefault();
        submitPost({
            localEmail: mail,
            title: title,
            date: date,
            description: description,
            genres: getGenreValues()
        })
        
    }
    const getGenreValues = () => {
        const arr = [];
        genres.map((item)=> {
            arr.push(item.value);
        })
        return arr;
    }
    const submitPost = (post) => {
        mySystem.persistPost(
            post,
            () => navigate("/localHome"),
            () => {
                setErrorMsg('Unable to create post')
            },
            () => {
                setUncompleteFormMsg("Complete all the parameters")
            }
        )
    }

    
    

    const titleChange = (event) => {
        setTitle(event.target.value)
    }
    const dateChange = (event) => {
        setDate(event.target.value)
    }
    const descriptionChange = (event) => {
        setDescription(event.target.value)
    }
    



    return (
        <div style={Background()}>
            <HomeNavbar isArtist= {false}/>
            <div className="space"/>

            <div className="titleEditProf">
                   <h1 className="profh1">Create new post</h1>
            </div>
            <form onSubmit={handleSubmit} className="profForm">
                
                <div className="profile-Settings">
                    <div>
                    <label className="profLabel">Title</label>
                        <input type="text"
                            placeholder="title"
                            value={title}
                            name="title"
                            onChange={titleChange}/>
                    </div>
                    <br/>
                    <div>
                        <label className="profLabel">Date</label>
                        <input type="date"
                            placeholder="date"
                            value={date}
                            name="date"
                            onChange={dateChange}/>
                    </div>
                    <br/>
                    <div>
                        <label className="DescriptionLabel">Description</label>
                        <textarea rows="6" cols="80" type="text"
                            placeholder="Add a description"
                            value={description}
                            name="description"
                            onChange={descriptionChange}/>
                    </div>
                    <br/>
                    <div>
                        <label className="profLabel">Genres</label>
                        {/* {genres.map((item, index)=>{
                            return(
                                item
                            )
                        })} */}
                        
                    </div>
                    {/* <GenreDropdown/> */}
                    <Select
                        defaultValue={[genreOptions[0]]}
                        isMulti
                        components={animatedComponents}
                        name="genres"
                        options={genreOptions}
                        className="basic-multi-select"
                        classNamePrefix="select"
                        onChange={(choice) => setGendres(choice)}
                    />
                    
                </div>

                <button type="submit" className="submitButtonEdit">Upload post</button>

                {errorMsg && <div className="alertWarning" role="alert">{errorMsg}</div>}
                {uncompleteFormMsg && <div className="alertWarning" role="alert">{uncompleteFormMsg}</div>}
            </form>
        </div>
    )
}
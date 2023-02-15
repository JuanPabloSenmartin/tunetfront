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
        <div >
            <HomeNavbar isArtist= {false}/>
            <div className="space"/>

            
            <form onSubmit={handleSubmit} className="create-post-form">
                <h1 className="createPostTitle">Create Post</h1>
                <div className="create-post-info">
                    
                    <div>
                    <label className="profLabel-createPost">Title</label>
                        <input type="text"
                        className="input-editProf"
                            placeholder="title"
                            value={title}
                            name="title"
                            onChange={titleChange}/>
                    </div>
                    <br/>
                    <br/>
                    <div>
                        <label className="profLabel-createPost">Date</label>
                        <input type="date"
                            className="input-editProf"
                            placeholder="date"
                            value={date}
                            name="date"
                            onChange={dateChange}/>
                    </div>
                    <br/>
                    <br/>
                    <div>
                        <label className="DescriptionLabel-createPost">Description</label>
                        <textarea rows="6" cols="80" type="text"
                            className="input-textarea"
                            placeholder="Add a description"
                            value={description}
                            name="description"
                            onChange={descriptionChange}/>
                    </div>
                    <br/>
                    <br/>
                    <label className="profLabel-createPost">Genres</label>
                    <div className="select-genre-createPost">
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
                </div>
                <button type="submit" className="submitButton-createPost">Upload post</button>

                {errorMsg && <div className="alertWarning" role="alert">{errorMsg}</div>}
                {uncompleteFormMsg && <div className="alertWarning" role="alert">{uncompleteFormMsg}</div>}
            </form>
        </div>
    )
}
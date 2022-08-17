import React, { useState, useEffect} from "react";
import '../Styles/starRating.css'
import Rating from '@mui/material/Rating';
import {useMySystem} from "../mySystem";

export const StarRating = (props) => {
    const [rating, setRating] = useState(0);
    const mySystem = useMySystem();
    
    useEffect(() => {
        if(rating != 0){
            handleSubmit()
        }
        
    }, [rating])

    const ratingChange = (event) => {
        setRating(event.target.value)
    }

    
    const handleSubmit = () => {
        console.log(rating)
        mySystem.addRating(props.email, rating, 
            () => console.log('ok'), 
            () => console.log('error'))
    }

    return (
        <Rating
        
        name="simple-controlled"
        value={rating}
        onChange={(event, newValue) => {
          setRating(newValue);
        }}
        
      />
      );
    };
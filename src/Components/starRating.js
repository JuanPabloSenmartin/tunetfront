import React, { useState, useEffect} from "react";
import '../Styles/starRating.css'


export const StarRating = (props) => {
    const [rating, setRating] = useState(0);
    const mySystem = useMySystem();

    const handleSubmit = () => {

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
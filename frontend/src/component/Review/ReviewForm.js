import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import { clearErrors, createReview } from "../../actions/reviewAction";

const ReviewForm=()=>
{

  const {id} = useParams();
  const dispatch = useDispatch();
 

  const [review, setReview] = useState("");

  const reviewSubmit = (e) => {

    e.preventDefault();

    const myForm = new FormData();

    myForm.set("review", review);    

    dispatch(createReview(myForm, id));

    setReview("")

  };

return (

<form style={{ paddingBottom: "30px" }} onSubmit={reviewSubmit}>

      <input
          style={{ width: "90%", height: "3rem" }}
          type="text" 
          value={review}
          placeholder="Type your Review"
          onChange={(e) => setReview(e.target.value)}
      />

      <button type="submit" style={{ left:"80%", height: "3rem", position: "absolute"  }}>
        Submit
      </button>

</form>

);
}

export default ReviewForm;

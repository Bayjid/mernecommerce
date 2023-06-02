import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import Loader from "../layout/Loader/Loader";
import {  getReviewsOfSingleProduct, clearErrors } from "../../actions/reviewAction";
import Card from 'react-bootstrap/Card';
import  ReviewForm  from "./ReviewForm"; 


const ReviewsOfProduct=()=>
{
  const dispatch = useDispatch();
  const {id} = useParams();

  const { reviews, loading, error } = useSelector(
    (state) => state.reviewsOfSingleProduct
  )

  const { review  } = useSelector(
    (state) => state.createReview
  )  

  useEffect(() => {    

    if (error) {
      dispatch(clearErrors());
    }

    dispatch(getReviewsOfSingleProduct( id ));     
    
    
  }, [dispatch, id, error, review]);

return (<>

{
  loading ? (<Loader />) : (

    <>

    <ReviewForm/>

    {
      reviews && reviews?.map((review) => (
        <>
        

        <Card>

          <Card.Header>{`${review.name}`}</Card.Header>

          <Card.Body>            

            <blockquote className="blockquote mb-0">
            <p>
              {' '}
              {review.review}
              {' '}
            </p>            
            </blockquote>
          </Card.Body>

        </Card>

        
        </>
        
      ))
      
    }

    </>   

  ) 
        
}            

</>            
                
  );
}

export default ReviewsOfProduct;
                                
         

          
        
          
         

       





 





import React, { Fragment, useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import ProductCarousels from './ProductCarousels';
import ReviewsOfProduct from '../Review/ReviewsOfProduct';
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  getProductDetails,  
} from "../../actions/productAction";
import {
  getReviewsOfSingleProduct,  
} from "../../actions/reviewAction";

import {
  addItemsToCart,  
} from "../../actions/cartAction";





const ProductDetails=({match})=>
{
  
  const dispatch = useDispatch();

  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  )

  useEffect(() => {

    if (error) {
      dispatch(clearErrors());
    }    
    dispatch(getProductDetails(match.params.id));
    dispatch(getReviewsOfSingleProduct(match.params.id));

  }, [dispatch, match.params.id, error]);

  const [quantity, setQuantity] = useState(1);

  const increaseQuantity = () => {
    if (product.Stock <= quantity) return;

    const qty = quantity + 1;
    setQuantity(qty);
  };

  const decreaseQuantity = () => {
    if (1 >= quantity) return;

    const qty = quantity - 1;
    setQuantity(qty);
  };

  
  const addToCartHandler = () => {

    dispatch(addItemsToCart(match.params.id, quantity));         
          
  };
  

  return (
    <Container style={{ paddingTop: "90px" }}>
    
    <Row>

      <Col style={{ paddingTop: "30px" }}>        
        <ProductCarousels productImages={product.images}/>   
      </Col>


      <Col style={{ paddingLeft: "50px" }}>

        <h2 style={{ paddingTop: "30px" }}>{product.name}</h2>

        <h4 style={{ paddingTop: "20px" }}> TK {product.price}</h4>


        <div style={{ paddingTop: "20px" }}>

          <Button variant="success" onClick={decreaseQuantity}> - </Button>

            {" "}  {quantity} {" "}

          <Button variant="success" onClick={increaseQuantity}> + </Button>
            {" "} 

          <Button variant="warning"
            disabled={product.Stock < 1 ? true : false} 
            onClick={addToCartHandler}> Add to Cart </Button>

        </div>

      

      <h5 style={{ paddingTop: "40px" }}>Description</h5>  

      <p style={{ paddingTop: "5px" }}> {product.description} </p>  

      </Col>
    </Row>
    <Row style={{ paddingTop: "50px" }}>
      <h3>Reviews</h3>
      <ReviewsOfProduct />
    </Row>
   
    </Container>
    

  
);
}

export default ProductDetails;

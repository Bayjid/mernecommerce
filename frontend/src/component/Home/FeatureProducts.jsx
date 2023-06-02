import React, { Fragment, useEffect } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ProductCard from '../Product/ProductCard.js';
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors, getProduct 
} from "../../actions/productAction";


function FeatureProducts() {

  const dispatch = useDispatch();

  const { loading, error, products } = useSelector((state) => state.products);

  useEffect(() => {
    if (error) {
      dispatch(clearErrors());
    }
    dispatch(getProduct());
  }, [dispatch, error]);

  return (
    <Container>

      <h2 style={{ paddingTop: "25px", paddingBottom: "25px" }}>Feature Products</h2>

      <Fragment>

      {loading ? (
        <div>LOADING</div>
      ) : (
        <Fragment>

        <Row>
            {products &&
              products.map((product) => (
                <Col>
                <ProductCard key={product._id} product={product} />
                </Col>              
            ))}    
        </Row>                       
                      
        </Fragment>
      )}

      </Fragment>   
      
    
    </Container>
    
  );
}

export default FeatureProducts;
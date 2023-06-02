import React, { Fragment, useEffect, useState } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ProductCard from '../Product/ProductCard.js';
import Loader from "../layout/Loader/Loader";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors, getProduct 
} from "../../actions/productAction";


function Products({ match }) {

  const keyword = match.params.keyword;

  const [currentPage, setCurrentPage] = useState(1);
  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  }; 

  const dispatch = useDispatch();

  const { 
     loading,
     error,
     products,
     productsCount,
     resultPerPage,
     filteredProductsCount
    } = useSelector((state) => state.products);

  let count = filteredProductsCount;

  useEffect(() => {
    if (error) {
      dispatch(clearErrors());
    }
    dispatch(getProduct(keyword, currentPage, ));
  }, [dispatch, error, keyword, currentPage, ]);


  return (
    
    <Container>

      <h2>Products</h2>          

      {loading ? (
        <Loader />
      ) : (
        <Fragment>

          <Row>
            {products &&
                  products.map((product, i) => (
                  <Col key={product._id}>
                  <ProductCard  product={product} />
                  </Col>                  
                                  
                ))} 
          </Row>

        </Fragment>
        )}  
         
        

        
       
                               
                      
        
      

      

    
      
      
     
  
  </Container>  
  );
}
       
          
            

    
    


export default Products;
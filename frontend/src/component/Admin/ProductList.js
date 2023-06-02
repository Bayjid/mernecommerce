import React, { Fragment, useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  getAdminProduct,
  deleteProduct,
} from "../../actions/productAction";
import { DELETE_PRODUCT_RESET } from "../../constants/productConstants";
import { Link } from "react-router-dom";
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';


const ProductList=()=>
{
  const dispatch = useDispatch();

  const { loading, error, products } = useSelector((state) => state.adminProducts);

  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.deleteProduct
  );

  const deleteProductHandler = (id) => {
    dispatch(deleteProduct(id));
  };


  useEffect(() => {
    if (error) {
      //alert.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      //alert.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      //alert.success("Product Deleted Successfully");
      //history.push("/admin/dashboard");
      dispatch({ type: DELETE_PRODUCT_RESET });
    }

    dispatch(getAdminProduct());

  }, [dispatch, error, deleteError, isDeleted]);

  


  return (
    <Fragment>
      {loading ? (<div>LOADING</div>) : (<Fragment>
  
        <Container style={{ paddingTop: "90px" }}>
          <Table striped bordered hover>
              <thead>
              <tr>
                <th>Product Image</th>
                <th>Product Name</th>
                <th>Stock</th>
                <th>Price</th>
                <th>Update</th>
                <th>Delete</th>
                
              </tr>
            </thead>
  
            <tbody>
  
            {products && products.map((product) => (    
             
          
             <tr>
               <td>
                <img src={product.images[0].url} alt="Product" style={{ width: 90, height: 90, marginRight: 10, objectFit: "cover",}} />
               </td>
               <td>{product.name}</td>
               <td>{product.Stock}</td>
               <td>{product.price}</td>

               <td>
                  <Link to={`/admin/product/${product._id}`}>
                    <Button variant="info">Update</Button>   
                  </Link>                
               </td>
               
               <td><Button onClick={() =>
                  deleteProductHandler(product._id)
                } variant="danger">Delete</Button>
               </td>

              
             </tr>
               
         
   
        
         )) } 
  
  
            </tbody>
  
          </Table> 
  
        </Container>
        
   
        </Fragment>
      )}
    </Fragment>);



}

export default ProductList;

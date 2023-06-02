import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  updateProduct,
  getProductDetails,
} from "../../actions/productAction";

import { UPDATE_PRODUCT_RESET } from "../../constants/productConstants";
import Loader from "../layout/Loader/Loader";
import { Col, Container, Form, Row, Button } from "react-bootstrap";



const UpdateProduct=({ history, match })=>
{
  const dispatch = useDispatch();

  const { error, product } = useSelector((state) => state.productDetails);

  const {
    loading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.updateProduct);

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [Stock, setStock] = useState(0);

  const categories = [
    "Laptop",
    "Footwear",
    "Bottom",
    "Tops",
    "Attire",
    "Camera",
    "SmartPhones",
  ];

  const productId = match.params.id;

  useEffect(() => {
    if (product && product._id !== productId) {
      dispatch(getProductDetails(productId));
    } else {
      setName(product.name);
      setDescription(product.description);
      setPrice(product.price);
      setCategory(product.category);
      setStock(product.Stock);      
    }
    if (error) {
      //alert.error(error);
      dispatch(clearErrors());
    }

    if (updateError) {
      //alert.error(updateError);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      //alert.success("Product Updated Successfully");
      history.push("/admin/products");
      dispatch({ type: UPDATE_PRODUCT_RESET });
    }
  }, [
    dispatch,    
    error,
    history,
    isUpdated,
    productId,
    product,
    updateError,
  ]);
  

  const updateProductSubmitHandler = (e) => {

    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("price", price);
    myForm.set("description", description);
    myForm.set("category", category);
    myForm.set("Stock", Stock);

    dispatch(updateProduct(productId, myForm));

  };

return (

<Container style={{ paddingTop: "90px" }}>

{loading ? (<Loader />) : (
  <Row>

      
    <Col></Col>

    <Col xs={6}>
      

        <Form style={{ width: "80%", maxWidth: 500 }} onSubmit={updateProductSubmitHandler}>
                 
        
          <Form.Group className="mb-3">
            <Form.Label>Product Name</Form.Label>
            <Form.Control type="text"  placeholder="Product Name" name="name" value={name}
              onChange={(e) => setName(e.target.value)} />    
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Price</Form.Label>
            <Form.Control type="number"  placeholder="Price" name="price" value={price}
              onChange={(e) => setPrice(e.target.value)} />    
          </Form.Group>

          <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" rows={3} placeholder="Enter Description" name="description" value={description}
              onChange={(e) => setDescription(e.target.value)}/>    
          </Form.Group>

          <Form.Select defaultValue={category}  onChange={(e) => setCategory(e.target.value)} aria-label="Default select example">

            <option value="">{category}</option>

              {categories.map((cate) => (
                  <option key={cate} value={cate}>
                    {cate}
                  </option>
              ))}
              
            
          </Form.Select>

          <Form.Group className="mb-3">
            <Form.Label>Stock</Form.Label>
            <Form.Control type="number"  placeholder="Stock" name="Stock" value={Stock}
              onChange={(e) => setStock(e.target.value)} />    
          </Form.Group>            

          
          


        

        <Button variant="primary" type="submit">
              Update
          </Button>

          
            


            

        </Form>
  </Col>    

  
  
  
  <Col></Col>      

      

      



  </Row>
)
}  

</Container>


);
}

export default UpdateProduct;

import React, { Fragment, useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, createProduct } from "../../actions/productAction";
import { NEW_PRODUCT_RESET } from "../../constants/productConstants";
import Loader from "../layout/Loader/Loader";
import { Col, Container, Form, Row, Button } from "react-bootstrap";
import Carousel from 'react-bootstrap/Carousel';
import "./NewProduct.css";

const  NewProduct=({ history })=>
{
  const dispatch = useDispatch();

  const { loading, error, success } = useSelector((state) => state.newProduct);

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [Stock, setStock] = useState(0);
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const categories = [
    "Laptop",
    "Footwear",
    "Bottom",
    "Tops",
    "Attire",
    "Camera",
    "SmartPhones",
  ];

  useEffect(() => {
    if (error) {
      //alert.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      //alert.success("Product Created Successfully");
      history.push("/admin/dashboard");
      dispatch({ type: NEW_PRODUCT_RESET });
    }
  }, [dispatch, error, history, success]);


  const createProductSubmitHandler = (e) => {

    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("price", price);
    myForm.set("description", description);
    myForm.set("category", category);
    myForm.set("Stock", Stock);

    images.forEach((image) => {
      myForm.append("images", image);
    });

    dispatch(createProduct(myForm));

  };

  const createProductImagesChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old) => [...old, reader.result]);
          setImages((old) => [...old, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

return (

  <Container style={{ paddingTop: "180px" }}>

  {loading ? (<Loader />) : (
    <Row>

        
      <Col></Col>

      <Col xs={6}>
        

          <Form style={{ width: "80%", maxWidth: 500 }} onSubmit={createProductSubmitHandler}>
                      
            <div id="createProductFormImage">
              {imagesPreview.map((image, index) => (
                <img key={index} src={image} alt="Product Preview" />
              ))}
            </div>

            <div id="createProductFormFile">
              <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={createProductImagesChange}
                multiple
              />
            </div>      


            <Form.Group className="mb-3">
              <Form.Label>Product Name</Form.Label>
              <Form.Control type="text"  placeholder="Product Name" name="name"
                onChange={(e) => setName(e.target.value)} />    
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Price</Form.Label>
              <Form.Control type="number"  placeholder="Price" name="price"
                onChange={(e) => setPrice(e.target.value)} />    
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control as="textarea" rows={3} placeholder="Enter Description" name="description"
                onChange={(e) => setDescription(e.target.value)}/>    
            </Form.Group>

            <Form.Select onChange={(e) => setCategory(e.target.value)} aria-label="Default select example">

              <option value="">Choose Category</option>

                {categories.map((cate) => (
                    <option key={cate} value={cate}>
                      {cate}
                    </option>
                ))}
                
              
            </Form.Select>

            <Form.Group className="mb-3">
              <Form.Label>Stock</Form.Label>
              <Form.Control type="number"  placeholder="Stock" name="Stock"
                onChange={(e) => setStock(e.target.value)} />    
            </Form.Group>            

            
            


          

          <Button variant="primary" type="submit">
                Submit
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

export default  NewProduct;

import React, { Fragment, useRef, useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Loader from "../layout/Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, register, loadUser } from "../../actions/authAction";
import { useHistory } from "react-router";
import { Col, Container,  Row,  } from "react-bootstrap";
import "./Register.css";

const Register=()=>
{
  const history = useHistory();
  const dispatch = useDispatch();

  const { error, loading, isAuthenticated } = useSelector(
    (state) => state.register
  );

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = user;
  

  const registerSubmit = (e) => {

    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("password", password);    
    dispatch(register(myForm));

  };


  const registerDataChange = (e) => {

    if (e.target.name === "avatar") {
            
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };


  useEffect(() => {
    if (error) {      
      dispatch(clearErrors());
    }

    if (isAuthenticated) {
      dispatch(loadUser());
      history.push("/account");
    }
  }, [dispatch, error, history, isAuthenticated]);




return (

  <Container>
    <Row>

      <Col xs={4}>

      </Col>

      <Col xs={4}>

      <Form style={{ paddingTop: "80px" }} onSubmit={registerSubmit}>

        <h2 className="text-center">Sign Up</h2>

        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" placeholder="Enter name" name="name"
          value={name}
            onChange={registerDataChange} />    
        </Form.Group>

        <Form.Group className="mb-3">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" name="email"
                value={email}
                onChange={registerDataChange}/>              
            </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" name="password" 
          value={password}
          onChange={registerDataChange} />
      </Form.Group>

      
        
      <Button variant="primary" type="submit">
        {loading ? "Submitting" : "Submit"}
      </Button>
    </Form>

      </Col>

      <Col xs={4}>

      </Col>



    </Row>

      
  </Container>

 
);
}

export default Register;

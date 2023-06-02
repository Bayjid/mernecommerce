import React, { Fragment, useRef, useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Loader from "../layout/Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, login, loadUser } from "../../actions/authAction";
import { Col, Container,  Row,  } from "react-bootstrap";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import Alert from 'react-bootstrap/Alert';


 
const Login=({ location })=>
{
  const history = useHistory();
  const dispatch = useDispatch(); 

    
      const { error, loading, isAuthenticated } = useSelector(
        (state) => state.login
      );  

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const loginSubmit = (e) => {
    e.preventDefault();
    dispatch(login(loginEmail, loginPassword));
  };

  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (error) {            
      dispatch(clearErrors());
    }

    if (isAuthenticated) {
      dispatch(loadUser());
      history.push(redirect);
    }
  }, [dispatch, error,  history, isAuthenticated, ]);

  return (

    <Container>    

  <Row>

      <Col xs={4}>

      </Col>

      <Col xs={4}>

      <Form style={{ paddingTop: "200px" }} onSubmit={loginSubmit}>

      <h2 className="text-center">Login</h2>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} />        
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} />
      </Form.Group>
      
      <Button variant="primary" type="submit">
        {loading ? "Submitting" : "Submit"}
      </Button>
    </Form>

    <p style={{ paddingTop: "40px", paddingLeft: "40px" }}>

      Don’t have an account ?  

      <Link to="/register" style={{ color: 'Blue', textDecoration: 'inherit'}}>  Sign Up </Link>

      now

    </p> 

      </Col>

      <Col xs={4}>

      </Col>

      </Row>  

    </Container>
       
    

  )
}
 
export default Login;
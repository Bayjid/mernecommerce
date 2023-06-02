import React,  { Fragment, useState, useEffect } from 'react';
import Loader from "../layout/Loader/Loader";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { UPDATE_PROFILE_RESET } from "../../constants/userConstants";
import PageTitle from "../layout/MetaData/PageTitle"
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import { clearErrors, updateProfile } from "../../actions/userAction";
import { loadUser } from "../../actions/authAction";
import { Col,   Row,  } from "react-bootstrap";


const UpdateProfile=()=>
{
  const history = useHistory();

  const dispatch = useDispatch();

  const {  user } = useSelector((state) => state.loadUser);  

  const { error, isUpdated, loading } = useSelector((state) => state.profile);


  // const [updateUser, setupdateUser] = useState({
  //   name: "",
  //   email: "",    
  // });

  // const { name, email } = updateUser;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  
 

 

  const updateProfileSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);    
    dispatch(updateProfile(myForm));
  };

  // const updateProfileDataChange = (e) => {   
    
  //   setupdateUser({ ...updateUser, [e.target.name]: e.target.value });

  // };

  useEffect(() => {

    if (user) {
      // updateUser.name =user.name;
      // updateUser.email = user.email;
      
      setName(user.name);
      setEmail(user.email);
      
    }

    if (error) {
      
      dispatch(clearErrors());
    }

    if (isUpdated) {
      
      dispatch(loadUser());

      history.push("/account");

      dispatch({
        type: UPDATE_PROFILE_RESET,
      });
    }

  }, [ user, error, dispatch, history, isUpdated]);

return (

<Fragment>
      {loading ? (<Loader />) : (<Fragment>

        <Container style={{ paddingTop: "160px" }}>
        <Row>

        <Col xs={4}>

        </Col>

        <Col xs={4}>

        <Form encType="multipart/form-data" onSubmit={updateProfileSubmit}>

        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" placeholder="Enter name" name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />    
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />    
        </Form.Group>        

        <Button variant="primary" type="submit">
          Submit
        </Button>

        </Form>

        
        </Col>

        <Col xs={4}>

        </Col>




        </Row>

   
  </Container>
      
      
      
       </Fragment>)}
</Fragment>      
  

  
);
}

export default UpdateProfile;

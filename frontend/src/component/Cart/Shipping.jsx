import React, { Fragment, useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useHistory } from "react-router";
import PageTitle from "../layout/MetaData/PageTitle"
import { saveShippingInfo } from "../../actions/cartAction";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


const Shipping=()=>
{
  const history = useHistory();
  const dispatch = useDispatch();

  const { user, loading, isAuthenticated } = useSelector((state) => state.loadUser);

  useEffect(() => {
    if (isAuthenticated === false) {
      history.push("/login");
    }
  }, [history, isAuthenticated]);

  const { shippingInfo } = useSelector((state) => state.cart);

  const [address, setAddress] = useState(shippingInfo.address);
  const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo);

  const shippingSubmit = (e) => {
    e.preventDefault();

    if (phoneNo.length < 11 || phoneNo.length > 11) {
      
      return;
    }
    dispatch(
      saveShippingInfo({ address, phoneNo })
    );
    history.push("/order/confirm");
  };

return (
  <Fragment >
    <PageTitle title="Shipping Details" />
    <Container style={{ paddingTop: "160px" }}>

      <Row>
        <Col></Col>
        <Col>

        <Form onSubmit={shippingSubmit}>

          <Form.Group className="mb-3">
            <Form.Label>Address</Form.Label>
            <Form.Control  as="textarea" type="text" placeholder="Enter Address"
            value={address} onChange={(e) => setAddress(e.target.value) } />        
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Phone No</Form.Label>
            <Form.Control type="number" placeholder="Phone number must be 11 digit"
            value={phoneNo} onChange={(e) => setPhoneNo(e.target.value) } />        
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>

        </Form>

        </Col>
        <Col></Col>
      </Row>

      

    </Container>

    
  </Fragment>  
)
}

export default Shipping;

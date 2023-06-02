import React, { Fragment }  from 'react';
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import PageTitle from "../layout/MetaData/PageTitle"
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import Loader from "../layout/Loader/Loader";
import Button from 'react-bootstrap/Button';


const ConfirmOrder=()=>
{
const history = useHistory();
const { shippingInfo, cartItems } = useSelector((state) => state.cart);
const { loading, user } = useSelector((state) => state.loadUser);

const subtotal = cartItems.reduce(
  (acc, item) => acc + item.quantity * item.price,
  0
);

const shippingCharges = subtotal > 500 ? 0 : 100;

const vat = subtotal * 0.15;

const totalPrice = subtotal + vat + shippingCharges;

const address = shippingInfo.address;

const proceedToPayment = () => {
  const data = {
    subtotal,
    shippingCharges,
    vat,
    totalPrice,
  };

  sessionStorage.setItem("orderInfo", JSON.stringify(data));

  history.push("/process/payment");
};

return (
  
  <Fragment>
      {loading ? (<Loader />) : (<Fragment>
  
        <Container style={{ paddingTop: "90px" }}>

        <Row>
          <Col></Col>
          <Col>
          <h2>Shipping Info</h2>
            <p>Name: {user.name}</p>
            <p>Phone: {shippingInfo.phoneNo}</p>
            <p>Address: {address}</p> 
          </Col>
          <Col></Col>
        </Row>


          <Table striped bordered hover>
              <thead>
              <tr>
                <th>Product Image</th>
                <th>Product Name</th>
                <th>Quantity</th>
                <th>Unit Price</th>
                <th>Quantity x Unit Price</th>
              </tr>
            </thead>
  
            <tbody>
  
            {cartItems && cartItems.map((item) => (    
             
          
              <tr>

                <td>
                  <img src={item.image} alt="Product" style={{ width: 90, height: 90, marginRight: 10, objectFit: "cover",}} />
                </td>

                <td>

                  <Link to={`/product/${item.product}`}>
                    {item.name}
                  </Link>  
                
                </td>

                <td>{item.quantity}</td>

                <td>Tk {item.price}</td>

                <td>

                Tk {item.price * item.quantity}
                
               </td>
             </tr>
               
         
   
        
         )) } 
  
  
            </tbody>
  
          </Table>

          <Row>
            <Col>
            <h2>Order Summery</h2>
            <p>Subtotal: {subtotal}</p>
            <p>Shipping Charges: {shippingCharges}</p>
            <p>VAT: {vat}</p> 
            </Col>

            <Col>
            <h2>Total</h2>
            <span>Tk{totalPrice}</span>      
            </Col>

            <Col>

            
              <Button onClick={proceedToPayment} variant="warning">Proceed To Payment</Button>

            </Col>
          </Row> 
  
        </Container>
        
   
        </Fragment>
      )}
    </Fragment>

)
}

export default ConfirmOrder;

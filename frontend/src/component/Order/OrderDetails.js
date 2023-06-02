import React, { Fragment, useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layout/Loader/Loader";
import { getOrderDetails, clearErrors } from "../../actions/orderAction";
import { Link } from "react-router-dom";
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const OrderDetails=({ match })=>
{
  const dispatch = useDispatch();

  const { order, error, loading } = useSelector((state) => state.orderDetails);

  useEffect(() => {
    if (error) {
      //alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(getOrderDetails(match.params.id));
  }, [dispatch, error, match.params.id]);

return (

  <Fragment>
  {loading ? (
    <Loader />
  ) : (
    <>
    <Container style={{ paddingTop: "90px" }}>


    <Row>
          
          <Col>
          <h3>Shipping Info</h3>
            <p>Name: {order.user && order.user.name}</p>
            <p>Phone: {order.shippingInfo && order.shippingInfo.phoneNo}</p>
            <p>Address:  {order.shippingInfo &&
                          `${order.shippingInfo.address}`}</p>                           

          </Col>
          <Col>

          <h3>Payment</h3>               
                <p>                      
                    {order.paymentInfo &&
                        order.paymentInfo.status === "succeeded"
                          ? "PAID"
                          : "NOT PAID"}
                </p>

                <p>Amount: {order.totalPrice && order.totalPrice}</p>   



          </Col>
        </Row>



    <Table striped bordered hover>
            <thead>
            <tr>
              <th>Product Image</th>
              <th>Product Name</th>
              <th>Qty x Unit Price</th>
              <th>Sub Total</th>              
            </tr>
          </thead>

          <tbody>

          {order.orderItems && order.orderItems.map((item) => (    
           
        
          <tr>
            <td>
              <img src={item.image} alt="Product" style={{ width: 90, height: 90, marginRight: 10, objectFit: "cover",}} />
            </td>

            <td>
                <Link style={{ color: 'inherit', textDecoration: 'inherit'}} to={`/product/${item.product}`}>
                        {item.name}
                </Link>
            </td>

            <td>
              {item.quantity} X Tk{item.price}
            </td>

            <td> Tk {item.price * item.quantity} </td>
            
          </tr>
             
       
 
      
       )) } 


          </tbody>

        </Table> 



    </Container>
    </>
  )}
</Fragment>

);


}

export default OrderDetails;

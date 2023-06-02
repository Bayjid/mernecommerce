import React, { Fragment, useState, useEffect } from 'react';
import {
  getOrderDetails,
  clearErrors,
  updateOrder,
} from "../../actions/orderAction";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layout/Loader/Loader";
import { UPDATE_ORDER_RESET } from "../../constants/orderConstants";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import { Link } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import { Button } from "react-bootstrap";

const ProcessOrder=({ history, match })=>
{
  const dispatch = useDispatch();
  const [status, setStatus] = useState("");

  const { order, error, loading } = useSelector((state) => state.orderDetails);
  const { error: updateError, isUpdated } = useSelector((state) => state.updateOrder);

  useEffect(() => {
    if (error) {
      //alert.error(error);
      dispatch(clearErrors());
    }
    if (updateError) {
      //alert.error(updateError);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      //alert.success("Order Updated Successfully");
      dispatch({ type: UPDATE_ORDER_RESET });
    }

    dispatch(getOrderDetails(match.params.id));
  }, [dispatch, error, match.params.id, isUpdated, updateError]);

  const updateOrderSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("status", status);

    dispatch(updateOrder(match.params.id, myForm));
  };



return (

  <Fragment>
      {loading ? (<Loader />) : (<Fragment>
  
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
                <th>Quantity</th>
                <th>Unit Price</th>
                <th>Quantity x Unit Price</th>
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

                <td>{item.quantity}</td>

                <td>Tk {item.price}</td>

                <td>

                Tk {item.price * item.quantity}
                
               </td>
             </tr>
               
         
   
        
         )) } 
  
  
            </tbody>
  
          </Table>


          <Form onSubmit={updateOrderSubmitHandler}>

          <Form.Select defaultValue={order.orderStatus} onChange={(e) => setStatus(e.target.value)} aria-label="Default select example">
            <option value="">{order.orderStatus}</option>           
                            
            
                <option value="Shipped">Shipped</option>

                <option value="Delivered">Delivered</option>                

            </Form.Select>

            <Button  variant="primary" type="submit" disabled={
                      loading ? true : false || status === "" ? true : false
                    }>
              Process
          </Button>

                       
          
      
          </Form>         
  
        </Container>
        
   
        </Fragment>
      )}
    </Fragment>


);
}

export default ProcessOrder;

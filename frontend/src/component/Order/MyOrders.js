import React, { Fragment, useState, useEffect } from 'react';
import Loader from "../layout/Loader/Loader";
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, myOrders } from "../../actions/orderAction";
import { Link } from "react-router-dom";

const MyOrders=()=>
{
  
  const dispatch = useDispatch();

  const { loading, error, orders } = useSelector((state) => state.myOrders);

  useEffect(() => {
    if (error) {
      //alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(myOrders());
  }, [dispatch, error]);


  return (
    <Fragment>
      {loading ? (<Loader />) : (<Fragment>


        {orders.length === 0 ? (

          <h1 style={{ paddingTop: "180px" }} className="text-center">
            No order
          </h1>

          ) : (


            <Container style={{ paddingTop: "90px" }}>
          <Table striped bordered hover>
              <thead>
              <tr>
                <th>Order ID</th>
                <th>itemsQty</th>
                <th>amount</th>
                <th>status</th>
                <th>Details</th>
              </tr>
            </thead>
  
            <tbody>
  
            {orders && orders.map((order) => (    
             
          
             <tr>
               <td>{order._id}</td>
               <td>{order.orderItems.length}</td>
               <td>{order.totalPrice}</td>
               <td>{order.orderStatus}</td>
               <td>
               <Link to={`/order/${order._id}`}>
                <Button variant="info">Order Details</Button>   
               </Link>
                
               </td>
             </tr>
               
         
   
        
         )) } 
  
  
            </tbody>
  
          </Table> 
  
        </Container>

              


          )
        }  
  
        
        
   
        </Fragment>
      )}
    </Fragment>);
}

export default MyOrders;

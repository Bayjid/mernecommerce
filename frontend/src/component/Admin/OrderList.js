import React, { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {  
  getAllOrders,
  deleteOrder,
  clearErrors,

} from "../../actions/orderAction";
import { useHistory } from "react-router";
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import { DELETE_ORDER_RESET } from "../../constants/orderConstants";



const OrderList=({ match })=>
{
  const history = useHistory();
  const dispatch = useDispatch();

  const id = match.params.id;

  const deleteOrderHandler = (id) => {
    dispatch(deleteOrder(id));
  };

  const {loading, error, orders } = useSelector((state) => state.allOrders);
  const { error: deleteError, isDeleted } = useSelector((state) => state.deleteOrder);

  useEffect(() => {
    if (error) {      
      dispatch(clearErrors());
    }
    
    if (isDeleted) {
      history.push("/admin/orders");
      dispatch({ type: DELETE_ORDER_RESET });
    }

    

    dispatch(getAllOrders());
  }, [dispatch, isDeleted,  error,  history, ]);


console.log(orders)

  return (
  <Fragment>
    {loading ? (<div>LOADING</div>) : (<Fragment>

      <Container style={{ paddingTop: "90px" }}>
        <Table striped bordered hover>
            <thead>
            <tr>
              <th>Order ID</th>
              <th>itemsQty</th>
              <th>amount</th>
              <th>status</th>
              <th>Update</th>
              <th>Delete</th>
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
                  <Link to={`/admin/order/${order._id}`}>
                    <Button variant="info">Update</Button>   
                  </Link>                
             </td> 

             <td><Button onClick={() =>
                deleteOrderHandler(order._id)
              } variant="danger">Delete</Button></td>
           </tr>
             
       
 
      
       )) } 


          </tbody>

        </Table> 

      </Container>
      
 
      </Fragment>
    )}
  </Fragment>);
}

export default OrderList;

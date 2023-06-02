import React, { Fragment } from 'react';
import { useSelector, useDispatch } from "react-redux";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { addItemsToCart, removeItemsFromCart } from "../../actions/cartAction";
import { useHistory } from "react-router";
import Table from 'react-bootstrap/Table';
import { Link } from "react-router-dom"; 


const Cart=()=>
{ 
  const history = useHistory();
  
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);

  const increaseQuantity = (id, quantity, stock) => {
    const newQty = quantity + 1;
    if (stock <= quantity) {
      return;
    }
    dispatch(addItemsToCart(id, newQty));
  };

  const decreaseQuantity = (id, quantity) => {
    const newQty = quantity - 1;
    if (1 >= quantity) {
      return;
    }
    dispatch(addItemsToCart(id, newQty));
  };

  const deleteCartItems = (id) => {
    dispatch(removeItemsFromCart(id));
  };

  const checkoutHandler = () => {
    history.push("/shipping");
  };
  

  
  return (
    <Fragment style={{ paddingTop: "90px" }}>
      {cartItems.length === 0 ? (

        <h1 style={{ paddingTop: "70px" }} className="text-center">
            Empty Cart
        </h1>

      ) : (
      <Fragment>
      <Container style={{ paddingTop: "90px" }}>

      <Table striped bordered hover>
              <thead>
              <tr>
                <th>Product Image</th>
                <th>Product Name</th>
                <th>Delete</th>
                <th>Quantity</th>                
                <th>Sub Total</th>
              </tr>
            </thead>
  
            <tbody>
  
            {cartItems && cartItems.map((item) => (    
             
          
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
                  <Button onClick={() =>
                    deleteCartItems(item.product)
                  } variant="danger">Delete</Button>
              </td>

                <td>

                  <Button variant="success" onClick={() =>
                          decreaseQuantity(item.product, item.quantity)
                        }> - </Button>
                        {" "}
                          {item.quantity}
                        {" "}
                    <Button variant="success" 
                      onClick={() =>
                          increaseQuantity(
                            item.product,
                            item.quantity,
                            item.stock
                          )
                        }> + </Button>

                </td>                

                <td>

                Tk {item.price * item.quantity}
                
               </td>
             </tr>
               
         
   
        
         )) } 
  
  
            </tbody>
  
          </Table>  







        

          
        
        

          <div>

            <h4>
              Gross Total
            </h4>

            <h5>
              {cartItems.reduce(
                    (acc, item) => acc + item.quantity * item.price,
                    0
                  )
                }
            </h5>

            <Button onClick={checkoutHandler} variant="warning">Check Out</Button>
            
                
          </div>
        
    </Container>      
      </Fragment>)
      }
        
    </Fragment>
    
  )  
}

export default Cart;

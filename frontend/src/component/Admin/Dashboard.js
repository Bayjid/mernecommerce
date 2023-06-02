import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Col, Container,  Row,  } from "react-bootstrap";
import Table from 'react-bootstrap/Table';
import { Link } from "react-router-dom";
import { getAdminProduct } from "../../actions/productAction";
import { getAllOrders } from "../../actions/orderAction.js";
import { useSelector, useDispatch } from "react-redux";
import CardGroup from 'react-bootstrap/CardGroup';
import Card from 'react-bootstrap/Card';
import "./sidebar.css";


function Dashboard() {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { products } = useSelector((state) => state.adminProducts);

  const { orders } = useSelector((state) => state.allOrders);

  useEffect(() => {
    dispatch(getAdminProduct());
    dispatch(getAllOrders());    
  }, [dispatch]);

  return (
    <>
    <Container style={{ paddingTop: "200px" }}>

    <h1 className="text-center" style={{ paddingBottom: "20px" }}>Admin Panel</h1>

    <Button  variant="primary" onClick={handleShow}>
        Options
      </Button>

      

      <CardGroup style={{ paddingTop: "20px" }}>

      <Card>        
        <Card.Body>
          <Card.Title>Products</Card.Title>
          <Card.Text>
            <h1>{products && products.length}</h1>
          </Card.Text>
        </Card.Body>        
      </Card>


      <Card>        
        <Card.Body>
          <Card.Title>Orders</Card.Title>
          <Card.Text>
            <h1>{orders && orders.length}</h1>
          </Card.Text>
        </Card.Body>        
      </Card>      
    </CardGroup>

      

      




    </Container>

      

      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Dashboard</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>

      <div className="sidebar">

        <Link to="/admin/products">
          <p>          
            Products
          </p>
        </Link>
        

        <Link to="/admin/product">
          <p>          
            Add Product
          </p>
        </Link>

        <Link to="/admin/orders">
          <p>          
            Orders
          </p>
        </Link>       
      
      </div>
          
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default Dashboard;
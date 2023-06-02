import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Search from '../../Product/Search';
import { logout } from "../../../actions/authAction";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";


function NavBar({ isAuthenticated, user }) {

  const dispatch = useDispatch();   
  
  
  function logoutUser() {

    dispatch(logout());    
    
    
    setTimeout(() => {
      window.location.href = '/';
    }, "2000");

  }

 

  const { cartItems } = useSelector((state) => state.cart);

  console.log(cartItems.length);

  return (
    <Navbar className={`fixed-top ` } style={{ MarginBottom: "0px" }} bg="light" expand="lg">
      <Container>
        <Navbar.Brand>
          <Link to="/" style={{ color: 'inherit', textDecoration: 'inherit'}}>Mr.B</Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse className="right-aligned" id="basic-navbar-nav">
        <Search/>        

    

          <Nav>

            <Nav.Link>              
              <Link to="/cart" style={{ color: 'inherit', textDecoration: 'inherit'}}>
                Cart
                  { cartItems.length > 0 ? 
                    <span style={{ height: "10px",width: "10px",padding: "5px",  backgroundColor: "tomato", 
                    borderRadius: "50%",
                  }} className="dot">
                   {cartItems.length}
                  </span>   : " " }
              </Link>
            </Nav.Link>

            { !isAuthenticated &&  <Nav.Link href="/login">Login</Nav.Link> }            
            {isAuthenticated && 
              <NavDropdown title={user.name} id="basic-nav-dropdown">

              
              { user.role === "admin" &&
                <NavDropdown.Item>  
                <Link to="/admin/dashboard" style={{ color: 'inherit', textDecoration: 'inherit'}}>
                  Admin Dashboard          
                </Link>
              </NavDropdown.Item>
              }


              <NavDropdown.Item>  
                <Link to="/orders" style={{ color: 'inherit', textDecoration: 'inherit'}}>
                  Orders          
                </Link>
              </NavDropdown.Item> 
                                             
                              
                
              
              

              <NavDropdown.Item>
                <Link to="/account" style={{ color: 'inherit', textDecoration: 'inherit'}}>Account</Link>
              </NavDropdown.Item>

              <NavDropdown.Item>
                <Link to="/cart" style={{color: 'inherit', textDecoration: 'inherit'}}>Cart</Link>
              </NavDropdown.Item>
              
              <NavDropdown.Divider />

              <NavDropdown.Item onClickCapture={logoutUser}>
                Logout
              </NavDropdown.Item>
            </NavDropdown>
            
            }


            
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;

import React, { Fragment, useEffect } from 'react';
import { useSelector } from "react-redux";
import Loader from "../layout/Loader/Loader";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import PageTitle from "../layout/MetaData/PageTitle"
import "./Profile.css";

const Profile=()=>
{
  const { user, loading, isAuthenticated } = useSelector((state) => state.loadUser);
  const history = useHistory();

  useEffect(() => {
    if (isAuthenticated === false) {
      history.push("/login");
    }
  }, [history, isAuthenticated]);

return (<Fragment>
  {loading ? (<Loader />) : (
    <Fragment>
    <PageTitle title={`${user.name}'s Profile`} />
    <Container style={{ paddingTop: "200px" }}>
    <Row className="profileContainer">

        <Col> </Col>        

        <Col>
          <h4>Full Name</h4>
          <p>{user.name}</p>
          <div>
              <h4>Email</h4>
              <p>{user.email}</p>
          </div>

          <div>
              <h4>Joined On</h4>
              <p>{String(user.createdAt).substr(0, 10)}</p>
          </div>

          <div>
          <Button variant="info">

            <Link to="/orders" style={{ color: 'inherit', textDecoration: 'inherit'}}>My Orders</Link>

          </Button>

          {"   "}           

          

            <Button variant="success" >
              <Link to="/me/update" style={{ color: 'inherit', textDecoration: 'inherit'}}>Edit Profile</Link>
            </Button>                
                
          </div>
        </Col>

        <Col> </Col>

      </Row>
    </Container> 
    </Fragment>
  ) }
    </Fragment>);
}

export default Profile;

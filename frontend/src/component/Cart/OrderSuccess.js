import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';

const OrderSuccess=()=>
{
return (
  <>

    <h1 style={{ paddingTop: "160px" }} className="text-center">
      Your Order has been Placed successfully
    </h1>

    <Link style={{ textDecoration: "none" }} className="d-flex align-items-center justify-content-center flex-direction-column" to="/orders">
      <Button variant="secondary">
        View Orders
      </Button>
    </Link>

  </>
);
}

export default OrderSuccess;

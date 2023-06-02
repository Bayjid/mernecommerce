import React, { Fragment, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from "react-redux";
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import axios from "axios";
import PageTitle from "../layout/MetaData/PageTitle"
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useHistory } from "react-router";
import "./payment.css";
import { createOrder, clearErrors } from "../../actions/orderAction";




const Payment=()=>
{

  const history = useHistory();

  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
  const dispatch = useDispatch();
  const stripe = useStripe();
  const elements = useElements();
  const payBtn = useRef(null);

  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.loadUser);

  const paymentData = {
    amount: Math.round(orderInfo.totalPrice * 100),
  };

  const order = {
    shippingInfo,
    orderItems: cartItems,
    itemsPrice: orderInfo.subtotal,
    taxPrice: orderInfo.tax,
    shippingPrice: orderInfo.shippingCharges,
    totalPrice: orderInfo.totalPrice,
  };

  const submitHandler = async (e) => {

    e.preventDefault();
    payBtn.current.disabled = true;

    try {

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
    };

    const { data } = await axios.post(
      "/api/v1/payment/process",
      paymentData,
      config
    );

    console.log(data)

    const client_secret = data.client_secret;

    if (!stripe || !elements) return;

    const result = await stripe.confirmCardPayment(client_secret, {

      payment_method: {
        card: elements.getElement(CardNumberElement),
        billing_details: {
          name: user.name,
          email: user.email,
          address: {
            line1: shippingInfo.address,            
          },
        },
      },  

    });


    if (result.error) {
      payBtn.current.disabled = false;
      
    } else {
      if (result.paymentIntent.status === "succeeded") {
        order.paymentInfo = {
          id: result.paymentIntent.id,
          status: result.paymentIntent.status,
        };

        dispatch(createOrder(order));

        localStorage.clear();

        history.push("/success");
      } else {
        console.log("There's some issue while processing payment ");
      }
    }



  }
  catch (error) {
    payBtn.current.disabled = false;
    console.log(error.response.data.message);
  }

}

return (
  <Fragment>

      <Row style={{ paddingTop: "90px" }}>
        <Col md={4}></Col>

        <Col style={{  paddingTop: "80px" }} md={4} className="d-flex align-items-center justify-content-center flex-direction-column">

        

        

        <form style={{ width: "80%", maxWidth: 500, }}  onSubmit={(e) => submitHandler(e)}>

          <h3 style={{ paddingBottom: "25px" }} className="text-center">Card Info</h3>
          
          <div style={{ paddingBottom: "25px" }}>            
            <CardNumberElement  className="paymentInput" />
          </div>
          <div style={{ paddingBottom: "25px" }}>            
            <CardExpiryElement className="paymentInput" />
          </div>
          <div style={{ paddingBottom: "25px" }}>            
            <CardCvcElement className="paymentInput" />
          </div>

          <input
            type="submit"
            value={`Pay - ₹${orderInfo && orderInfo.totalPrice}`}
            ref={payBtn}
            className="paymentFormBtn"            
          />
        </form>

        

        </Col>

        <Col md={4}></Col>
      </Row>
      
      
      
    </Fragment>
);
}

export default Payment;

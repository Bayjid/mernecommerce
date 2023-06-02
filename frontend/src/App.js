import './App.css';
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import NavBar from './component/layout/NavBar/NavBar.jsx'
import Footer from './component/layout/Footer/Footer.js'
import Home from './component/Home/Home.js'
import ProductDetails from './component/Product/ProductDetails.js'
import Products from './component/Product/Products.js'
import Login from './component/Auth/Login.js'
import Register from './component/Auth/Register.js'
import Profile from './component/User/Profile.js'
import UpdateProfile from './component/User/UpdateProfile.js'
import temp from './component/Product/temp.js'
import Cart from './component/Cart/Cart'
import Shipping from './component/Cart/Shipping'
import ConfirmOrder from './component/Cart/ConfirmOrder'
import Payment from './component/Cart/Payment'
import MyOrders from "./component/Order/MyOrders";
import OrderList from "./component/Admin/OrderList";
import OrderSuccess from "./component/Cart/OrderSuccess";
import store from "./store";
import { loadUser } from "./actions/authAction";
import { useDispatch, useSelector } from "react-redux";
import ProtectedRoute from "./component/Route/ProtectedRoute";
import OrderDetails from "./component/Order/OrderDetails";
import ProductList from "./component/Admin/ProductList.js";
import NewProduct from "./component/Admin/NewProduct";
import UpdateProduct from "./component/Admin/UpdateProduct";
import axios from "axios";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import ProcessOrder from "./component/Admin/ProcessOrder";
import Dashboard from "./component/Admin/Dashboard.js";


function App() {

  const { isAuthenticated, user } = useSelector((state) => state.loadUser);

  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v1/stripeapikey");
    console.log(data.stripeApiKey)

    setStripeApiKey(data.stripeApiKey);
  }


  useEffect(() => {   

    store.dispatch(loadUser());
    getStripeApiKey();
    
  }, []);

  return (
    <Router>      
      <NavBar isAuthenticated = {isAuthenticated} user={user}/>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={ Register} />
        <Route exact path="/" component={Home} />        
        <Route exact path="/product/:id" component={ProductDetails} />
        <Route exact path="/products" component={Products} />
        <Route path="/products/:keyword" component={Products} />
        <Route path="/search" component={temp} />
        <Route path="/cart" component={Cart} />
        <ProtectedRoute exact path="/account" component={Profile} />
        <ProtectedRoute exact path="/me/update" component={UpdateProfile} />
        <ProtectedRoute exact path="/shipping" component={Shipping} />
        <ProtectedRoute exact path="/order/confirm" component={ConfirmOrder} />
        <ProtectedRoute exact path="/orders" component={MyOrders} />
        <ProtectedRoute exact path="/order/:id" component={OrderDetails} />
        <ProtectedRoute exact path="/success" component={OrderSuccess} />

        <ProtectedRoute
          isAdmin={true}
          exact
          path="/admin/dashboard"
          component={Dashboard}
        />

        <ProtectedRoute
          exact
          path="/admin/products"
          isAdmin={true}
          component={ProductList}
        />

        <ProtectedRoute
          exact
          path="/admin/product"
          isAdmin={true}
          component={NewProduct}
        />

        <ProtectedRoute
          exact
          path="/admin/product/:id"
          isAdmin={true}
          component={UpdateProduct}
        />

        <ProtectedRoute
          exact
          path="/admin/orders"
          isAdmin={true}
          component={OrderList}
        />

        <ProtectedRoute
          exact
          path="/admin/order/:id"
          isAdmin={true}
          component={ProcessOrder}
        />

        <ProtectedRoute
          exact
          path="/admin/order/:id"
          isAdmin={true}
          component={OrderDetails}
        />
        

        <Elements stripe={loadStripe('pk_test_51MYHZESFnYquGdvfHUS5QDfk0Yu7xkuoCRG8zkkEHgANYYIUXZEL2eLsUo5PQAl3QArtlDAP1bNXKesOMqrPadp600w2OSMi5l')}>
          <ProtectedRoute exact path="/process/payment" component={Payment} />
        </Elements>
      </Switch>
      
    </Router>
    
       
  );
}

export default App;

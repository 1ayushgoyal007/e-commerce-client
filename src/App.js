import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import { Container } from 'react-bootstrap';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import ShippingScreen  from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import UserListScreen from './screens/UserListScreen';
import ProductListScreen from './screens/ProductListScreen';
import ProductEditScreen from './screens/ProductEditScreen';
import OrderListScreen from './screens/OrderListScreen';
import VerifyScreen from './screens/VerifyScreen';

import {  Route, HashRouter as Router } from 'react-router-dom';



function App() {
  return (
    <Router>
    <Header />
    <main className="py-3" >
      <Container>
        <Route path="/order/:id" component={OrderScreen} />
        <Route path="/verifyAccount" component={VerifyScreen} />
        <Route path="/shipping" component={ShippingScreen} />
        <Route path="/payment" component={PaymentScreen} />
        <Route path="/placeorder" component = {PlaceOrderScreen} />
        <Route path="/login" component ={LoginScreen} />
        <Route path="/register" component ={RegisterScreen} />
        <Route path="/profile" component ={ProfileScreen} />
        <Route path="/product/:id" component ={ProductScreen} />
        <Route path="/cart/:id?" component={CartScreen} />
        <Route path="/admin/userlist" component={UserListScreen} />
        <Route path="/admin/productlist" component={ProductListScreen} exact/>
        <Route path="/admin/productlist/:pageNumber" component={ProductListScreen} exact />
        <Route path="/admin/orderlist" component={OrderListScreen} />
        <Route path="/admin/product/:id/edit" component={ProductEditScreen} />
        <Route path="/page/:pageNumber" component ={HomeScreen} exact />
        <Route path="/" component ={HomeScreen} exact />

      </Container>
    </main>
    <Footer />
    </Router>
  );
}

export default App;

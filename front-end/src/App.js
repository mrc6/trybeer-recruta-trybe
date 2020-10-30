import React from 'react';
import './App.css';
import {
  Switch,
  Route,
} from 'react-router-dom';
import BeerProvider from './context/context';

import Login from './components/Login';
import Profile from './components/Profile';
import Home from './components/Home';
import Products from './components/Products';
import UserRegisterPage from './pages/User-Register';
import Orders from './components/Orders';
import Checkout from './pages/CheckoutPage';
import OrderDetails from './components/OrderDetails';
import AdminOrders from './pages/AdminOrders';
import AdminProfilePage from './pages/AdminProfilePage';
import AdminOrderDetailPage from './pages/AdminOrderDetailPage';

function App() {
  return (
    <BeerProvider>
      <Switch>
        <Route path="/admin/orders/:id" component={ AdminOrderDetailPage } />
        <Route path="/admin/orders" component={ AdminOrders } />
        <Route path="/checkout" component={ Checkout } />
        <Route exact path="/login" component={ Login } />
        <Route exact path="/profile" component={ Profile } />
        <Route exact path="/products" component={ Products } />
        <Route exact path="/register" component={ UserRegisterPage } />
        <Route exact path="/orders" component={ Orders } />
        <Route exact path="/orders/:id" component={ OrderDetails } />
        <Route path="/admin/profile" component={ AdminProfilePage } />
        <Route exact path="/" component={ Home } />
      </Switch>
    </BeerProvider>

  );
}

export default App;

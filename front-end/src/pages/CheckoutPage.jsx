import React, { useState, useEffect, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import MenuTop from '../components/MenuTop';
import { BeerContext } from '../context/context';
import Checkout from '../components/Checkout';
import '../components/CSS/Checkout.css';

let validate;

function CheckoutPage() {
  const [redirectToLogin, setRedirectToLogin] = useState(false);
  const [receivedData, setReceivedData] = useState();
  const { setTitle } = useContext(BeerContext);
  const { token } = JSON.parse(localStorage.getItem('user')) || [];
  
  useEffect(() => {
    setTitle('Finalizar Pedido');
  });

  useEffect(() => {
    axios.get('http://localhost:3001/profile', {
      headers: {
        Authorization: token,
      },
    })
    .then((response) => {
      validate = response;
      if (validate) setReceivedData(true);
    })
    .catch((error) => {
        validate = error
        if (validate) setRedirectToLogin(true);
    });
  });

  return (
    <div className="checkoutPage">
      {
        redirectToLogin && <Redirect to="/login" />
      }
      <MenuTop />
      <Checkout />
    </div>
  );
}

export default CheckoutPage;

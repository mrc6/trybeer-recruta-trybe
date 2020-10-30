import React, { useEffect, useContext, useState } from 'react';
import axios from 'axios';
import { Redirect, Link } from 'react-router-dom';
import { BeerContext } from '../context/context';
import MenuTop from './MenuTop';
import './CSS/Orders.css';

const decimalNumbers = 2;

const getDate = (date) => {
  const minimum = 10;
  const fullDate = new Date(date).toISOString();
  const isoDate = new Date(fullDate);
  let month = isoDate.getMonth() + 1;
  if (month < minimum) { month = `0${month}`; }
  let day = isoDate.getDate();
  if (day < minimum) { day = `0${day}`; }
  return `${day}/${month}`;
};

function Orders() {
  const { setTitle, setOrderNumber, setOrderInfo } = useContext(BeerContext);
  const [redirectToLogin, setRedirectToLogin] = useState(false);
  const [purchasedProducts, setPurchasedProducts] = useState([]);
  const { token } = JSON.parse(localStorage.getItem('user')) || [];
  useEffect(() => {
    axios.get('http://localhost:3001/productList', {
      headers: {
        Authorization: token,
      },
    })
      .then((response) => setPurchasedProducts(response.data.products))
      .catch(() => { setRedirectToLogin(true); });
    setTitle('Meus Pedidos');
  }, [token, setTitle]);

  return (
    <div>
      <MenuTop />
      {redirectToLogin && <Redirect to="/login" />}
      <div className="purchases-container">
        {purchasedProducts.map(({ saleDate, totalPrice, id }, index) => (
          <Link key={ id } onClick={ () => { setOrderNumber(id); setOrderInfo({ date: getDate(saleDate), total: totalPrice }); } } to={ `/orders/${id}` }>
            <div className="purchases-card" data-testid={ `${index}-order-card-container` }>
              <p data-testid={ `${index}-order-number` }>{`Pedido ${id}`}</p>
              <p data-testid={ `${index}-order-total-value` }>{`R$ ${Number(totalPrice).toFixed(decimalNumbers).replace('.', ',')}`}</p>
              <p data-testid={ `${index}-order-date` }>{`${getDate(saleDate)}`}</p>
            </div>
          </Link>))}
      </div>
    </div>
  );
}

export default Orders;

// https://stackoverflow.com/questions/14046080/how-to-convert-date-in-milliseconds-to-iso-format-javascript

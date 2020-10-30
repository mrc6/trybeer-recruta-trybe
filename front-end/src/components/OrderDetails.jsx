import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { BeerContext } from '../context/context';
import MenuTop from './MenuTop';
import './CSS/OrderDetails.css'

const decimal = 2;

function OrderDetails() {
  const { orderNumber, setTitle, orderInfo } = useContext(BeerContext);
  const [redirectToLogin, setRedirectToLogin] = useState(false);

  const [orderDetails, setOrderDetails] = useState([]);
  const { token } = JSON.parse(localStorage.getItem('user')) || [];

  useEffect(() => {
    setTitle('Detalhes de Pedido');
    axios.get(`http://localhost:3001/orderDetails/${orderNumber}`, {
      headers: {
        Authorization: token,
      },
    })
      .then((response) => setOrderDetails(response.data.details))
      .catch(() => { setRedirectToLogin(true); });
  }, [orderNumber, setTitle, token]);
  return (
    <div>
      <MenuTop />
      {!orderNumber && <Redirect to="/orders" />}
      {redirectToLogin && <Redirect to="/login" />}
      <div className="order-details">
        <div>
          <h3 data-testid="order-number">{`Pedido ${orderNumber}`}</h3>
          <h3 data-testid="order-date">Data do Pedido {orderInfo.date}</h3>
        </div>
        <table>
          <thead>
            <tr>
              <th>Quantidade</th>
              <th>Produto</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {orderDetails.map(({ name, quantity, price }, index) => (
              <tr key={name}>
                <td data-testid={`${index}-product-qtd`}>{`${quantity}`}</td>
                <td data-testid={`${index}-product-name`}>{name}</td>
                <td data-testid={`${index}-product-total-value`}>{`R$ ${(quantity * price).toFixed(decimal).replace('.', ',')}`}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <h3 data-testid="order-total-value">{`Valor total: R$ ${Number(orderInfo.total).toFixed(decimal).replace('.', ',')}`}</h3>
      </div>
    </div>
  );
}

export default OrderDetails;

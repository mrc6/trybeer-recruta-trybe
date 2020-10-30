import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './style/OrdersAdmin.css';

const cardOrders = (orders) => (
  orders.map(({ id, numberDelivery, addressDelivery, totalPrice, status }, i) => (
    <Link key={id} to={`/admin/orders/${id}`}>
      <div className="orders-admin" >
        <p data-testid={`${i}-order-number`}>{`Pedido ${id}`}</p>
        <p data-testid={`${i}-order-address`}>{addressDelivery}, {numberDelivery}</p>
        <p data-testid={`${i}-order-total-value`}>R$ {totalPrice.toFixed(2).replace('.', ',')}</p>
        <label data-testid={`${i}-order-status`}>{status}</label>
      </div>
    </Link>
  ))
);

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:3001/adminOrders').then(({ data }) => setOrders(data));
  }, []);

  return (
    <div>
      <h1 className="title">Pedidos</h1>
      {cardOrders(orders)}
    </div>
  );
}

export default AdminOrders;

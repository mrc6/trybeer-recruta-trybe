import React from 'react';
import AdminChangeStatusOrderAPI from '../services/AdminOrderChangeStatusService';
import './CSS/AdminOrderDetail.css';

const adminOrderDetail = ({Children, OrderNumber, StatusChanged}) => {
  let disableBtn = false;
  const changeOrderStatus = async () => {
    const response = await AdminChangeStatusOrderAPI(OrderNumber);
    if (response) {
      if (response.status === 202)
        StatusChanged(true);
        console.log('Pedido atualizado!');
    }
  };

  if (!Children.orderProducts.length) {
    return (<div>Order Not Found!</div>);
  }

  return (
    <div className="orderContainer">
      { Children &&
      <div className="orderDetailCard">
        <div>
          <span data-testid="order-number">Pedido {OrderNumber}</span> - <span data-testid="order-status">{Children.orderStatus[0].status}</span>
        </div>
        <div>
          <table className="list-container">
            <tbody>
              <tr>
                <th>Qtd</th>
                <th>Nome</th>
                <th>Valor total</th>
                <th>Valor unitário</th>
              </tr>
              {Children.orderProducts.map((e, i) =>
                <tr key={e.name}><td data-testid={`${i}-product-qtd`}>{e.quantity}</td>
                  <td data-testid={`${i}-product-name`}>{e.name}</td>
                  <td data-testid={`${i}-product-total-value`}>{`R$ ${(e.quantity*e.price).toFixed(2).replace('.',',')}`}</td>
                  <td data-testid={`${i}-order-unit-price`}>{`(R$ ${(e.price).toFixed(2).replace('.',',')})`}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div data-testid="order-total-value">
          {
          `Total R$ ${(Children.orderProducts.reduce(((acc, e) =>
              acc = e.price * e.quantity), 0)).toFixed(2).replace('.',',')}`
          }
        </div>{ (Children.orderStatus[0].status === 'Entregue') ? disableBtn = true : disableBtn = false }
        <div>
          { !disableBtn &&
            <button
              className="btn"
              data-testid="mark-as-delivered-btn" onClick={() => changeOrderStatus()}
            >Marcar como entregue</button>
          }
        </div>
      </div>
      }
    </div>
  );
};

export default adminOrderDetail;

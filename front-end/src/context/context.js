import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

export const BeerContext = createContext();

const BeerProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [title, setTitle] = useState('');
  const [orderNumber, setOrderNumber] = useState(null);
  const [orderInfo, setOrderInfo] = useState({});
  const [statusChanged, setStatusChanged] = useState(false);

  const context = {
    cart,
    setCart,
    title,
    setTitle,
    orderNumber,
    setOrderNumber,
    orderInfo,
    setOrderInfo,
    statusChanged,
    setStatusChanged,
  };

  return (
    <BeerContext.Provider value={ context }>
      {children}
    </BeerContext.Provider>
  );
};

BeerProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default BeerProvider;

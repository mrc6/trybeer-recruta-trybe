import axios from 'axios';

const headers = {
  'Content-Type': 'application/json',
};

const SaleOrderAPI = (
  userId,
  totalPrice,
  deliveryAddress,
  deliveryDistrict,
  deliveryCity,
  deliveryNumber,
  saleDate,
  status,
  store,
) => axios.post('http://localhost:3001/checkout',
  {
    userId,
    totalPrice,
    deliveryAddress,
    deliveryDistrict,
    deliveryCity,
    deliveryNumber,
    saleDate,
    status,
    store,
  },
  headers)
  .then((res) => res)
  .catch((error) => error);

export default SaleOrderAPI;

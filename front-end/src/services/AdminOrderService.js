import axios from 'axios';

const headers = {
  'Content-Type': 'application/json',
};

const AdminDetailOrderAPI = (id) => axios.get(`http://localhost:3001/admin/orders/${id}`,
  {
    id,
  },
  headers)
  .then((res) => res)
  .catch((error) => error);

export default AdminDetailOrderAPI;

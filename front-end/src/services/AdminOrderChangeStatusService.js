import axios from 'axios';

const headers = {
  'Content-Type': 'application/json',
};

const AdminChangeStatusOrderAPI = (id) => axios.put(`http://localhost:3001/admin/orders/${id}`,
  {
    id,
  },
  headers)
  .then((res) => res)
  .catch((error) => error);

export default AdminChangeStatusOrderAPI;

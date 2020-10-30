import React from 'react';
import AdminSideBar from '../components/AdminSideBar';
import AdminOrders from '../components/AdminOrders';
import AdminTopBar from '../components/AdminTopBar';

function AdminOrdersPage () {
  return (
    <div>
      <AdminTopBar />
      <AdminSideBar Children = { <AdminOrders />}/>
    </div>
  );
}

export default AdminOrdersPage;

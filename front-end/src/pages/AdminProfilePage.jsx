import React from 'react';
import AdminProfile from '../components/AdminProfile';
import AdminSideBar from '../components/AdminSideBar';
import AdminTopBar from '../components/AdminTopBar';

function AdminProfilePage () {
  return (
    <div>
      <AdminTopBar />
      <AdminSideBar Children={<AdminProfile />}/>
    </div>
  );
}

export default AdminProfilePage;

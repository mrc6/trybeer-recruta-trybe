import React, { useEffect, useState, useContext } from 'react';
import { BeerContext } from '../context/context';
import { useParams } from 'react-router-dom';
import AdminOrderDetail from '../components/AdminOrderDetail';
import AdminSideBar from '../components/AdminSideBar';
import AdminTopBar from '../components/AdminTopBar';
import AdminOrderDetailAPI from '../services/AdminOrderService'

function AdminOrderDetailPage () {
  const { statusChanged, setStatusChanged } = useContext(BeerContext);
  const { id } = useParams();
  let data;
  const [received, setReceived] = useState();

  useEffect(() => {
    AdminOrderDetailAPI(id)
    .then((response) => {
      if (response.status === 200) {
        // data = response.data;
        setReceived(response.data);
      }
    })
    .catch((error) => error); 
  }, []);

  useEffect(() => {
    AdminOrderDetailAPI(id)
    .then((response) => {
      if (response.status === 200) {
        // data = response.data;
        setReceived(response.data);
      }
    })
    .catch((error) => error); 
  }, [statusChanged]);

    if (received) {
      return (
        <div>
          <AdminTopBar />
          <AdminSideBar Children=
          {
            <AdminOrderDetail Children={received} OrderNumber={id} StatusChanged={setStatusChanged} />
          }
        />
        </div>
      );
    }
    else return (<div></div>);
  
}

export default AdminOrderDetailPage;

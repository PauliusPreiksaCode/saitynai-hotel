import './App.css';
import * as React from 'react';
import { Routes, Route } from 'react-router-dom';
import { PrivateRoute } from './components/privateRoute';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Orders from './pages/orders/Orders';
import ClientRegister from './pages/register/ClientRegister';
import PersonelRegister from './pages/register/PersonelRegister';
import HotelOrders from './pages/orders/HotelOrders';


const App = () => {
  return (
    <Routes>
      <Route exact path="/" element={<Home />}
      />
      {/* <Route path="/user-panel" element=
          {
            <PrivateRoute accessLevel={['0', '1', '2']}>
              <UserPanel />
            </PrivateRoute>
          } 
        /> */}
        <Route path="/login" element={<Login />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/hotelOrders" element={<HotelOrders />} />
        <Route path='/registerClient' element={<ClientRegister />} />
        <Route path='/registerPersonel' element={<PersonelRegister />} />

    </Routes>
  );
}

export default App;
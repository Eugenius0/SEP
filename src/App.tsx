import React, { createContext, useState } from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/login/login';
import EventRequest from './pages/eventRequest/eventRequest';
import Navbar from './components/navbar';

export const UserContext = createContext({ userRole: '', setUserRole: (role: string) => {} });

export default function App() {
  const [userRole, setUserRole] = useState('')
  
  return (
    <UserContext.Provider value={{ userRole, setUserRole }}>
    <div className='App'>
      <BrowserRouter>
      <Navbar />
        <div className='pages'>
          <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/login' element={<Login />} />
            <Route path='/eventRequest' element={<EventRequest />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
    </UserContext.Provider>
  );
}

import { Routes , Route } from 'react-router-dom'
// Admin page
import AdminPage from './pages/Admin/Admin'
// Client page
import ClientPage from './pages/Client/Client'

import { isTokenValid, getUsernameFromToken } from './Token';

import { useState } from 'react';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [userInfo, setUserInfo] = useState({
    isAuthenticated : isTokenValid(),
    username: getUsernameFromToken(),
  })
  return (
    <div className="App">
      <ClientPage userInfo={userInfo} setUserInfo={setUserInfo}/>
      {/*<AdminPage/>*/}
       <ToastContainer position="top-center" autoClose={2000} />
    </div>
  )
}
export default App; 
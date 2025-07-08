import { Routes, Route } from 'react-router-dom'
import AdminPage from './pages/Admin/Admin'
import ClientPage from './pages/Client/Client'
import * as Token from './util/Token';
import AdminRoute from './components/AdminRoute';
import { ToastContainer } from 'react-toastify';
import { useState, useEffect } from 'react';

import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [userInfo, setUserInfo] = useState({
    isAuthenticated: Token.isTokenValid(),
    username: Token.getUsernameFromToken(),
  })

  useEffect(() => {
    Token.checkAndClearToken();
  }, []);

  return (
    <div className="App">
      <ToastContainer position="top-center" autoClose={600} />
      <Routes>
        <Route path='/*' element={<ClientPage userInfo={userInfo} setUserInfo={setUserInfo} />} />
        <Route path="/admin/*" element={<AdminRoute> <AdminPage /> </AdminRoute>} />

      </Routes>
    </div>
  )
}
export default App; 
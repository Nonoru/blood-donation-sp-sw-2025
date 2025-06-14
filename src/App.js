import { Routes , Route } from 'react-router-dom'
// Admin page
import AdminPage from './pages/Admin/Admin'
// Client page
import ClientPage from './pages/Client/Client'

import { isTokenValid, getUsernameFromToken } from './Token';

import { useState } from 'react';

import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [userInfo, setUserInfo] = useState({
    isAuthenticated : isTokenValid(),
    username: getUsernameFromToken(),
  })
  return (
    <div className="App">
      <Routes>
        <Route path='/*' element={<ClientPage userInfo={userInfo} setUserInfo={setUserInfo}/>}/>
        <Route path='/admin/*' element={<AdminPage/>}/>
      </Routes>
    </div>
  )
}
export default App; 
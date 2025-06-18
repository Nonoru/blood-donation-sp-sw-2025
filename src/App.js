import { Routes , Route } from 'react-router-dom'
import AdminPage from './pages/Admin/Admin'
import ClientPage from './pages/Client/Client'
import * as Token from './util/Token';
import AdminRoute from './components/AdminRoute';

import { useState } from 'react';

import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [userInfo, setUserInfo] = useState({
    isAuthenticated : Token.isTokenValid(),
    username: Token.getUsernameFromToken(),
  })

  return (
    <div className="App">
      <Routes>
        <Route path='/*' element={<ClientPage userInfo={userInfo} setUserInfo={setUserInfo}/>}/>
        <Route path="/admin/*" element={ <AdminRoute> <AdminPage /> </AdminRoute>}/>
        
      </Routes>
    </div>
  )
}
export default App; 
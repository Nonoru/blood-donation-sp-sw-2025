import { Routes , Route } from 'react-router-dom'
import Header from '../Client/pages/Header'
import HomePage from '../Client/pages/Home'
import BlogPage from '../Client/pages/Blog'
import DocPage from '../Client/pages/Doc'
import Auth from '../Client/pages/Auth'
import { ToastContainer } from 'react-toastify';


import './Client.scss'
function Client ({userInfo, setUserInfo}) {
    return(
        <div className="client-page">
            <ToastContainer position="top-center" autoClose={2000} />
            <Header userInfo={userInfo} setUserInfo={setUserInfo}/>
            <Routes>
            <Route path='/' element={<HomePage/>}/>
            <Route path='/blog' element={<BlogPage/>}/>
            <Route path='/doc' element={<DocPage/>}/>
            <Route path='/login' element={<Auth userInfo={userInfo} setUserInfo={setUserInfo}/>}/>
            </Routes>
        </div>
    )
}
export default Client
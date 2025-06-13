import { Routes , Route } from 'react-router-dom'
import Header from '../Client/pages/Header'
import HomePage from '../Client/pages/Home'
import BlogPage from '../Client/pages/Blog'
import DocPage from '../Client/pages/Doc'
import Auth from '../Client/pages/Auth'
import FeaturesPage from '../Client/features/main/Features'
import DonateBlood from '../Client/features/subs/DonateBlood'
import ReceiveBlood from '../Client/features/subs/ReceiveBlood'
import OrderHistory from '../Client/features/subs/OrderHistory'
import GiftExchange from '../Client/features/subs/GiftExchange'
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
                <Route path='/feature' element={<FeaturesPage/>}/>
                <Route path='/feature/donate-blood' element={<DonateBlood/>}/>
                <Route path='/feature/receive-blood' element={<ReceiveBlood/>}/>
                <Route path='/feature/order-history' element={<OrderHistory/>}/>
                <Route path='/feature/gift-exchange' element={<GiftExchange/>}/>
            </Routes>
        </div>
    )
}
export default Client
import { Routes, Route } from 'react-router-dom'
import Header from '../Client/pages/Header'
import HomePage from '../Client/pages/Home'
import BlogPage from '../Client/pages/Blog'
import Blog1 from '../Client/pages/Blog1'
import Blog2 from '../Client/pages/Blog2'
import Blog3 from '../Client/pages/Blog3'
import Blog4 from '../Client/pages/Blog4'
import Blog5 from '../Client/pages/Blog5'
import Blog6 from '../Client/pages/Blog6'
import DocPage from '../Client/pages/Doc'
import Doc1 from '../Client/pages/Doc1'
import Doc2 from '../Client/pages/Doc2'
import Doc3 from '../Client/pages/Doc3'
import Auth from '../Client/pages/Auth'
import FeaturesPage from '../Client/features/main/Features'
import DonateBlood from '../Client/features/subs/DonateBlood'
import ReceiveBlood from '../Client/features/subs/ReceiveBlood'
import OrderHistory from '../Client/features/subs/OrderHistory'
import GiftExchange from '../Client/features/subs/GiftExchange'
import ErrorPage from '../Client/pages/ErrorPage'
import Chatbot from '../Client/pages/Chatbot'
import ChangePassword from './pages/ChangePassword'
import ForgotPassword from './pages/ForgotPassword'
import { ToastContainer } from 'react-toastify';
import './Client.scss'


function Client({ userInfo, setUserInfo }) {
    return (
        <div className="client-page">
            <ToastContainer position="top-center" autoClose={600} />
            <Header userInfo={userInfo} setUserInfo={setUserInfo} />
            <Routes>
                <Route path='/' element={<HomePage />} />
                <Route path='/blog' element={<BlogPage />} />
                <Route path='/doc' element={<DocPage />} />
                <Route path='/login' element={<Auth userInfo={userInfo} setUserInfo={setUserInfo} />} />
                <Route path='/feature' element={<FeaturesPage />} />
                <Route path='/feature/donate-blood' element={<DonateBlood />} />
                <Route path='/feature/receive-blood' element={<ReceiveBlood />} />
                <Route path='/feature/order-history' element={<OrderHistory />} />
                <Route path='/feature/gift-exchange' element={<GiftExchange />} />
                <Route path='/blog/1' element={<Blog1 />} />
                <Route path='/blog/2' element={<Blog2 />} />
                <Route path='/blog/3' element={<Blog3 />} />
                <Route path='/blog/4' element={<Blog4 />} />
                <Route path='/blog/5' element={<Blog5 />} />
                <Route path='/blog/6' element={<Blog6 />} />
                <Route path='/doc/1' element={<Doc1 />} />
                <Route path='/doc/2' element={<Doc2 />} />
                <Route path='/doc/3' element={<Doc3 />} />
                <Route path='/change-pass' element={<ChangePassword />} />
                <Route path='/forgot-password' element={<ForgotPassword />} />
                <Route path='*' element={<ErrorPage />} />
            </Routes>
            <Chatbot />
        </div>
    )
}
export default Client
import { Routes, Route } from 'react-router-dom'
import ManageAccountRoute from './components/ManageAccountRoute';
import AdminMenu from './pages/AdminMenu';
import AdminStatistic from './pages/AdminStatistic';
import AdminManageAccount from './pages/AdminManageAccount';
import ForBidden from './pages/ForBidden';
import OrderBloodDonation from './pages/OrderBloodDonation';
import Clinic from './pages/Clinic';
import OrderDateDonation from './pages/OrderDateDonation';
import OrderBloodDonationAccept from './pages/OrderBloodDonationAccept'
import * as Token from '../../util/Token';
import { ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import './Admin.scss'
import OrderBloodDonationHistory from './pages/OrderBloodDonationHistory';
import OrderBloodReceiving from './pages/OrderBloodReceiving';
import OrderBloodReceivingAccept from './pages/OrderBloodReceivingAccept';
import OrderBloodReceivingHistory from './pages/OrderBloodReceivingHistory';
function AdminPage() {
    const navigate = useNavigate();
    const goToHome = () => {
        navigate('/');
    }
    return (
        <div className="admin-page">
            <div className='user-info'>
                <div className='user-name'>
                    Xin chào {Token.getFullName()}!
                </div>
                <div className='user-role'>
                    Vai trò {Token.getUserRole()}!
                </div>
                <button className='' onClick={() => goToHome()}>
                    Quay về trang chủ
                </button>
            </div>
            <ToastContainer position="top-right" autoClose={1500} />
            <AdminMenu />
            <Routes>
                <Route path='/' element={<AdminStatistic />} />
                <Route path='/accounts' element={<ManageAccountRoute><AdminManageAccount /></ManageAccountRoute>} />
                <Route path='/manage/clinics' element={<Clinic />} />
                <Route path='/manage/schedules' element={<OrderDateDonation />} />
                <Route path='/orders/donate' element={<OrderBloodDonation />} />
                <Route path='/orders/donate/accept' element={<OrderBloodDonationAccept />} />
                <Route path='/orders/donate/history' element={<OrderBloodDonationHistory />} />
                <Route path='/orders/receive' element={<OrderBloodReceiving />} />
                <Route path='/orders/receive/accept' element={<OrderBloodReceivingAccept />} />
                <Route path='/orders/receive/history' element={<OrderBloodReceivingHistory />} />
                <Route path='/for-bidden' element={<ForBidden />} />
            </Routes>
        </div>
    )
}
export default AdminPage
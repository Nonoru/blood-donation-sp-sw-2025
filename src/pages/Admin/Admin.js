import { Routes , Route } from 'react-router-dom'
import ManageAccountRoute from './components/ManageAccountRoute';
import AdminMenu from './pages/AdminMenu';
import AdminStatistic from './pages/AdminStatistic';
import AdminManageAccount from './pages/AdminManageAccount';
import ForBidden from './pages/ForBidden';
import { ToastContainer } from 'react-toastify';
import './Admin.scss'
function AdminPage(){
    return(
        <div className="admin-page">
            <ToastContainer position="top-right" autoClose={2000} />
            <AdminMenu/>
            <Routes>
                <Route path='/' element={<AdminStatistic/>}/>
                <Route path='/account/manage' element={<ManageAccountRoute><AdminManageAccount/></ManageAccountRoute>}/>
                <Route path='/for-bidden' element={<ForBidden/>}/>
            </Routes>
        </div>
    )
}
export default AdminPage
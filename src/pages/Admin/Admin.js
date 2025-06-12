import { Routes , Route } from 'react-router-dom'
import AdminMenu from './pages/AdminMenu';
import AdminStatistic from './pages/AdminStatistic';
import AdminManageAccount from './pages/AdminManageAccount';
import { ToastContainer } from 'react-toastify';
import './Admin.scss'
function AdminPage(){
    return(
        <div className="admin-page">
            <ToastContainer position="top-right" autoClose={2000} />
            <AdminMenu/>
            <Routes>
                <Route path='/statistic' element={<AdminStatistic/>}/>
                <Route path='/account/manage-accounts' element={<AdminManageAccount/>}/>
            </Routes>
        </div>
    )
}
export default AdminPage
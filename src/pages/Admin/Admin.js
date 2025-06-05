import { Routes , Route } from 'react-router-dom'
import AdminMenu from './pages/AdminMenu';
import AdminStatistic from './pages/AdminStatistic';
import AdminListAccount from './pages/AdminListAccount';
import './Admin.scss'
function AdminPage(){
    return(
        <div className="admin-page">
            <AdminMenu/>
            <Routes>
                <Route path='/statistic' element={<AdminStatistic/>}/>
                <Route path='/account/list-accounts' element={<AdminListAccount/>}/>
            </Routes>
        </div>
    )
}
export default AdminPage
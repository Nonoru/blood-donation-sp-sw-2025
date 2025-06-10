import { Routes , Route } from 'react-router-dom'
import Header from '../Client/pages/Header'
import HomePage from '../Client/pages/Home'
import BlogPage from '../Client/pages/Blog'
import DocPage from '../Client/pages/Doc'
import Auth from '../Client/pages/Auth'

import './Client.scss'
function Client () {
    return(
        <div className="client-page">
            <Header/>
            <Routes>
            <Route path='/' element={<HomePage/>}/>
            <Route path='/blog' element={<BlogPage/>}/>
            <Route path='/doc' element={<DocPage/>}/>
            <Route path='/login' element={<Auth/>}/>
            </Routes>
        </div>
    )
}
export default Client
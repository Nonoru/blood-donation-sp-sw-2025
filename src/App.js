import { Routes , Route } from 'react-router-dom'
import Header from './pages/Header/Header'
import HomePage from './pages/Body/Home/Home'
import BlogPage from './pages/Body/Blog/Blog'
import DocPage from './pages/Body/Doc'
import LoginPage from './pages/Body/User/Login/Login'
import Register from './pages/Body/User/Register/Register'

function App() {
  return (
    <div className="App">
      <Header/>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/blog' element={<BlogPage/>}/>
        <Route path='/doc' element={<DocPage/>}/>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/register' element={<Register/>}/>
      </Routes>
    </div>
  )
}
export default App;

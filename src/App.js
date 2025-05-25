import { Routes , Route } from 'react-router-dom'
import Header from './components/Header/Header'
import HomePage from './components/Main/Home/Home'
import BlogPage from './components/Main/Blog'
import DocPage from './components/Main/Doc'
import LoginPage from './components/Main/User/Login'
import Footer from './components/Footer/Footer'

function App() {
  return (
    <div className="App">
      <Header/>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/blog' element={<BlogPage/>}/>
        <Route path='/doc' element={<DocPage/>}/>
        <Route path='/login' element={<LoginPage/>}/>
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;

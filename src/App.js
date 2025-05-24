import { Routes , Route } from 'react-router-dom'
import Header from './components/Header/Header'
import HomePage from './components/Main/Home'
import BlogPage from './components/Main/Blog'
import DocPage from './components/Main/Doc'
import Footer from './components/Footer/Footer'

function App() {
  return (
    <div className="App">
      <Header/>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/blog' element={<BlogPage/>}/>
        <Route path='/doc' element={<DocPage/>}/>
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;

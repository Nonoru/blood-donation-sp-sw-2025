import { Routes , Route } from 'react-router-dom'
// Admin page
import AdminPage from './pages/Admin/Admin'
// Client page
import ClientPage from './pages/Client/Client'

function App() {
  return (
    <div className="App">
      <ClientPage/>
      {/*<AdminPage/>*/}
    </div>
  )
}
export default App; 
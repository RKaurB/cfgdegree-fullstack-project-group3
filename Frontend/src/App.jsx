import {BrowserRouter, Routes, Route} from 'react-router-dom'
import NavBar from './components/Navbar'
import Footer from './components/Footer'
import LandingPage from './pages/LandingPage'
import DashboardPage from './pages/DashboardPage'
import SchedulePage from './pages/SchedulePage'
import SearchPage from './pages/SearchPage'
import

function App(){
  return (
  <BrowserRouter>
  <NavBar></NavBar>
  <Routes>
    <Route path="/" element={<LandingPage />} />
    <Route path="/schedule" element={<SchedulePage />} />
    <Route path="/search" element={<SearchPage />} />
    <Route path="/dashboard" element={<DashboardPage />} />
  </Routes>
  <Footer></Footer>
  </BrowserRouter>)
}
export default App

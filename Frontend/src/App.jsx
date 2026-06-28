import {BrowserRouter, Routes, Route} from 'react-router-dom'
import NavBar from './components/Navbar'
import Footer from './components/Footer'
import LandingPage from './pages/LandingPage'
import DashboardPage from './pages/DashboardPage'
import SchedulePage from './pages/SchedulePage'
import SearchPage from './pages/SearchPage'
import {Provider} from 'react-redux'
import { store } from './Store'
import { ProtectRoutes } from './components/ProtectedRoutes'

function App(){
  return (
  <Provider store={store}>
    <BrowserRouter>
      <NavBar></NavBar>
      <main>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/schedule" element={<ProtectRoutes><SchedulePage /></ProtectRoutes>} />
          <Route path="/search" element={<ProtectRoutes><SearchPage /></ProtectRoutes>} />
          <Route path="/dashboard" element={<ProtectRoutes><DashboardPage /></ProtectRoutes>} />
        </Routes>
        </main>
      <Footer></Footer>
    </BrowserRouter>
  </Provider>)
}
export default App

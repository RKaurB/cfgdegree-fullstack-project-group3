import { Link } from 'react-router-dom'

function NavBar() {
    return <nav className="navbar navbar-expand">
        <div className="container-fluid">
        <a href="/home" className="navbar-brand">Garden Buddy</a>
        <div className="navbar-nav ms-auto">
        <a href="#auth-section" className="nav-link">Login</a>
        <a href="#auth-section" className="nav-link">Register</a>
        </div>
        </div>
        </nav>
}

export default NavBar
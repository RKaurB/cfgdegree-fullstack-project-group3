import { Link } from 'react-router-dom'

function NavBar() {
    return <nav className="navbar navbar-expand">
        <div className="container-fluid">
        <Link to="/home" className="navbar-brand">Garden Buddy</Link>
        <div className="navbar-nav ms-auto">
        <Link to="/login" className="nav-link">Login</Link>
        <Link to="/register" className="nav-link">Register</Link>
        </div>
        </div>
        </nav>
}

export default NavBar
import { useSelector } from "react-redux";

function NavBar() {
  const username = useSelector((state) => state.user.username);

  return (
    <nav className="navbar navbar-expand">
      <div className="container-fluid">
        <a href="/login" className="navbar-brand">
          Garden Buddy
        </a>
        <div className="navbar-nav ms-auto">
          {username ? (
            <span className="nav-link">
              Welcome to your garden, {username}!
            </span>
          ) : (
            <>
              <a href="#auth-section" className="nav-link">
                Login
              </a>
              <a href="#auth-section" className="nav-link">
                Register
              </a>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default NavBar;

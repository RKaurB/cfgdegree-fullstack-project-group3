import { useSelector, useDispatch } from "react-redux";
import { clearUserInfo } from "../feature/UserSlice";
import { useNavigate } from "react-router-dom";
import logo from "../assets/plant.png";

function NavBar() {
  const username = useSelector((state) => state.user.username);
  const dispatch = useDispatch();
  const nav = useNavigate();

  function handleSignOut() {
    dispatch(clearUserInfo());
    nav("/");
  }

  return (
    <nav className="navbar navbar-expand">
      <div className="container-fluid">
        <a href="/" className="navbar-brand">
            Garden Buddy
          <img
            src={logo}
            alt="Garden Buddy logo"
            style={{ width: "30px", marginLeft: "8px" }}
          />
        </a>
        <div className="navbar-nav ms-auto">
          {username ? (
            <>
              <span className="nav-link">
                Welcome to your garden, {username}!
              </span>
              <button
                onClick={handleSignOut}
                className="nav-link btn btn-link ms-3"
              >
                Sign Out
              </button>
            </>
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

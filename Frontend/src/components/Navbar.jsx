import { useSelector, useDispatch } from "react-redux";
import { clearUserInfo } from "../feature/UserSlice";
import { SignOutAPI } from "../api/AuthAPI";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import logo from "../assets/plant.png";

function NavBar() {
  const username = useSelector((state) => state.user.username);
  const dispatch = useDispatch();
  const nav = useNavigate();
  function handleSignOut() {
    SignOutAPI().then(async (res)=>{
      if(res.ok){
          dispatch(clearUserInfo());
          nav("/");
      }else{
        alert("Fail To SignOut")
      }
    })

  }  

  return (
    <nav className="navbar navbar-expand">
      <div className="container-fluid">
        <a className="navbar-brand">
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
                onClick={()=>{nav("/dashboard");}}
                className="nav-link btn btn-link ms-3"
              >
                Dashboard
              </button>
              <button
                onClick={()=>{nav("/search");}}
                className="nav-link btn btn-link ms-3"
              >
                Search Plant
              </button>

              <button
                onClick={()=>{nav("/schedule");}}
                className="nav-link btn btn-link ms-3"
              >
                Care-Schedule
              </button>
              <button
                onClick={handleSignOut}
                className="nav-link btn btn-link ms-3"
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <a href="/#login-section" className="nav-link">
                Login
              </a>
              <a href="/#register-section" className="nav-link">
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

import Button from "../components/Button";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useNavigate } from "react-router-dom";
import { faLeaf, faSeedling, faCalendarDays } from '@fortawesome/free-solid-svg-icons'
import { useDispatch } from "react-redux";
import {updateUserInfo} from "../feature/UserSlice"
let url = "http://localhost:3000/"


function LandingPage() {
  const dispatch = useDispatch()
  const nav = useNavigate()
  async function Login(email,pass){
    let fullUrl = `${url}login`
      let res = await fetch(fullUrl,{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
          email:email,
          password:pass
        })
      }
    );
    return res;
  }
  async function handleSubmitLogin(e){
      e.preventDefault();
      const formData = new FormData(e.target);
      Login(formData.get("email"),formData.get("password")).then(async (res)=>{
        let data = await res.json()
        console.log(data)
        if(res.status == 200){
          
          let input ={
            email:data.email,
            id: data.UID,
            username:data.name
          }
          dispatch(updateUserInfo(input))
          alert("Login Successfull")
          nav("/dashboard")
          return

        }
        alert("Login Failed")

      });

  }






  return (
    <div className="p-4">
      <div className="hero">
        <h1>Garden Buddy</h1>
        <p>
          Your personal garden planner — discover plants, build your garden and
          never miss a watering day.
        </p>
      </div>

      <div className="container mt-4 p-4" id="features-section">
        <div className="row">
            <div className="col">
                <FontAwesomeIcon icon={faLeaf} style={{fontSize: '48px'}}/>
                <h5>Discover Plants</h5>
                <p>Search and explore thousands of plants to find the perfect ones for your garden.</p>
            </div>
            <div className="col">
                <FontAwesomeIcon icon={faSeedling} style={{fontSize: '48px'}}/>
                <h5>Build Your Garden</h5>
                <p>Save your favourite plants and create your own personalised garden collection.</p>

            </div>
            <div className="col">
                <FontAwesomeIcon icon={faCalendarDays} style={{fontSize: '48px'}}/>
                <h5>Never Miss a Watering Day</h5>
                <p>Get auto-generated care schedules and track your gardening tasks with ease.</p>
            </div>

        </div>
      </div>

      <div className="container" id="auth-section">
        <div className="row mt-5 justify-content-center">
          <div className="col auth-form h-100">
            <form onSubmit={handleSubmitLogin}>
                <h2>Login</h2>
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Type your email"
                  className="form-control mb-2"
                  required
                />
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Type your password"
                  className="form-control mb-2"
                  required
                />
                <Button text="Submit" color="btn-garden-dark" />
            </form>
          </div>
          <div className="col auth-form h-100">
            <form action="">
                <h2>Register</h2>
                <label>Name</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Type your name"
                  className="form-control mb-2"
                  required
                />
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  id="email1"
                  placeholder="Type your email"
                  className="form-control mb-2"
                  required
                />
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  id="password1"
                  placeholder="Type a new password"
                  className="form-control mb-2"
                  required
                />
                <label>Confirm your password</label>
                <input
                  type="password"
                  name="password"
                  id="password2"
                  placeholder="Confirm your new password"
                  className="form-control mb-2"
                  required
                />
                <Button text="Submit" color="btn-garden-dark" />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;

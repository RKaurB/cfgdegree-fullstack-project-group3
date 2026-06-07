import Button from "../components/Button"

function LandingPage() {
        return (<div className="p-4">
            <div className="hero">
                <h1>Garden Buddy</h1>
                <p>Your personal garden planner — discover plants, build your garden and never miss a watering day.</p>
            </div>

            <div className="row">
                <div className="col auth-form h-100">
                    <h2>Login</h2>
                        <label>Email</label>
                        <input type="email" name="email" id="email" placeholder="Type your email" className="form-control mb-2"/>
                        <label>Password</label>
                        <input type="password" name="password" id="password" placeholder="Type your password" className="form-control mb-2"/>
                        <Button text="Submit" color="btn-garden-dark"/>
                </div>

                <div className="col auth-form h-100">
                    <h2>Register</h2>
                        <label>Name</label>
                        <input type="text" name="name" id="name" placeholder="Type your name" className="form-control mb-2"/>
                        <label>Email</label>
                        <input type="email" name="email" id="email1" placeholder="Type your email" className="form-control mb-2"/>
                        <label>Password</label>
                        <input type="password" name="password" id="password1"
                        placeholder="Type a new password" className="form-control mb-2"/>
                        <label>Confirm your password</label>
                        <input type="password" name="password" id="password2" placeholder="Confirm your new password" className="form-control mb-2"/>
                        <Button text="Submit" color="btn-garden-dark"/>
                </div>

            </div>
        </div>)
  }

  export default LandingPage
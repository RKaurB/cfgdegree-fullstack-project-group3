import Button from "../components/Button";

function LandingPage() {
  return (
    <div className="p-4">
      <div className="hero">
        <h1>Garden Buddy</h1>
        <p>
          Your personal garden planner — discover plants, build your garden and
          never miss a watering day.
        </p>
      </div>

      <div className="container" id="auth-section">
        <div className="row mt-5 justify-content-center">
          <div className="col auth-form h-100">
            <form>
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

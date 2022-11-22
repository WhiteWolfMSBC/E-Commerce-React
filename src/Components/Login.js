import React, { useState } from "react";
import { auth } from "../Config/Config";
import { Link } from "react-router-dom";

export const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const login = (e) => {
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        setEmail("");
        setPassword("");
        setError("");
        props.history.push("/");
      })
      .catch((err) => setError(err.message));
  };

  return (
    <div className="container-xl mt-5">
      <div className="row">
        <div className="col-xl-2 col-lg-1 col-md-1 col-sm-12 col-xs-12"></div>
        <div className="Product-card col-xl-8 col-lg-4 col-md-1 col-sm-12 col-xs-12">
          <p className="text-center text-primary fs-3 fw-semibold mt-4">
            Login Form
          </p>

          <form autoComplete="off" className="form-group mb-5" onSubmit={login}>
            <div className="form-floating mb-3">
              <input
                type="email"
                className="form-control"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                id="floatingInput"
                placeholder="productname"
                required
              />
              <label for="floatingInput">Enter Your Email Address</label>
            </div>

            <div className="form-floating mb-3">
              <input
                type="password"
                className="form-control"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                id="floatingInput"
                placeholder="productname"
                required
              />
              <label for="floatingInput">Enter Your Password</label>
            </div>

            <button type="submit" className="btn btn-success px-5">
              LOGIN
            </button>
          </form>

          {error && <span className="error-msg fs-6 fw-light mb-4 mt-4">{error}</span>}

          <span className="text-secondary fs-6 fw-light mb-4 mt-4">
            Don't have an account? Register
            <Link to="signup"> Here</Link>
          </span>
        </div>
        <div className="col-xl-2 col-lg-1 col-md-1 col-sm-12 col-xs-12"></div>
      </div>
    </div>
  );
};

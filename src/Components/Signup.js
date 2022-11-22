import React, { useState } from "react";
import { auth, db } from "../Config/Config";
import { Link } from "react-router-dom";

export const Signup = (props) => {
  // defining state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // signup
  const signup = (e) => {
    e.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((cred) => {
        db.collection("SignedUpUsersData")
          .doc(cred.user.uid)
          .set({
            Name: name,
            Email: email,
            Password: password,
          })
          .then(() => {
            setName("");
            setEmail("");
            setPassword("");
            setError("");
            props.history.push("/login");
          })
          .catch((err) => setError(err.message));
      })
      .catch((err) => setError(err.message));
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-xl-2 col-lg-1 col-md-1 col-sm-12 col-xs-12"></div>
        <div className="Product-card col-xl-8 col-lg-4 col-md-1 col-sm-12 col-xs-12">
          <p className="text-center text-primary fs-3 fw-semibold mt-4">
            Sign-Up Form
          </p>

          <form autoComplete="off" className="form-group" onSubmit={signup}>
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                onChange={(e) => setName(e.target.value)}
                value={name}
                id="floatingInput"
                placeholder="productname"
                required
              />
              <label for="floatingInput">Enter Your Name</label>
            </div>

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

            <button type="submit" className="btn btn-warning px-5">
              Sign-Up
            </button>

            {error && (
              <span className="error-msg fs-6 fw-light mb-4 mt-4">{error}</span>
            )}
            <br />
            <span className="text-secondary fs-6 fw-light mb-4 mt-4">
              Already have an account? Login
              <Link to="login"> Here</Link>
            </span>
          </form>
        </div>
        <div className="col-xl-2 col-lg-1 col-md-1 col-sm-12 col-xs-12"></div>
      </div>
    </div>
  );
};

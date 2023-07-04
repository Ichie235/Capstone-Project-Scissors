import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import "../assets/css/signup.css";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [passWord, setPassword] = useState("");
  const [rpassWord, setrPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    //validate confirm password
    if (rpassWord !== passWord) {
      e.preventDefault();
      alert("passwords don't match");
      return;
    }

    //validate email
    let match = email.match(
      // eslint-disable-next-line no-useless-escape
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
    if (!match) {
      alert("please enter valid email");
      return;
    }

    if (email && passWord && name) {
      e.preventDefault();
      let url = `http://localhost:8000/api/users/`;

      fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email,
          password: passWord,
          name: name,
        }),
      })
        .then((response) => response.json())
        .then((json) => {
          alert("User registered successfully, please login.");
          navigate("/");
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <div>
      <Container className="signup-container">
        <form>
          <h3 style={{color:"green"}}>Sign Up</h3>

          <div className="mb-4">
            <label>Name</label>
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              id="name"
              name="name"
              type="text"
              className="form-controller"
              placeholder="Enter Name"
              required
            />
          </div>

          <div className="mb-4">
            <label>Email</label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              name="email"
              type="email"
              className="form-controller"
              placeholder="Enter email"
              required
            />
          </div>

          <div className="mb-4">
            <label>Password</label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={passWord}
              id="password"
              name="password"
              type="password"
              className="form-controller"
              placeholder="Enter password"
              required
            />
          </div>

          <div className="mb-4">
            <label>Repeat Password</label>
            <input
             onChange={(e) => setrPassword(e.target.value)}
             value={rpassWord}
              type="password"
              className="form-controller"
              name="rpassword"
              placeholder="Repeat Password"
              required
            />
          </div>

          <div className="d-grid">
            <button
              type="submit"
              className="btn btn-success"
              onClick={handleRegister}
            >
              Sign Up
            </button>
          </div>
          <p className="forgot-password text-right" style={{color:"whitesmoke"}}>
             Have an account <span><Link to='/' style={{color:"green"}}>sign In?</Link></span>
          </p>
        </form>
      </Container>
     
    </div>
  );
}

export default Signup;

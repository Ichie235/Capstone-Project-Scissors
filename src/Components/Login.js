import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Container from "react-bootstrap/Container";
import "../assets/css/signup.css";
// import GoogleLogin from 'react-google-login';

// import { LockClosedIcon } from '@heroicons/react/solid';

function Login({ loginData, setLoginData }) {
  const [email, setEmail] = useState('');
  const [passWord, setPassword] = useState('');

  const handleLogin = async (e) => {
    if (email && passWord) {
      e.preventDefault();
      let match = email.match(
        // eslint-disable-next-line no-useless-escape
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );

      if (!match) {
        alert('please enter valid email');
        return;
      }

      var url = `https://urlshortener-api-4qsn.onrender.com/api/users/login`;
      fetch(url, {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email,
          password: passWord,
        }),
      })
        .then((response) => response.json())
        .then((json) => {
          // console.log(json);
          if (json.msg === 'Invalid credentials') {
            alert('Invalid Credentials');
          } else {
            let { email, name, token } = json;
            if ((email, name, token)) {
              let loginData = {
                name,
                email,
                token,
              };
              setLoginData(loginData);
              localStorage.setItem('loginData', JSON.stringify(loginData));
            }
          }
        })
        .catch((error) => console.log(error));
    }
  };

  const handleGoogleLoginFailure = (result) => {
    alert(result);
  };

  const handleGoogleLogin = async (googleData) => {
    const res = await fetch('/api/auth/google-login', {
      method: 'POST',
      body: JSON.stringify({
        token: googleData.tokenId,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    let data = await res.json();
    data.token = googleData.accessToken;
    data.googleUser = true;

    setLoginData(data);
    localStorage.setItem('loginData', JSON.stringify(data));
  };

  return (
   <div>
  <Container className="signup-container">
        <form>
          <h3 style={{color:"green"}}>Sign In</h3>
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
          <div className="d-grid">
            <button
              type="submit"
              className="btn btn-success"
              onClick={handleLogin}
            >
              Sign In
            </button>
          </div>
          <p style={{color:"whitesmoke"}}>
            Dont have an account <span><Link to='/register' style={{color:"green"}}>sign Up?</Link></span>
          </p>
        </form>
      </Container>
   </div>
  );
}

export default Login;

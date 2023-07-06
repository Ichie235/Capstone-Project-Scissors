/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";

import Navbars from "./Navbar";
import UrlCard from "./UrlCard";
import Container from "react-bootstrap/Container";
import "../assets/css/shortener.css"

function Shortener({ loginData, setLoginData, apiKey, setApiKey }) {
  const [url, setUrl] = useState("");

  const [urls, setUrls] = useState([]);



  useEffect(() => {
    let Authorization = loginData.googleUser
      ? `Google ${loginData.token}`
      : `Bearer ${loginData.token}`;

    let api_url =
      //   process.env.NODE_ENV === 'production'
      `https://urlshortener-api-4qsn.onrender.com/api/urls/?user=${loginData.email}`;
    // : `http://localhost:5000/api/urls/?user=${loginData.email}`;

    console.log(
      "🚀 ~ file: Shortener.js ~ line 21 ~ useEffect ~ api_url",
      api_url,
      process.env.NODE_ENV
    );

    let headers = {
      "Content-Type": "application/json",
      Authorization,
    };


    fetch(api_url, {
      method: "GET",
      headers,
    })
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        setUrls(json.reverse());
       
      })
      .catch((error) => {
        console.log(error);
      
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const generateKey = (length) => {
    let result = "";
    let characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0987654321";
    let charlen = characters.length;

    for (let index = 0; index < length; index++) {
      result += characters.charAt(Math.floor(Math.random() * charlen));
    }
    return result;
  };

  const handleApiKey = () => {
    let key = generateKey(12);
    alert(
      `🚀 Your Api Key is ${key} please save it somewhere. URLs shortened with this key may only be decrypted with it.`
    );
    setApiKey(key);
  };

  const handleShortenWithKey = () => {
    let expression =
      // eslint-disable-next-line no-useless-escape
      /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;

    let regex = new RegExp(expression);

    let Authorization = loginData.googleUser
      ? `Google ${loginData.token}`
      : `Bearer ${loginData.token}`;

    if (url.match(regex)) {
      let api_url = `https://urlshortener-api-4qsn.onrender.com/api/urls/encrypt/`;

      let headers = {
        "Content-Type": "application/json",
        Authorization,
      };

  

      fetch(api_url, {
        method: "POST",
        headers,
        body: JSON.stringify({
          user: loginData.email,
          url: url,
          key: apiKey,
        }),
      })
        .then((response) => response.json())
        .then((json) => {
          setUrls(urls.length ? [...urls, json].reverse() : [...urls, json]);
          setUrl("");
         
        })
        .catch((error) => {
          console.log(error);
         
        });
    } else {
      alert("Please enter a valid URL");
      setUrl("");
    }
  };

  const handleShorten = () => {
    let expression =
      // eslint-disable-next-line no-useless-escape
      /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;

    let regex = new RegExp(expression);

    let Authorization = loginData.googleUser
      ? `Google ${loginData.token}`
      : `Bearer ${loginData.token}`;

    if (url.match(regex)) {
      let api_url = `https://urlshortener-api-4qsn.onrender.com/api/urls/`;

      let headers = {
        "Content-Type": "application/json",
        Authorization,
      };
      
      fetch(api_url, {
        method: "POST",
        headers,
        body: JSON.stringify({
          user: loginData.email,
          url: url,
        }),
      })
        .then((response) => response.json())
        .then((json) => {
          setUrls([...urls, json].reverse());
          setUrl("");
         
        })
        .catch((error) => {
          console.log(error);
        
        });
    } else {
      alert("Please enter a valid URL");
      setUrl("");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("loginData");
    setLoginData(null);
  };

  return (
    <>
      <Navbars
        loginData={loginData}
        handleApiKey={handleApiKey}
        handleLogout={handleLogout}
        setApiKey={setApiKey}
      />
     <h1 className="mt-3" style={{color:"white"}}>Enter a URL to Shorten</h1>
      <Container className="shorten-container">
        <input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          type="url"
          className="
          form-shorten-controller"
          placeholder="URL input"
        />

        <div className="d-grid mt-1 shortUrl-btn">
          <button type="button"  className="btn btn-success" onClick={handleShorten} >
            Shorten
          </button>
        </div>
        <div>
          {apiKey.length === 12 ? (
             <div className="d-grid mt-3 shortUrl-btn">
            <button type="button" className="btn btn-success" onClick={handleShortenWithKey}>
              Shorten with API Key
            </button>
            </div>
          ) : null}
        </div>
      </Container>

      {urls.map((url) => (
        <UrlCard
          key={url._id}
          URL={url}
          loginData={loginData}
          urls={urls}
          setUrls={setUrls}
        />
      ))}
    </>
  );
}

export default Shortener;

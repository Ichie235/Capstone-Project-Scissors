import React from "react";
import { UilTrashAlt } from "@iconscout/react-unicons";
import { Container, Row, Col, Table } from "react-bootstrap";

function UrlCard({ URL, loginData, setLoading, urls, setUrls }) {
  const { _id, url, shortUrl, user, encrypted } = URL;

  const accessEncryptedUrl = () => {
    const decrypt = (salt, encoded) => {
      const textToChars = (text) => text.split("").map((c) => c.charCodeAt(0));

      const applySaltToChar = (code) =>
        textToChars(salt).reduce((a, b) => a ^ b, code);

      return encoded
        .match(/.{1,2}/g)
        .map((hex) => parseInt(hex, 16))
        .map(applySaltToChar)
        .map((charCode) => String.fromCharCode(charCode))
        .join("");
    };

    let key = prompt("Please enter your API key:", "API Key");
    if (key !== null && key !== "" && key.length === 12) {
      let surl = decrypt(key, shortUrl);
      let expression =
        // eslint-disable-next-line no-useless-escape
        /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;

      let regex = new RegExp(expression);
      if (surl.match(regex)) {
        let win = window.open(surl, "_blank");
        win.focus();
      } else {
        alert("Invalid Key");
        return;
      }
    } else {
      alert("Invalid Key");
      return;
    }
  };

  const handleDeleteUrl = () => {
    console.log(_id, loginData);
    let Authorization = loginData.googleUser
      ? `Google ${loginData.token}`
      : `Bearer ${loginData.token}`;

    let api_url = `/api/urls/${_id}`;

    let headers = {
      "Content-Type": "application/json",
      Authorization,
    };

    setLoading(true);

    fetch(api_url, {
      method: "DELETE",
      headers,
      body: JSON.stringify({
        email: loginData.email,
        googleUser: loginData.googleUser,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        if (urls.length === 1) {
          setUrls([]);
        } else {
          setUrls(
            [...urls].filter((url) => url._id !== json.deletedUrl._id).reverse()
          );
        }
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };
  return (
    <Container>
      <Row className="flex-column flex-md-row remove-md-gap mt-4" >
        <Col md={4}>
          <div style={{ backgroundColor: "black" }}>
            <UilTrashAlt size="35" color="white" onClick={handleDeleteUrl} />
            <span className="ml-2">URL (Click to delete Url)</span>
            <div style={{ backgroundColor: "#333333" }}>
            <p style={{ color: "white" }}>{encrypted ? "Encrypted" : url}</p>
          </div>
          </div>
        
        </Col>
        <Col md={4}>
          <div style={{ backgroundColor: "black" }}>
            <p style={{ color: "white" }}> Short</p>
            <div style={{ backgroundColor: "#333333" }}>
            {encrypted ? (
              <div className="d-grid">
                <button
                  onClick={accessEncryptedUrl}
                  className="btn btn-success"
                >
                  access with key
                </button>
              </div>
            ) : (
              <a rel="noreferrer" target="_blank" href={shortUrl}>
                {shortUrl}
              </a>
            )}
          </div>
          </div>
         
        </Col>
        <Col md={4}>
          <div style={{ backgroundColor: "black" }}>
            <p style={{ color: "white" }}>User </p>
            <div style={{ backgroundColor: "#333333" }}>
            <p style={{ color: "white" }}>{user}</p>
          </div>
          </div>
          
        </Col>
      </Row>
    </Container>
  );
}

export default UrlCard;

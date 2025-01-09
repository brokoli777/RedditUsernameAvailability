import React, { useState } from "react";
import "./App.css";
import logo from "./assets/reddit-logo-reddit-icon-transparent-free-png.webp";
import Navbar from "./Navbar";
import axios from "axios";
import debounce from "lodash.debounce";

function App() {
  const [showOutput, setShowOutput] = useState(false);
  const [userNameOutput, setUserNameOutput] = useState(0);
  const [data, setData] = useState("");
  const [outputClass, setOutputClass] = useState(
    "invalid"
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    checkUsernameAvailability(data);
  };

  const isValidUsername = (username) => {
    const usernameRegex = /^[a-zA-Z0-9-_]{3,20}$/;
    return usernameRegex.test(username);
  };

  const checkUsernameAvailability = debounce(async (username) => {

    if (!username) {
      setShowOutput(false);
      return;
    }

    if (!isValidUsername(username)) {
      setUserNameOutput("invalid. Ensure the username satisfies the requirements mentioned below.");
      setShowOutput(true);
      setOutputClass("invalid");
      return;
    }

    try {
      const res = await axios.post("https://blinku157.pythonanywhere.com/check", { username });
      setUserNameOutput(res.data);

      if (res.data === "available") {
        setOutputClass("available");
      } else {
        setOutputClass("invalid");
      }

      setShowOutput(true);
    } catch (error) {
      console.error(error);
    }
  }, 500);

  return (
    <>
      <div className="container-fluid mainBody">
        <Navbar />

        <div className="main_title">
          <div className="">
            <img src={logo} className="col reddit_logo" alt="" />
          </div>
          <div className="">RedditAlias</div>
        </div>

        <div className="row justify-content-center mt-5 align-items-center">
            <form onSubmit={handleSubmit}>
              <div className="input-group searchContainer">
                <input
                  type="text"
                  className="form-control rounded-pill py-3 searchArea"
                  value={data}
                  onChange={(e) =>{ 
                    setData(e.target.value)
                    checkUsernameAvailability(e.target.value)
                  }}
                  placeholder="  Search"
                  aria-label="Search"
                  aria-describedby="search-btn"
                />
              </div>
              <div className="row justify-content-center infoText">
                Type to see whether a username is available or not!
              </div>
            </form>

            {showOutput && (
              <div className={`row justify-content-center text-center ${outputClass}`}>
                The username is {userNameOutput}
              </div>
            )}

            <div className="requirements">
              <div className="row justify-content-center mt-4">
                <div className="col-12 col-md-6">
                  <div className="row justify-content-center">
                    <div className="col-12 text-center">
                      <h3>Requirements</h3>
                    </div>
                  </div>
                  <div className="row justify-content-center">
                    <div className="col-12">
                      <ul>
                        <li>Username should be between 3 to 20 characters long.</li>
                        <li>Username can only contain alphanumeric characters, hyphens and underscores.</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        </div>
      </div>
    </>
  );
}

export default App;

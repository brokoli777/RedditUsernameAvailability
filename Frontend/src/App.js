import React, { useState, useEffect, useRef } from "react";
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
    "row justify-content-center output"
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    checkUsernameAvailability(data);
  };

  const checkUsernameAvailability = debounce(async (username) => {
    if (!username) {
      setShowOutput(false);
      return;
    }

    try {
      const res = await axios.post("/check", { username });
      setUserNameOutput(res.data);

      if (res.data === "available") {
        setOutputClass(outputClass.replace("output", "available"));
      } else {
        setOutputClass("row justify-content-center output");
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
              <div className={outputClass}>
                The username is {userNameOutput}
              </div>
            )}
        </div>
      </div>
    </>
  );
}

export default App;

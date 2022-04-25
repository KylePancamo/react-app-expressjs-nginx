import "../../App.js";
import React, { useState, useEffect } from "react";
import "./AccountPage.css"
import Axios from "axios";
import { useHistory } from "react-router-dom";

import {
  Link,
} from "react-router-dom";
function Account() {

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNum, setPhoneNum] = useState("");
  const [address, setAddress] = useState("");


  let history = useHistory();

  useEffect(() => {
    Axios.get("http://localhost:5000/signin").then((response) => {
        if (!(response.data.user)) {
            history.push("/");
        }
        else{
          setFirstName(response.data.user.first_name);
          setLastName(response.data.user.last_name);
          setUsername(response.data.user.username);
          setEmail(response.data.user.email);
          setPhoneNum(response.data.user.phone_num);
          setAddress(response.data.user.address);
        }
    })
  }, [])

  return (
      <div className="AccountPage">
        <div className="container">
          <div className="title">Profile</div>
          <div className="content">
            <form action="#">
              <div className="user-details">
                <div className="input-box">
                  <span className="details"><strong>First Name</strong></span>
                  <input type="text" value={firstName} disabled></input>
                </div>
                <div className="input-box">
                  <span className="details"><strong>Last Name</strong></span>
                  <input type="text" value={lastName} disabled ></input>
                </div>
                <div className="input-box">
                  <span className="details"><strong>Username</strong></span>
                  <input type="text" value={username} disabled ></input>
                </div>
                <div className="input-box">
                  <span className="details"><strong>Email</strong></span>
                  <input type="text" value={email} disabled ></input>
                </div>
                <div className="input-box">
                  <span className="details"> <strong>Phone Number</strong></span>
                  <input type="text" value={phoneNum} disabled ></input>
                </div>
                <div className="input-box">
                  <span className="details"><strong>Address</strong></span>
                  <input type="text" value={address} disabled ></input>
                </div>
              </div>
            </form>
          </div>
          <Link to="/order-history">View Order History</Link>
        </div>
      </div>

  );
}

export default Account;

import { useState } from "react";
import "./AccountPage.css"
import Axios from "axios";
import { useHistory } from "react-router-dom";

function getAccountInformation() {
  return (
    <body>
      <div className="AccountPage">
        <div className="container">
          <div className="title">Profile</div>
          <div className="content">
            <form action="#">
              <div className="user-details">
                <div className="input-box">
                  <span class="details"><strong>First Name</strong></span>
                  <input type="text" required></input>
                </div>
                <div className="input-box">
                  <span class="details"><strong>Last Name</strong></span>
                  <input type="text" required></input>
                </div>
                <div className="input-box">
                  <span class="details"><strong>Username</strong></span>
                  <input type="text" required></input>
                </div>
                <div className="input-box">
                  <span class="details"><strong>Email</strong></span>
                  <input type="text" required></input>
                </div>
                <div className="input-box">
                  <span class="details"> <strong>Phone Number</strong></span>
                  <input type="text" required></input>
                </div>
                <div className="input-box">
                  <span class="details"><strong>Address</strong></span>
                  <input type="text" required></input>
                </div>
              </div>
              <div className="button">
                <input type="submit" value="Profile"></input>
              </div>
            </form>
          </div>
        </div>
      </div>
    </body>
  );
}

export default getAccountInformation;

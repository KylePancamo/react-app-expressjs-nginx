import { useState } from "react";
import "./AccountPage.css"
import Axios from "axios";
import { useHistory } from "react-router-dom";



function getAccountInformation() {

  return (
    <body>
      <div class="container">
        <div class="title">Profile</div>
        <div class="content">
          <form action="#">
            <div class="user-details">
              <div class="input-box">
                <span class="details"><strong>First Name</strong></span>
                <input type="text" required></input>
              </div>
              <div class="input-box">
                <span class="details"><strong>Last Name</strong></span>
                <input type="text" required></input>
              </div>
              <div class="input-box">
                <span class="details"><strong>Username</strong></span>
                <input type="text" required></input>
              </div>
              <div class="input-box">
                <span class="details"><strong>Email</strong></span>
                <input type="text" required></input>
              </div>
              <div class="input-box">
                <span class="details"> <strong>Phone Number</strong></span>
                <input type="text" required></input>
              </div>
              <div class="input-box">
                <span class="details"><strong>Address</strong></span>
                <input type="text" required></input>
              </div>
            </div>
            <div class="button">
              <input type="submit" value="Profile"></input>
            </div>
          </form>
        </div>
      </div>
    </body>
  );
}

export default getAccountInformation;

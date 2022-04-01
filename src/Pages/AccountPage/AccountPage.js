import { useState } from "react";
import "./AccountPage.css"
import Axios from "axios";
import { useHistory } from "react-router-dom";



function getAccountInformation() {
	
return (
<positioning>
  <div class="container">
    <div class="title">Profile</div>
    <div class="content">
      <form action="#">
        <div class="user-details">
          <div class="input-box">
            <span class="details"><strong>Full Name</strong></span>
            <input type="text" required></input>
          </div>
          <div class="input-box">
            <span class="details"><strong>Username</strong></span>
            <input type="text"required></input>
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
            <span class="details"><strong>Password</strong></span>
            <input type="text" required></input>
          </div>
          <div class="input-box">
            <span class="details"><strong>Confirm Password</strong></span>
            <input type="text" required></input>
          </div>
        </div>
        <div class="button">
          <input type="submit" value="Profile"></input>
        </div>
      </form>
    </div>
	</div>
	</positioning>
);

	}
export default getAccountInformation;

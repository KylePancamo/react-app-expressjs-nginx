import { useState } from "react";
import "./RegistrationPage.css"
import Axios from "axios";
import { useHistory } from "react-router-dom";

function Registration() {
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [address, setAddress] = useState("");
	const [password, setPassword] = useState("");
	const [firstname, setFirstname] = useState("");
	const [lastname, setLastname] = useState(0);
	const [phone, setPhone] = useState("");

	const [registrationStatus, setRegistrationStatus] = useState("");

	let history = useHistory();

	const registerUser = (e) => {
		e.preventDefault();
		const data = {
			username: username,
			password: password,
			email: email,
			address: address,
			firstname: firstname,
			lastname: lastname,
			phone: phone
		};

		let emptyField = Object.values(data).includes("");
		if (emptyField) {
			setRegistrationStatus("You must fill out all fields before continuing");
			return;
		}
		
		Axios.post("/api/register", data).then((response) => {
			if (response.data.error) {
				alert(response.data.error);
				console.log("error!");
			} else {
				if (response.data.message) {
					setRegistrationStatus(response.data.message);
				}
				/*history.push("/");*/
			}
		});
	};

	return (
		<div className="wrapper">
			<div className="form-wrapper">
				<h2>Create Account</h2>
				<form>
					<div className="userName">
						<label><b>Username:</b></label>
						<input 
						type="text"
						placeholder="Username..."
							onChange={(event) => {
								setUsername(event.target.value);
							}}
						/>
					</div>
					<div className="password">
						<label><b>Password:</b></label>
						<input 
						type="password"
						placeholder="Password"
							onChange={(event) => {
								setPassword(event.target.value);
							}}
						/>
					</div>
					<div className="email">
						<label><b>Email:</b></label>
						<input 
						type="email"
						placeholder="Email..."
							onChange={(event) => {
								setEmail(event.target.value);
							}}
						/>
					</div>
					<div className="address">
						<label><b>Address:</b></label>
						<input 
						type="text"
						placeholder="Address..."
							onChange={(event) => {
								setAddress(event.target.value);
							}}
						/>
					</div>
					<div className="firstName">
						<label><b>First Name:</b></label>
						<input 
						type="text"
						placeholder="First Name..."
							onChange={(event) => {
								setFirstname(event.target.value);
							}}
						/>
					</div>
					<div className="lastName">
						<label><b>Last Name:</b></label>
						<input 
						type="text"
						placeholder="Last Name..."
							onChange={(event) => {
								setLastname(event.target.value);
							}}
						/>
					</div>
					<div className="phoneNumber">
						<label><b>Phone Number:</b></label>
						<input 
						type="text"
						placeholder="Phone Number..."
							onChange={(event) => {
								setPhone(event.target.value);
							}}
						/>
					</div>
					<div className="submit">
						<button onClick={registerUser}><i>Register</i></button>
						<h1>{registrationStatus}</h1>
					</div>
				</form>
			</div>
		</div>
	);
}

export default Registration;

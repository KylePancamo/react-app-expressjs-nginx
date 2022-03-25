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

	const registerUser = () => {
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

		Axios.post("http://localhost:5000/register", data).then((response) => {
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
		<div className="information">
			<label>Username:</label>
			<input type="text"
				onChange={(event) => {
					setUsername(event.target.value);
				}}
			/>
			<label>Password:</label>
			<input type="text"
				onChange={(event) => {
					setPassword(event.target.value);
				}}
			/>
			<label>Email:</label>
			<input type="text"
				onChange={(event) => {
					setEmail(event.target.value);
				}}
			/>
			<label>Address:</label>
			<input type="text"
				onChange={(event) => {
					setAddress(event.target.value);
				}}
			/>
			<label>First Name:</label>
			<input type="text"
				onChange={(event) => {
					setFirstname(event.target.value);
				}}
			/>
			<label>Last Name:</label>
			<input type="text"
				onChange={(event) => {
					setLastname(event.target.value);
				}}
			/>
			<label>Phone Number:</label>
			<input type="text"
				onChange={(event) => {
					setPhone(event.target.value);
				}}
			/>
			<button onClick={registerUser}>Register</button>
			<h1>{registrationStatus}</h1>
		</div>
	);
}

export default Registration;

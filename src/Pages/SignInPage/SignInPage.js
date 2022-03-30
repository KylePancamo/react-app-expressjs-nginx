import React, { useEffect, useState } from 'react';
import Axios from "axios";
import './SignInPage.css';
import { useHistory } from "react-router-dom";



function SignIn() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [loginStatus, setLoginStatus] = useState("");

    Axios.defaults.withCredentials = true;

    let history = useHistory();

    const login = () => {
        Axios.post("http://localhost:5000/signin",
            {
                username: username,
                password: password,
            }).then((response) => {
                if (response.data.message) {
                    setLoginStatus(response.data.message);
                } else {
                    setLoginStatus(response.data[0].username);
                    window.location.reload(true);
                    history.push("/");
                }

            });
    };

    useEffect(() => {
        Axios.get("http://localhost:5000/signin").then((response) => {
            if (response.data.user) {
                history.push("/");
            }
        })
    }, [])

    return (
        <div className="signin-background">
            <div className="signin-webpage">
                <div className="signin-wrapper">
                    <h1><b><i>Sign In</i></b></h1>
                    <input
                        type="text"
                        placeholder="Username..."
                        onChange={(e) => {
                            setUsername(e.target.value);
                        }}
                    />

                    <input
                        type="password"
                        placeholder="Password..."
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                    />
                    <div>
                        <button onClick={login}> <b>Login</b></button>
                    </div>
                    <h1>{loginStatus}</h1>
                </div>
            </div>
        </div>
    );
}
export default SignIn;

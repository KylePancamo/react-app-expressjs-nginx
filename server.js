const path = require('path');
const cors = require('cors');
const express = require('express');
const app = express(); // create express app
const http = require('http');
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const saltRounds = 10;
app.use(cors());

const bodyParser = require('body-parser');
app.use(bodyParser.json());

// add middlewares
const root = require('path').join(__dirname, 'build');
app.use(express.static(root));

//app.use('/*', (req, res) => {
//  res.sendFile(path.join(__dirname, 'build', 'index.html'));
//});

const server = http.createServer(app);

const db = mysql.createConnection({
  user: "nodejs",
  host: "localhost",
  password: "nodejs",
  database: "account_information"
});

db.connect((err) => {
    if (err) {
        throw err;
    }

    console.log("Connected to MySQL server.");
});

app.post("/register", (req, res) => {

    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;
    const address = req.body.address;
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const phone = req.body.phone;

    db.query(
        "SELECT * FROM account WHERE username = ?",
        username,
        (err, result) => {
            if (err) {
                console.log(err);
            }
            if (result.length > 0) {
                return res.send({ message: "User account already exists!" });

            } else {
                bcrypt.hash(password, saltRounds, (err, hash) => {
                    if (err) {
                        console.log(err);
                    }

                    const data = [
                        username,
                        email,
                        address,
                        hash,
                        firstname,
                        lastname,
                        phone
                    ];

                    const query = "INSERT INTO account (username, email, address, password, first_name, last_name, phone_num) VALUES (?, ?, ?, ?, ?, ?, ?);";
                    db.query(
                        query, data,
                        (err, result) => {
                            if (err) {
                                res.send({ err: err });
                            }
                            res.send({ message: "You have been successfully registered!" });
                        }
                    );
                });
            }
        }
    )
});
// start express server on port 5000
server.listen(5000, () => {
    console.log('NodeJS server running');
});
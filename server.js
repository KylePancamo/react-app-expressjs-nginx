const path = require('path');
const cors = require('cors');
const express = require('express');
const app = express(); // create express app
const http = require('http');

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");

const mysql = require('mysql');
const bcrypt = require('bcrypt');
const saltRounds = 10;

app.use(express.json());
app.use(cors({
    origin: ["http://ec2-3-93-4-5.compute-1.amazonaws.com"],
    methods: ["GET", "POST"],
    credentials: true,
}));

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
    key: "userId",
    secret: "test",
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 60 * 60 * 60 * 24,
    },
}));


const server = http.createServer(app);

const db = mysql.createConnection({
  user: "nodejs",
  host: "localhost",
  password: "nodejs",
  database: "account_information"
});

db.connect((err) => {
    if (err) {
        console.log("\x1b[41m", "MySQL Connection Error:")
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


app.get("/signin", (req, res) => {
    if (req.session.user) {
        res.send({ loggedIn: true, user: req.session.user })
    } else {
        res.send({ loggedIn: false })
    }
})

app.get("/register", (req, res) => {
    if (req.session.user) {
        res.send({ loggedIn: true, user: req.session.user })
    } else {
        res.send({ loggedIn: false })
    }
})

app.get("/orders", (req, res) => {
    db.query(
        "SELECT * FROM order_information",
        (err, result) => {
            if (err) {
                res.send({ err: err })
            }
            res.send(result);
        }
    );

})

app.post('/signin', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    db.query(
        "SELECT * FROM account WHERE username = ?",
        username,
        (err, result) => {
            if (err) {
                res.send({ err: err })
            }

            if (result.length > 0) {
                bcrypt.compare(password, result[0].password, (error, response) => {
                    if (response) {
                        req.session.user = result;
                        console.log(req.session.user)
                        res.send(result)
                    } else {
                        res.send({ message: "Incorrect username or password" })
                    }
                })
            } else {
                res.send({ message: "Incorrect username" })
            }
        }
    );
})

// start express server on port 5000
server.listen(5000, () => {
    console.log('NodeJS server running');
});

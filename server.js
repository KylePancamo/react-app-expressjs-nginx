const path = require('path');
const cors = require('cors');
const express = require('express');
const app = express(); // create express app
const http = require('http');
const multer = require("multer");
const fs = require('fs');

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");

const mysql = require('mysql');
const bcrypt = require('bcrypt');
const saltRounds = 10;

app.use(express.json());
app.use(cors({
    origin: ["http://ec2-3-93-4-5.compute-1.amazonaws.com"],
    methods: "GET, POST",
    credentials: true,
}));

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
    key: "userId",
    secret: "abc123",
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

app.post("/api/register", (req, res) => {

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


app.get("/api/signin", (req, res) => {
    console.log(req.session);
    if (req.session.user) {
        res.send({ loggedIn: true, user: req.session.user })
    } else {
        res.send({ loggedIn: false })
    }
})

app.get("/api/register", (req, res) => {
    if (req.session.user) {
        res.send({ loggedIn: true, user: req.session.user })
    } else {
        res.send({ loggedIn: false })
    }
})

app.get("/api/orders", (req, res) => {
    let account_id = req.session.user.account_id;
    db.query(
        `SELECT
            account.account_id,
            order_history.order_num,
            orders.item_id,
            item_template.item_name,
            item_template.item_description,
            item_template.item_price
        FROM order_history
        JOIN account
            ON account.account_id = order_history.cust_id
        JOIN orders
            ON orders.order_num = order_history.order_num
        JOIN item_template
            ON orders.item_id = item_template.id
        WHERE account.account_id = ?`,
        account_id,
        (err, result) => {
            if (err) {
                res.send({ err: err })
            }

            res.send(result);
        }
    );
})

app.get("/get-items", (req, res) => {
    db.query(
        `SELECT
            item_template.id,
            item_template.item_name,
            item_template.manufacturer,
            item_template.item_description,
            item_template.item_price,
            image_pathnames.pathname
        FROM item_template
        JOIN image_pathnames
            ON item_template.id = image_pathnames.item_id`,
        (err, items) => {
            if (err) {
                console.log(err);
            } else {
                res.send({ itemList: items });
            }
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
                        req.session.user = result[0];
                        //console.log(req.session.user)
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

var storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, './public/images')
    },
    filename: (req, file, callBack) => {
        callBack(null, file.originalname)
    }
})

var upload = multer({
    storage: storage,
    fileFilter: (req, file, callBack) => {
        if (fs.existsSync("./public/images/" + file.originalname)) {
            req.fileValidationError = "File already exists!"
            return callBack(null, false, req.fileValidationError);
        } else {
            callBack(null, true);
        }
    }
});

app.post("/addproduct", upload.single('image'), (req, res) => {
    if (req.fileValidationError) {
        return res.send({ message: req.fileValidationError });
    } else if (!req.file) {
        console.log("No File added");
    }
    else {
        console.log("File added");
    }

    const modelName = req.body.itemInfo[0];
    const itemDesc = req.body.itemInfo[1];
    const price = req.body.itemInfo[2];
    const path = "images/" + req.file.filename;
    //console.log(req.file.filename);
    const data = [
        modelName,
        itemDesc,
        price
    ];
    const query = "INSERT INTO item_template (item_name, item_description, item_price) VALUES (?, ?, ?);";
    db.query(
        query, data,
        (err, result) => {
            if (err) {
                res.send({ message: "Error: Failed to insert item" });
            }
            else {
                let image = [result.insertId, path]
                db.query(
                    "INSERT INTO image_pathnames (item_id, pathname) VALUES (?, ?);",
                    image,
                    (err, result) => {
                        if (err) {
                            res.send({ message: "Failed to insert into image_pathnames" })
                        } else {
                            res.status(200).send("Success");
                        }
                    }
                )
            }
        }
    );
});

app.post("/searchproduct", (req, res) => {

    const productID = req.body.productID;
    db.query(
        "SELECT * FROM item_template WHERE id = ?",
        productID,
        (err, result) => {
            if (err) {
                console.log(err);
            }
            if (result.length <= 0) {
                return res.send({ err: "Error: Item not found" });
            }
            else {
                res.send({ modelName: result[0].item_name, itemDesc: result[0].item_description, price: result[0].item_price })
            }
        }
    )
});

app.post("/updateproduct", (req, res) => {

    const productID = req.body.productID;
    const modelName = req.body.modelName;
    const itemDesc = req.body.itemDesc;
    const price = req.body.price;

    db.query(
        "SELECT * FROM item_template WHERE id = ?",
        productID,
        (err, result) => {
            if (err) {
                console.log(error);
            }
            if (result.length <= 0) {
                return res.send({ message: "Error: Item not found" });
            }
            else {
                const data = [
                    modelName,
                    itemDesc,
                    price,
                    productID
                ];

                const query = "UPDATE item_template SET item_name = ?, item_description = ?, item_price = ? WHERE id = ?;";
                db.query(query, data,
                    (err, result) => {
                        if (err) {
                            res.send({ message: "Error: Item failed to update" })
                        } else {
                            res.status(200).send("Success");
                        }
                    }
                );
            }
        }
    )
});

// start express server on port 5000
server.listen(5000, () => {
    console.log('NodeJS server running');
});

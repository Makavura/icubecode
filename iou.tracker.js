const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('db.json');
const db = low(adapter);

// Set some defaults (required if your JSON file is empty)
db.defaults({ users: [] })
    .write()

const express = require('express');
const app = express();
const port = 3000;

const chalk = require('chalk');
const bodyParser = require('body-parser')

const jsonParser = bodyParser.json()

app.get('/', (req, res) => {
    res.send('Welcome to IOU Tracker API V1 By Makavura Mughanga')
});

app.post('/users', jsonParser, (req, res) => {
    /* 
    Given a list of users {"users":["Adam","Bob"]} 
    Return a response of users matching those names sorted by name
    */
    let users = req.body;
    if (users.users.length == 0) {
        res.json("Error: Please Provide an array of users in your query").status(422);
    } else {
        /* 
        Response with Payload
        */
        let response = [];
        /* 
        Loop through array of user names and find matching entries
        */
        users.users.forEach(user => {
            let _ = db.get('users')
                .find({ "name": user })
                .value()
            response.push(_);
        });
        let responseObject = {
            users: response
        }
        res.json(responseObject).status(200);
    }
});

app.post('/add',jsonParser, (req, res) => {
    /* 
    Given a name e.g {"user": "Dan"}
    Create a user
    Return a User Object for a new user
    */
    let userinfo = req.body;
    let userObject = {
        "name": null,
        "owes": {

        },
        "owed_by": {

        },
        "balance": "< 0 - 0 >"
    }
    if (userinfo.user.length == 0) {
        res.json("Error: Please Provide a user's name in your query").status(422);
    } else {
        /* 
        Create user entry
        */
        userObject.name = userinfo.user;
        db.get('users')
            .push(userObject)
            .write()
        res.json(userObject).status(201);
    }
});

app.post('/iou', (req, res) => {
    /* 
    Given 
    {"lender": "Dan","borrower": "Amos","amount":5.25}
    Return  a response of users affected by IOU entry sorted by name
    */
});

app.delete('/user', (req, res) => {
    /* 
    Given a user's name
    Delete all IOUs related to name
    */
});

app.listen(port, () => {
    console.log(chalk.yellowBright(`Example app listening at http://localhost:${port}`));
});
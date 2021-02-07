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
const bodyParser = require('body-parser');
const { response } = require('express');

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

app.post('/add', jsonParser, (req, res) => {
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

app.post('/iou', jsonParser, (req, res) => {
    /* 
    Given 
    {"lender": "Dan","borrower": "Amos","amount":5.25}
    Return  a response of users affected by IOU entry sorted by name
    */
    let iou = req.body;
    if (!iou.lender) res.json("Please provide a lender").status(422);
    if (!iou.borrower) res.json("Please provide a borrower").status(422);
    if (!iou.amount) res.json("Please provide an IOU amount").status(422);;
    let _lender = iou.lender;
    let _borrower = iou.borrower;
    /* 
    Set IOU Record in borrower's records
    */
    db.get('users')
        .find({ "name": iou.borrower })
        .assign({
            "owes": {
                [_lender]: iou.amount
            }
        })
        .value();
    /* 
    Fetch borrower's data
    */
    let borrower = db.get('users')
        .find({ "name": iou.borrower })
        .value();
    /* 
        Process Individual IOU information
    */
    let borrowedamount = 0, owedamount = 0;
    Object.values(borrower.owes).forEach(
        element => {
            borrowedamount += element;
            return borrowedamount;
        }
    );
    Object.values(borrower.owed_by).forEach(
        element => {
            owedamount += element;
            return owedamount;
        }
    );
    console.log(chalk.yellow(`${borrowedamount, owedamount}`));
    /* 
    Update individual information
    */
    db.get('users')
        .find({ "name": iou.borrower })
        .assign({
            "balance": `< ${owedamount} - ${borrowedamount}  >`
        })
        .value();

    /* 
    Set IOU Record in lender's records
    */
   
    db.get('users')
        .find({ "name": iou.lender })
        .assign({
            "owed_by": {
              [_borrower]  : iou.amount
            }
        })
        .value();
    /* 
    Fetch Lender's Data
    */
    let lender = db.get('users')
        .find({ "name": iou.lender })
        .value();
    /* 
    Process lender's individual information
    */
    let lendersborrowedamount = 0, lendersowedamount = 0;
    console.log(lender);

    if (Object.keys(lender.owes).length !== 0) {
        Object.values(lender.owes).forEach(
            element => {
                lendersborrowedamount += element;
                return lendersborrowedamount;
            }
        );

    }

    if (Object.keys(lender.owed_by).length !== 0) {
        Object.values(lender.owed_by).forEach(
            element => {
                lendersowedamount += element, 10;
                return lendersowedamount;
            }
        );
    }
    /* 
    Update individual information
    */
    db.get('users')
        .find({ "name": iou.lender })
        .assign({
            "balance": `< ${lendersowedamount} - ${lendersborrowedamount}  >`
        })
        .value();
    /* 
    Fetch user information of users affected by this IOU transaction
    */
    let _ = []
    _.push(db.get('users')
        .find({ "name": iou.lender })
        .value())
    _.push(db.get('users')
        .find({ "name": iou.borrower })
        .value())

    res.json(_).status(200);
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
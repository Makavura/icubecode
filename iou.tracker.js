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

app.post('/users',  jsonParser, (req, res) => {
    /* 
    Given a list of users {"users":["Adam","Bob"]} 
    Return a response of users matching those names sorted by name
    */

});

app.post('/add', (req, res) => {
    /* 
    Given a name e.g {"user": "Dan"}
    Create a user
    Return a User Object for a new user
    */
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
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('db.json');
const db = low(adapter);

const express = require('express');
const app = express();
const port = 3000;

const chalk = require('chalk');

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(chalk.yellowBright(`Example app listening at http://localhost:${port}`));
})
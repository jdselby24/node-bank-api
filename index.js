const express = require('express');
const { MongoClient } = require('mongodb');
const Parser = require('body-parser');
const accountsController = require('./controllers/accountsController');

const app = express();
const jsonParser = Parser.json();
const port = 3001;

const mongodb = 'mongodb://localhost:27017';

const bank = require('./services/bankService');

app.get('/accounts', accountsController.getAccounts);
app.post('/accounts', jsonParser, accountsController.addAccount);
app.put('/accounts', jsonParser, accountsController.updateAccount);

app.listen(port, () => {
    console.log('SYNERGY ' + port)
})
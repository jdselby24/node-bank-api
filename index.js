const express = require('express');
const { MongoClient } = require('mongodb');
const Parser = require('body-parser');

const app = express();
const jsonParser = Parser.json();
const port = 3001;

const mongodb = 'mongodb://localhost:27017';

const bank = {
    getCustomers: (db, callback) => {
        var accountsData = db.collection('accounts');
        accountsData.find({}, { customer: 1, _id: 0 }).toArray((err, accounts) => {
            callback(accounts);
        })
    },

    getAccounts: (db, callback) => {
        var accountsData = db.collection('accounts');
        accountsData.find({}).toArray((err, accounts) => {
            callback(accounts);
        });
    },

    getAccountsBlt: (db, callback, query) => {
        var accountsData = db.collection('accounts');
        query = parseFloat(query)
        accountsData.find({"account.balance": { $lt: query } }).toArray((err, accounts) => {
            callback(accounts);
        })
    },

    getAccountsBgt: (db, callback, query) => {
        var accountsData = db.collection('accounts');
        query = parseFloat(query)
        accountsData.find({"account.balance": { $gt: query } }).toArray((err, accounts) => {
            callback(accounts);
        })
    },

    addAccount: (db, customerName, account) => {
        var accountsData = db.collection('accounts');
        accountsData.insertOne({customer: customerName, account: account})
    },

    updateAccount: (db, customer, accountNameRef, accountNewData) => {
        var accountsData = db.collection('accounts');
        accountsData.update({$and: {customer: { $eq: customer}}, {"account.name": {$eq: accountNameRef}}28, {"account.balance": {$inc: accountNewData.balance});
    }
};

const bankApi = {
    getCustomers: (req, res) => {
        MongoClient.connect(mongodb, { useNewUrlParser: true, useUnifiedTopology: true}, (err, client) => {
            console.log("Connected to MongoDB");
            let db = client.db('bank');
            bank.getCustomers(db, (customers) => {
                let response = {
                    success: true,
                    message: "Customers Retreived",
                    data: customers
                };
                res.status(200);
                res.json(response)
            });
        })
    },

    getAccounts: (req, res) => {
        MongoClient.connect(mongodb, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
            console.log("Connected to MongoDB");
            let db = client.db('bank');

            if(typeof req.query.blt == "string") {
                bank.getAccountsBlt(db, (accounts) => {
                    let response = {
                        success: true,
                        message: "Accounts Retreived",
                        data: accounts
                    };
                    res.status(200);
                    res.json(response)
                }, req.query.blt);
            } else if(typeof req.query.bgt == "string") {
                bank.getAccountsBgt(db, (accounts) => {
                    let response = {
                        success: true,
                        message: "Accounts Retreived",
                        data: accounts
                    };
                    res.status(200);
                    res.json(response)
                }, req.query.bgt);
            } else {
                bank.getAccounts(db, (accounts) => {
                    let response = {
                        success: true,
                        message: "Accounts Retreived",
                        data: accounts
                    };
                    res.status(200);
                    res.json(response)
                });
            }            
        });
    },

    addAccount: (req, res) => {
        const customer = req.body.customer
        const account = req.body.account

        MongoClient.connect(mongodb, { useNewUrlParser: true, useUnifiedTopology: true}, (err, client) => {
            console.log("Connected to MongoDB");
            let db = client.db('bank');
            bank.addAccount(db, customer, account);
            let response = {
                success: true,
                message: "Account Created"
            };
            res.status(200);
            res.json(response)
        })
    },

    updateAccount: (req, res) => {
        const customer = req.body.customer;
        const accountNameRef = req.body.account_ref;
        const accountNewData = req.body.account;

        MongoClient.connect(mongodb, { useNewUrlParser: true, useUnifiedTopology: true}, (err, client) => {
            console.log("Connected to MongoDB");
            let db = client.db('bank');
            bank.updateAccount(db, customer, accountNameRef, accountNewData);
            let response = {
                success: true,
                message: "Account Created"
            };
            res.status(200);
            res.json(response)
        })
    }
}

app.get('/accounts', (req, res) => bankApi.getAccounts(req, res));
app.post('/accounts', jsonParser, (req, res) => bankApi.addAccount(req, res));
app.put('/accounts', jsonParser, (req, res) => bankApi.updateAccount(req, res));


app.listen(port, () => {

})
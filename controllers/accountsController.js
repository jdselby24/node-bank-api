const dbService = require('../services/dbService');
const bankService = require('../services/bankService');

const getAccounts = (req, res) => {
    dbService((db) => {
        bankService.getAccounts(db, (documents) => {
            if(typeof req.query.blt == "string") {
                bankService.getAccountsBlt(db, (accounts) => {
                    let response = {
                        success: true,
                        message: "Accounts Retreived",
                        data: accounts
                    };
                    res.status(200);
                    res.json(response)
                }, req.query.blt);
            } else if(typeof req.query.bgt == "string") {
                bankService.getAccountsBgt(db, (accounts) => {
                    let response = {
                        success: true,
                        message: "Accounts Retreived",
                        data: accounts
                    };
                    res.status(200);
                    res.json(response)
                }, req.query.bgt);
            } else {
                bankService.getAccounts(db, (accounts) => {
                    let response = {
                        success: true,
                        message: "Accounts Retreived",
                        data: accounts
                    };
                    res.status(200);
                    res.json(response)
                });
            }   
        })
    })
}

const addAccount = (req, res) => {

    const customer = req.body.customer
    const account = req.body.account

    dbService((db) => {
        bankService.addAccount(db, account);
        let response = {
            success: true,
            message: "Account Created"
        };
        res.status(200);
        res.json(response)
    });
}

const updateAccount = (req, res) => {

    const accountNameRef = req.body.account_ref;
    const moneyIn = req.body.valueToAdd;

    console.log(req.body)

    dbService((db) => {
        bankService.updateAccount(db, accountNameRef, moneyIn);
        let response = {
            success: true,
            message: "Account Updated"
        };
        res.status(200);
        res.json(response)
    })

}

module.exports.getAccounts = getAccounts;
module.exports.addAccount = addAccount;
module.exports.updateAccount = updateAccount;
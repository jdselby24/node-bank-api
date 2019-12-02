const getAccounts = (db, callback) => {
    var accountsData = db.collection('accounts');
    accountsData.find({}).toArray((err, accounts) => {
        callback(accounts);
    });
}

const getAccountsBlt = (db, callback, query) => {
    var accountsData = db.collection('accounts');
    query = parseFloat(query)
    accountsData.find({"account.balance": { $lt: query } }).toArray((err, accounts) => {
        callback(accounts);
    })
}

const getAccountsBgt = (db, callback, query) => {
    var accountsData = db.collection('accounts');
    query = parseFloat(query)
    accountsData.find({"account.balance": { $gt: query } }).toArray((err, accounts) => {
        callback(accounts);
    })
}

const addAccount = (db, account) => {
    var accountsData = db.collection('accounts');
    accountsData.insertOne({account: account})
}

const updateAccount = (db, accountNameRef, moneyIn) => {
    var accountsData = db.collection('accounts');
    accountsData.updateOne({"account.name": {$eq: {accountNameRef}}}, {$inc: {"account.balance": moneyIn}});
}

module.exports.getAccounts = getAccounts;
module.exports.getAccountsBlt = getAccountsBlt;
module.exports.getAccountsBgt = getAccountsBgt;
module.exports.addAccount = addAccount;
module.exports.updateAccount = updateAccount;

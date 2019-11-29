const getCustomers = (db, callback) => {
    var accountsData = db.collection('accounts');
    accountsData.find({}, { customer: 1, _id: 0 }).toArray((err, accounts) => {
        callback(accounts);
    })
}

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

const addAccount = (db, customerName, account) => {
    var accountsData = db.collection('accounts');
    accountsData.insertOne({customer: customerName, account: account})
}

module.exports.getCustomers = getCustomers;
module.exports.getAccounts = getAccounts;
module.exports.getAccountsBlt = getAccountsBlt;
module.exports.getAccountsBgt = getAccountsBgt;
module.exports.addAccount = addAccount;

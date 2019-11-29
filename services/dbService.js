const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://localhost:27017';
const dbname = 'bank';
const Client = new MongoClient(url, 
    {
        useNewUrlParser: true, 
        useUnifiedTopology: true
    });

const dbService = (cb) => {
    Client.connect(() => {
        let db = Client.db(dbname);
        cb(db);
    })
}

module.exports = dbService;
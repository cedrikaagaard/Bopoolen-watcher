const MongoClient = require('mongodb').MongoClient;

module.exports = class DatabaseHandler {
    constructor(mongodbUrl, dbName) {
        this.mongodbUrl = mongodbUrl;
        this.dbName = dbName;
        this.mongodbOptions = {
            useNewUrlParser: true
        }
    }

    _eatIds(idArray, resolve, reject, self) {
        let client;
        let db;
        let collection;
        let result;
                
        MongoClient.connect(self.mongodbUrl, self.mongodbOptions)
        
        .then(mongodbClient => {
            client = mongodbClient;
            db = client.db(self.dbName);
            collection = db.collection('ids');
            
            return collection.find().toArray();
        })
        
        .then(ids => {
            const storedIds = ids.map(_ => _.id);
            const newIds = idArray.filter(_ => !storedIds.includes(_));
            const idObjects = newIds.map(_ => ({id: _}));
            
            result = newIds;
            
            if (idObjects.length !== 0) {
                return collection.insertMany(idObjects);
            }
            
            else {
                client.close();
                resolve([]);
            }
        })
        
        .then(() => {
            client.close();
            resolve(result);
        })
        
        .catch(err => {
            if (client) client.close();
            reject(err);
        });
    }
    
    eatIds(idArray) {        
        return new Promise((resolve, reject) => {
            this._eatIds(idArray, resolve, reject, this);
        });
    }
}
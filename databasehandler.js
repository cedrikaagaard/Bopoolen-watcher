const MongoClient = require('mongodb').MongoClient;

module.exports = class DatabaseHandler {
    constructor(mongodbUrl, dbName) {
        this.mongodbUrl = mongodbUrl;
        this.dbName = dbName;
        this.mongodbOptions = {
            useNewUrlParser: true
        }
    }
    
    _addUser(resolve, reject, user) {
        let client, db, collection;
        
        MongoClient.connect(this.mongodbUrl, this.mongodbOptions)
        
        .then(mongodbClient => {
            client = mongodbClient;
            db = client.db(this.dbName);
            collection = db.collection('users');
            collection.insertOne(user);
            client.close();
            resolve();
        })
        
        .catch(err => {
            if (client) client.close();
            reject(err);
        });
    }
    
    addUser(user) {
        return new Promise((resolve, reject) => {
            this._addUser(resolve, reject, user);
        });
    }
    
    _getUsers(resolve, reject) {
        let client;
        let db;
        let collection;
        
        MongoClient.connect(this.mongodbUrl, this.mongodbOptions)
        
        .then(mongodbClient => {
            client = mongodbClient;
            db = client.db(this.dbName);
            collection = db.collection('users');
            
            return collection.find().toArray();
        })
        
        .then(users => {
            client.close();
            resolve(users);
        })
        
        .catch(err => {
            if (client) client.close();
            reject(err);
        });
    }
    
    getUsers() {
        return new Promise((resolve, reject) => {
            this._getUsers(resolve, reject);
        });
    }
            

    _eatIds(idArray, resolve, reject) {
        let client;
        let db;
        let collection;
        let result;
                
        MongoClient.connect(this.mongodbUrl, this.mongodbOptions)
        
        .then(mongodbClient => {
            client = mongodbClient;
            db = client.db(this.dbName);
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
            this._eatIds(idArray, resolve, reject);
        });
    }
}
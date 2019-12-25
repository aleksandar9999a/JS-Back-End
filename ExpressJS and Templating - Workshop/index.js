const dbUrl = 'mongodb://localhost:27017';
const { MongoClient } = require('mongodb');
const client = new MongoClient(dbUrl);
client.connect(function(err){
    if (err) { console.error(err); return }
    
    const db = client.db('test');
    const users = db.collection('users');

    users.deleteMany({name: 'Pavel'}).then(deleteEntity => {
        console.log(deleteEntity);
        
    })
    
})





// const env = process.env.NODE_ENV || 'development';
// global.__basedir = __dirname;

// const config = require('./config/config')[env];
// const app = require('express')();

// require('./config/express')(app);
// require('./config/routes')(app);

// app.listen(config.port, console.log(`Listening on port ${config.port}! Now its up to you...`));
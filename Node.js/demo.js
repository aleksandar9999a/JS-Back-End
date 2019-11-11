const fileManger = require('./file-manger');
const _ = require('lodash');

fileManger.readUsers(function(err, content){
    if (err) {
        console.error(err);
        return;
    }

    const userArray = content.split(', ');
    console.log(_.chunk(userArray, 2));
});

console.log('Hello World!');

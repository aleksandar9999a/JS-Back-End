const fileManger = require('./file-manger');
const _ = require('lodash');

const callBack = function (err, content) {
    if (err) {
        console.error(err);
        return;
    }

    const userArray = content.split(', ');
    console.log(_.chunk(userArray, 2));
};

fileManger.readUsers(callBack);

console.log('Hello');
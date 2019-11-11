const fileManger = require('./file-manger');

fileManger.readUsers(function(err, content){
    if (err) {
        console.error(err);
        return;
    }

    console.log(content);
});


console.log('Hello World!');

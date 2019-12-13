const express = require('express');
const api = require('./api');
const port = 8080;
const app = express();


function defaultHandler(req, res) {
    res.send('Hello World!');
}

app.use((req, res, next) => {
    console.log(`Time: ${Date.now()}`);;
    next();
});

app.get('/', defaultHandler);
app.use('/api', api);

app.use(function(err, req, res, next){
    console.error(err.stack);
    res.status(500).send('something broke!')
})

app.listen(port, () => {
    console.log(`Listen on ${port}`);
})

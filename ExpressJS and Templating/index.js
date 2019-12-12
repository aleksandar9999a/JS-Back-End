const express = require('express');
const api = require('./api');
const port = 8080;
const app = express();

function defaultHandler(req, res) {
    res.send('Hello World!');
}

app.use('/api', api);
app.get('/', defaultHandler);

app.listen(port, () => {
    console.log(`Listen on ${port}`);
})

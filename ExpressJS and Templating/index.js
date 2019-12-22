const express = require('express');
const handlebars = require('express-handlebars')
const api = require('./api');
const port = 8080;

const users = require('./users');

const app = express();

app.use(express.static(__dirname + '/public'));
app.engine('.hbs', handlebars({ extname: '.hbs' }));
app.set('views', __dirname + '/views');

function defaultHandler(req, res) {
    res.render('index.hbs', {title: 'Title', body: 'Test', users});
}

app.use((req, res, next) => {
    console.log(`Time: ${Date.now()}`);;
    next();
});

app.use('/api', api);
app.get('/', defaultHandler);

app.use(function(err, req, res, next){
    console.error(err.stack);
    res.status(500).send('something broke!')
})

app.listen(port, () => {
    console.log(`Listen on ${port}`);
})

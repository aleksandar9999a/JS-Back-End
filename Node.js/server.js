const http = require('http');
const url = require('url');


const port = 8080;
const app = http.createServer(function (req, res) {
    const { pathname } = url.parse(req.url);
    if(pathname === '/') {
        res.end('home');
        return;
    }

    if(pathname === '/about') {
        res.end('about');
        return;
    }
    
});

app.listen(port, function () {
    console.log(`Server is listening on ${port}`);

});
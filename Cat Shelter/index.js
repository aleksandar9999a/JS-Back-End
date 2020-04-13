const http = require('http');
const port = 3000;

const app = http.createServer(function(req, res) {
    res.writeHead(200, {
        'Content-Type': 'text/plain'
    });

    res.write('Hello');
    res.end();
});

app.listen(port, function() {
    console.log(`Listen on port ${port}`);
    
})
const http = require('http');
const port = 3000;
const handlers = require('./handlers');

const app = http.createServer(function(req, res) {
    for (let handler of handlers) {
        if (!handler(req, res)) {
            break;
        }
    }
});

app.listen(port, function() {
    console.log(`Listen on port ${port}`);
    
})
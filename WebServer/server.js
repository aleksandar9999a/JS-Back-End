const http = require('http');
const port = 8080;

const app = http.createServer(function (req, res) {
    res.write('Hello');
    setTimeout(
        function () {
            res.write(' ');
            res.end('World!')
        },
        5000
    )
});

app.listen(port, function () {
    console.log(`Listen for pedals on ${port}`);
});
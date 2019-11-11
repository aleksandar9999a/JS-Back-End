const http = require('http');
const url = require('url');
const port = 8080;

const app = http.createServer(function (req, res) {
    // res.write('Hello');
    // setTimeout(
    //     function () {
    //         res.write(' ');
    //         res.end('World!')
    //     },
    //     5000
    // )

    const { pathname } = url.parse(req['url']);
    if(pathname === '/'){
        res.end('Home!')
        return
    }
    
    if (pathname ==='/about') {
        res.end('About')
        return
    }
});

app.listen(port, function () {
    console.log(`Listen for pedals on ${port}`);
});
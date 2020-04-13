const url = require('url');
const fs = require('fs');

function getContentType(url) {
    if (url.endsWith('css')) {
        return 'text/css';
    }

    if (url.endsWith('html')) {
        return 'text/html';
    }
    
    if (url.endsWith('png')) {
        return 'text/png';
    }

    if (url.endsWith('js')) {
        return 'text/js';
    }
    
    if (url.endsWith('jpg')) {
        return 'text/jpg';
    }

    return 'text/plain';
}

module.exports = function(req, res) {
    const { pathname } = url.parse(req.url);

    if (pathname.startsWith('/content') && req.method === 'GET') {
        fs.readFile(`./${pathname}`, 'utf-8' ,function (err, data) {
            if (err) {
                console.log(err);
                res.writeHead(404, {
                    'Content-Type': 'text/plain'
                });
                res.write('Error in Home!');
                res.end();
                return;
            }

            res.writeHead(200, {
                'Content-Type': getContentType(pathname)
            });
            res.write(data);
            res.end();
        });
        return;
    }

    return true;
}
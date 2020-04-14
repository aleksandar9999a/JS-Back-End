const url = require('url');
const fs = require('fs');

const types = {
    'css': 'text/css',
    'js': 'application/javascript',
    'png': 'image/png',
    'html': 'text/html',
    'ico': 'image/png',
    'jpg': 'image/png'
}

function getContentType(url) {
    const key = Object.keys(types).filter(k => url.endsWith(k));
    
    if (key[0]) {
        return types[key[0]];
    }

    return 'text/plain';
}

module.exports = function (req, res) {
    const { pathname } = url.parse(req.url);

    if (pathname.startsWith('/content') && req.method === 'GET') {
        if (pathname.endsWith('png') || pathname.endsWith('jpeg') || pathname.endsWith('jpg') && req.method === 'GET') {
            fs.readFile(`./${pathname}`, function(err, data) {
                if (err) {
                    console.log(err);

                    res.writeHead(404, {
                        'Content-Type': 'text/plain'
                    });

                    res.write('Error was found');
                    res.end();
                    return;
                }

                res.writeHead(200, {
                    'Content-Type': getContentType(pathname)
                });

                res.write(data);
                res.end();
            });
        } else {
            fs.readFile(`.${pathname}`, 'utf-8', function(err, data) {
                if (err) {
                    console.log(err);

                    res.writeHead(404, {
                        'Content-Type': 'text/plain'
                    });

                    res.write('Error was found');
                    res.end();
                    return;
                }

                res.writeHead(200, {
                    'Content-Type': getContentType(pathname)
                });

                res.write(data);
                res.end();
            });
        }
    } else {
        return true;
    }
};
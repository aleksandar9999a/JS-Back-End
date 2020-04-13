const url = require('url');
const fs = require('fs');
const path = require('path');
// const cats = require('./../data/cats');

module.exports = function (req, res) {
    const { pathname } = url.parse(req.url);

    if (pathname === '/' && req.method === 'GET') {
        const filePath = path.normalize(path.join(__dirname, './../views/home/index.html'));
        fs.readFile(filePath, function (err, data) {
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
                'Content-Type': 'text/html'
            });
            res.write(data);
            res.end();
        });

        return;
    }

    return true;
}
const url = require('url');
const fs = require('fs');
const path = require('path');
const qs = require('querystring');
// const formidable = require('formidable');
const breeds = require('./../data/breeds');
const cats = require('./../data/cats');

function loadPath(pathUrl, res) {
    const filePath = path.normalize(path.join(__dirname, pathUrl));
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
}

module.exports = function (req, res) {
    const { pathname } = url.parse(req.url);

    if (pathname === '/cats/add-cat' && req.method === 'GET') {
        loadPath('./../views/addCat.html', res);
        return;
    }

    if (pathname === '/cats/add-breed' && req.method === 'GET') {
        loadPath('./../views/addBreed.html', res);
        return;
    }

    return true;
}
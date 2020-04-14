const url = require('url');
const fs = require('fs');
const mv = require('mv');
const path = require('path');
const qs = require('querystring');
const formidable = require('formidable');
const breeds = require('./../data/breeds');
const cats = require('./../data/cats');

const types = {
    breed: function (res, data) {
        res.write(data);
    },
    cat: function (res, data) {
        let catBreedPlaceholder = breeds.map((breed) => `<option value="${breed}">${breed}</option>`);
        let modifiedData = data.toString().replace('{{catBreeds}}', catBreedPlaceholder);

        res.write(modifiedData);
    }
}

function loadPath(pathUrl, type, res) {
    const filePath = path.normalize(path.join(__dirname, pathUrl));
    const index = fs.createReadStream(filePath);

    if (types[type]) {
        index.on('data', types[type].bind(types, res));
        index.on('error', console.log);
        index.on('end', function () { res.end(); });
        return;
    }
    throw Error('Unknown type!');
}

function createBreed(req, res) {
    let formData = '';
    req.on('data', (data) => {
        formData += data;
    });
    req.on('end', () => {
        let body = qs.parse(formData);
        fs.readFile('./data/breeds.json', function (err, data) {
            if (err) {
                console.log(err);
                throw err;
            }
            let breeds = JSON.parse(data);
            breeds.push(body.breed);
            let json = JSON.stringify(breeds);
            fs.writeFile('./data/breeds.json', json, 'utf-8', function () {
                console.log('The breed was added successfully!');
            });
        });
        res.writeHead(200, { location: '/' });
        res.end();
    });
}

function createCat(req, res) {
    let form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        if (err) {
            throw err;
        }
        let oldpath = files.upload.path;
        let newPath = path.normalize(path.join(__dirname, './../content/images/' + files.upload.name));
        mv(oldpath, newPath, function (err) {
            if (err) {
                throw err;
            }
            console.log('Files was uploaded successfully!');
        });
        fs.readFile('./data/cats.json', 'utf-8', function (err, data) {
            if (err) {
                throw err;
            }
            let allCats = JSON.parse(data);
            allCats.push({ id: allCats.length + 1, ...fields, image: files.upload.name });
            let json = JSON.stringify(allCats);
            fs.writeFile('./data/cats.json', json, function () {
                res.writeHead(200, { location: '/' });
                res.end();
            });
        });
    });
}

module.exports = function (req, res) {
    const { pathname } = url.parse(req.url);

    if (pathname === '/cats/add-cat' && req.method === 'GET') {
        loadPath('./../views/addCat.html', 'cat', res);
        return;
    }

    if (pathname === '/cats/add-breed' && req.method === 'GET') {
        loadPath('./../views/addBreed.html', 'breed', res);
        return;
    }

    if (pathname === '/cats/add-cat' && req.method === 'POST') {
        createCat(req, res);
    }

    if (pathname === '/cats/add-breed' && req.method === 'POST') {
        createBreed(req, res);
    } else {
        return true;
    }
}

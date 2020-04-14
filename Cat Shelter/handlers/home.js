const url = require('url');
const fs = require('fs');
const path = require('path');
const cats = require('./../data/cats');

module.exports = function (req, res) {
    const { pathname } = url.parse(req.url);

    if (pathname === '/' && req.method === 'GET') {
        const filePath = path.normalize(path.join(__dirname, './../views/home/index.html'));
        const index = fs.createReadStream(filePath);

        index.on('data', function (data) {

            let modifiedCats = cats.map(cat => {
                const img = path.join(`./content/images/${cat.image}`);
                
                return `<li>
                    <img src="${img}" alt="${cat.name}">
                    <h3>${cat.name}</h3>
                    <p><span>Breed: </span>${cat.breed}</p>
                    <p><span>Description: </span>${cat.description}</p>
                    <ul class="buttons">
						<li class="btn edit"><a href="/cats-edit/${cat.id}">Change Info</a></li>
						<li class="btn delete"><a href="/cats-find-new-home/${cat.id}">New Home</a></li>
					</ul>
                </li>
            `})

            let modifiedData = data.toString().replace('{{cats}}', modifiedCats);
            res.write(modifiedData);
        })

        index.on('error', console.log);

        index.on('end', function () {
            res.end();
        });

        return;
    }

    return true;
}
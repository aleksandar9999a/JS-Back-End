const express = require('express');
const router = express.Router();

const users = [
    {
        id: 1,
        name: 'Pesho'
    }
];

router.get('/user/', (req, res) => {
    res.send(users);
})

router.get('/user/:id', (req, res) => {
    res.send(users.find( x => x.id === Number(req.params.id)));
})

module.exports = router;
const express = require('express');
const users = require('./users');
const router = express.Router();


function middleware(req, res, next){
    next();
}

router.get('/user/', middleware, (req, res) => {
    res.send(users);
})

router.get('/user/:id', (req, res) => {
    res.send(users.find( x => x.id === Number(req.params.id)));
})

module.exports = router;
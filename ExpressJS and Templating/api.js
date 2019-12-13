const express = require('express');
const users = require('./users');
const router = express.Router();


function getCurrUser(req, res, next){
    next(undefined);
}

function auth(req, res, next){
    next(!!req.user ? undefined : new Error('Not allowed!'))
}

router.get('/user/', getCurrUser, auth, (req, res) => {
    res.send(users);
})

router.get('/user/:id', (req, res) => {
    res.send(users.find( x => x.id === Number(req.params.id)));
})

module.exports = router;
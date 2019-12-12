const express = require('express');
const port = 8080;
const app = express();

const users = [
    {
        id: 1,
        name: 'Pesho'
    }
]

app.get('/', (req, res) => {
    res.send('Hello World!');
})


app.get('/user/:id', (req, res) => {
    const user = users.find( x => x.id === Number(req.params.id));
    res.send(user)
})

app.listen(port, () => {
    console.log(`Listen on ${port}`);
})
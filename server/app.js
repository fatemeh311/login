const _ = require('lodash');
const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');

var ACCESSLEVEL = [
    { 'id': 1, 'username': 'ali', 'isAdmin': true },
    { 'id': 2, 'username': 'reza' , 'isAdmin': false },
    { 'id': 3, 'username': 'sara' , 'isAdmin': false },
];

function getUsers() {
    return ACCESSLEVEL;
}

app.use(bodyParser.json());
app.use(expressJwt({secret: 'todo-app-super-shared-secret'}).unless({path: ['/api/auth']}));

app.get('/', function (req, res) {
    res.send('Angular JWT API Server')
});
app.post('/api/auth', function(req, res) {
    const body = req.body;

    const user = ACCESSLEVEL.find(user => user.username == body.username);
    if(!user || body.password != 'todo') return res.sendStatus(401);
    
    var token = jwt.sign({userID: user.id}, 'todo-app-super-shared-secret', {expiresIn: '2h'});
    res.send({token});
});

app.get('/api/users', function (req, res) {
    res.type("json");
    res.send(getUsers());
});

app.listen(4200, function () {
    console.log('API Server on port 4200!')
});

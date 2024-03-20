"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var login_1 = require("./login");
var getcompose_1 = require("./getcompose");
// import * as ap1 from './ap1';
var app = express();
app.use(express.json());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader('Content-Type', 'application/json');
    next();
});
app.use('/', login_1.default);
app.use('/getcompose', getcompose_1.default);
app.listen(3000, function () {
    console.log('Server listening on port 3000');
});

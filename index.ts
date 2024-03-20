


import * as express from 'express';
import  login from './login';
import  getcompose from './getcompose';
// import * as ap1 from './ap1';

const app = express();

app.use(express.json());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader('Content-Type', 'application/json');
    next();
});

app.use('/', login);
app.use('/getcompose', getcompose);

app.listen(3000, () => {
    console.log('Server listening on port 3000');
});
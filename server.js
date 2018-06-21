// 3rd party headers
const express = require('express'); // used for the database
const bodyParser = require('body-parser'); // for the database
const bcrypt = require('bcrypt-nodejs'); // hashing the password
const cors = require('cors');
const knex = require('knex'); // database builder
// controller headers
const register = require('./controllers/register.js');
const signin = require('./controllers/signin.js');
const profile = require('./controllers/profile.js');
const image = require('./controllers/image.js');

// this code below copied from the knex site under the installation segment
// this is used to connect the front end to the backend
const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'Admin-Michael',
    password : 'Aperture9@1',
    database : 'face-detect'
  }
});

// this logs all the connection that knex made for our postgres database
// console.log(postgres.select('*').from('users'));

// db.select('*').from('users').then(data => {
//     console.log(data);
// });

// code below initialises the database and other 3rd party components like bodyParser and cors
const app = express();
app.use(bodyParser.json());
app.use(cors());

// initialise the / symbol to send and receive data or response to the database named users
app.get('/', (req, res) => {
    res.send(database.users);
});

// sending data to the database - send data to the db and check for comparisons
app.post('/signin', (req, res) => {
    signin.handleSignin(req, res, db, bcrypt)
}); // dependency injection
// dependency injection makes an headers available to the file you are injecting it to, in this case - register.handleRegister in register.js

// sending data to the database - to add data to the database
app.post('/register', (req, res) => { 
    register.handleRegister(req, res, db, bcrypt) 
}); // dependency injection
// dependency injection makes an headers available to the file you are injecting it to, in this case - register.handleRegister in register.js

// this is to fetch some data from the database and output
app.get('/profile/:id', (req, res) => { 
    profile.handleProfileGet(req, res, db) 
}); // dependency injection
// dependency injection makes an headers available to the file you are injecting it to, in this case - register.handleRegister in register.js

// this is to update data in the db
app.put('/image', (req, res) => { 
    image.handleImage(req, res, db)
});
app.post('/imageurl', (req, res) => {
    image.handleApiCall(req, res)
});

// we initialise this to use port 3000 as the localhost for the app
app.listen(3000, () => {
    console.log('app is running on port 3000')
});



/* 
PROJECT GUIDELINES:

    / --> respond = this is working
    /signin --> POST = output is either success/fail
    /register --> POST = user
    /profile/:userId --> GET = user
    /image --> PUT --> user updated
*/
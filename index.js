const express = require('express');
const app = express();
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

var bodyParser = require('body-parser');
app.use(bodyParser({limit: '10mb'}));
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json

app.use(bodyParser.json())

var db = require('./app/helpers/db')

app.get('/', (req, res) => res.send('WOTOPA API backend says Hi!'));

var signupRoute = require('./app/controllers/signupCtrl'); //importing route
var loginRoute = require('./app/controllers/loginCtrl'); //importing route
var listingRoute = require('./app/controllers/listingCtrl'); //importing route
loginRoute(app);
signupRoute(app);
listingRoute(app);

db.connect(db.MODE_PRODUCTION, function(err) {
    if (err) {
        console.log('Unable to connect to MySQL.')
        process.exit(1)
    } else {
        app.listen(8080, function() {
            console.log('Listening on port 8080...');
        });
    }
})

// app.use(require('./controllers'));
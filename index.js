const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const flash = require('connect-flash');
const compression = require('compression');
const fileUpload = require('express-fileupload')
const session = require('express-session');
const router = require('./data/router/index');
require("dotenv").config();

app.use(express.static(path.join(__dirname,('src/public'))));
app.use(express.static(path.join(__dirname,('node_modules/mdb-ui-kit/css'))));
app.use(express.static(path.join(__dirname,('node_modules/mdb-ui-kit/js'))));
app.use(express.static(path.join(__dirname,('node_modules/jquery/dist'))));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/views'));

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}));
app.use(flash())
app.use(fileUpload())

app.use(session({
    secret: process.env.SECRET,
    permission: process.env.PERMISSION,
    saveUninitialized: false,
    resave: false
}));

mongoose.set('strictQuery', false);
async function connectDB() {
    try {
        await mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}

connectDB().then(r => console.log('Application Running...'));

const port = process.env.PORT;
app.listen(port || 8000,() => { // changed from app to httpServer
    console.log(`App listening on ${port}`)
});

app.use('/', compression(), router)

app.use(function(req, res, next){
    res.status(404).render('notFound.ejs', {title: "Sorry, page not found"});
});
exports.__esModule = true;
var express = require(  'express');
var mongoose = require(  'mongoose');
var cookieparser = require(  'cookie-parser');
var expressSession = require(  'express-session');

var router = require(  './router');

var cors = require(  'cors');

var hsts = require(  'hsts');

var nodemailer = require(  'nodemailer');

var app = express();
const SERVER_PORT  = process.env.SERVER_PORT || 5050;
const URL_CORS = process.env.URL_CORS || "https://cocktail.pechemelba.fr/";
const MONGODB_URI = process.env.MONGODB_URI || '';

// middleware cookie-parser pour stocker info
app.use(cookieparser());
app.use(expressSession({
    resave: true, //to tell session is still active(update) even isn't modified
    saveUninitialized: false,//not store in session store if session isn't modified for such time(delete session)
    secret: process.env.SESSION_SECRET //key used for encrypting cookies
}));

app.use(cors({
    "origin": [URL_CORS], 
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "allowedHeaders": ["Origin", " X-Requested-With", "Content-Type", "Accept","Content-Security-Policy","X-Content-Type-Options"],
    "credentials": true,
    
   
     
    "maxAge": 3600 //cache this information for 3600 seconds ,  need to make a new OPTIONS request every single time.
}));

app.use(function(req, res, next) {
    res.setHeader("Content-Security-Policy", " img-src *; frame-ancestors 'none' ");// 'https://cocktail.pechemelba.fr:443' 'self' allow data = require(  own site and the api   add frame-ancestors to avoid display another page in a iframe
                  res.setHeader("X-Content-Type-Options","nosniff");//avoid to upload a file into the server passing it off as another mime (ex: an html for a jpeg)
                  res.setHeader("Referrer-Policy", "origin");
                   //if no-referer don't show the url in referer where a request is made = require(  (=the last page before the request) use for stat
                                  //( for passwor reset by exemple dont' show the tokenrestpassword in the header referer")
                                  // origin just show events-....fr/ for all the page
    return next();
});

app.use(hsts({
  maxAge: 31536000  // only use HTTPS for two years in seconde
}))


app.use(router["default"]);

async function run() {
  await mongoose.connect(MONGODB_URI, {useNewUrlParser : true}, (err) => {
    if (err) {
      return;
    }
    // lancer l'appli
    app.listen(SERVER_PORT, () => {
      console.log(`App running on port ${SERVER_PORT}`);
    });

  })
}

run();



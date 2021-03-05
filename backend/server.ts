import express from 'express';
import mongoose from 'mongoose';
import cookieparser from 'cookie-parser';
import expressSession from 'express-session';
import router from './router';

import cors from 'cors';

import hsts from 'hsts';

import nodemailer from 'nodemailer';

const app: express.Express = express();
const SERVER_PORT  = process.env.SERVER_PORT || 5050;
const URL_CORS = process.env.URL_CORS || "https://localhost:3000";
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
    /*"Content-Security-Policy": "script-src 'self' https://apis.fulevent frame-ancestors 'none' "// allow data from own site and the api
     add frame-ancestors to avoid display another page in a iframe
    "X-Content-Type-Options":"nosniff" //avoid to upload a file into the server passing it off as another mime (ex: an html for a jpeg)  
     "Referrer-Policy": "origin"  //if no-referer don't show the url in referer where a request is made from (=the last page before the request) use for stat
                                  //( for passwor reset by exemple dont' show the tokenrestpassword in the header referer")
                                  // origin just show events-....fr/ for all the page
     */ 
    "maxAge": 3600 //cache this information for 3600 seconds ,  need to make a new OPTIONS request every single time.
}));
/*
app.use(hsts({
  maxAge: 31536000  // only use HTTPS for two years in seconde
}))
*/

app.use(router);

async function run() {
  await mongoose.connect(MONGODB_URI, {useNewUrlParser : true}, (err: any) => {
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



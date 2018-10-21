'use strict';
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const config = require('./config')();
// const hbs  = require('express-handlebars').create({defaultLayout:'main.hbs'});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// app.use(express.static('./views'))
 
// app.engine('hbs', hbs.engine);
// app.set('view engine','hbs');
 
require('./controller')(app);

// app.get('/',(request,response)=>{
//   response.render('home',{title: 'Home'});
// });


const onServerStart = () => {
	const ENVIROINMENT = process.env.NODE_ENV || config.mode;
    const message = `Server Listening On Port ${config.port}, mode=${ENVIROINMENT}`;
    console.log(message);
};

app.listen(config.port, onServerStart);
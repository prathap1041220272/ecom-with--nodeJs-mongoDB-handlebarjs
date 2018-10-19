'use strict';
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const config = require('./config')();

const { Catlog } = require('./app/models');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/create',(req,res)=>{
	const catlog = new Catlog(req.body)
	catlog.save()
	.then((data)=>{
		res.send(data);
		console.log(data);
	})
	.catch(err=>{
		res.send(err.message);
		console.log(err.message);
	})
})
const onServerStart = () => {
	const ENVIROINMENT = process.env.NODE_ENV || config.mode;
    const message = `Server Listening On Port ${config.port}, mode=${ENVIROINMENT}`;
    console.log(message);
};

app.listen(config.port, onServerStart);
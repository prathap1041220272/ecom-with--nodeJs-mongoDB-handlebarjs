'use strict';
const express = require('express');
const { Catlog } = require('../models');
const uuid = require('uuid');
const path = require('path');
const multer = require('multer');
const router = express.Router();
const hbs  = require('express-handlebars').create({defaultLayout:'main.hbs'});

router.engine('hbs', hbs.engine);
router.set('view engine','hbs');

const storage = new multer.diskStorage({
    destination: './public/images',
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        const fileName = `${uuid()}${ext}`;
        cb(null, fileName);
    }
});
const upload = multer({ storage });

router.route('/')
	.post(upload.single('file'), (req,res)=>{
		const body = req.body;
        const { filename: image } = req.file || {};
        Object.assign(body, { image });
		const catlog = new Catlog(body); 
		catlog.save()
		.then((data)=>{
			 res.json(data);
			 res.render('home',{title: 'Home'});
		})
		.catch(err=>{
			res.status(500).json({message: err.message})
		});
	})
	.get((req,res)=>{
		Catlog.find()
		.then(data=>{
			res.json(data);
		})
		.catch(err=>{
			res.status(500).json({message: err.message})
		})
	});
	
router.route('/:id')
	.get((req,res)=>{
		const { id } = req.params;
		Catlog.findOne({'_id':id})
		.then(data => {
			res.json(data);
		})
		.catch(err => {
			res.status(500).json({message: err.message})
		})
	})
	.delete((req,res)=>{
		const { id } = req.params;
		Catlog.findOneAndDelete({ '_id': id})
		.then(data => {
			res.json(data);
		})
		.catch(err => {
			res.status(500).json({message: err.message})
		})
	})

module.exports = router;
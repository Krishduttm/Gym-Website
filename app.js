const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
const mongoose = require('mongoose');
const bodyparser = require("body-parser");
const { request } = require("http");
const { response } = require("express");
mongoose.connect('mongodb://localhost/Form', {useNewUrlParser: true, useUnifiedTopology: true });
const port = 80;

var gymformSchema = new mongoose.Schema({
    name: String,
    age: String,
    gender: String,
    date : String,
    address: String,
    more: String
  });

var gymform = mongoose.model('gymform', gymformSchema);

var contactformSchema = new mongoose.Schema({
    name: String,
    number: String,
    email: String,
    address: String,
    question: String
  });

var contactform = mongoose.model('contactform', contactformSchema);




app.use('/static', express.static('static'));
app.use(express.urlencoded())

app.set('view engine', 'pug');

app.set('views', path.join(__dirname,'views'));

//endpoints
app.get(`/`,(req,res)=>{
    const params= {'title':'Home'}
    res.status(200).render(`index.pug`, params)
})
app.get(`/contact`,(req,res)=>{
    const params= {'title':'Contact'}
    res.status(200).render(`contact.pug`, params)
})
app.get(`/about`,(req,res)=>{
    const params= {'title':'about'}
    res.status(200).render(`about.pug`, params)
})
app.get(`/back`,(req,res)=>{
    const params= {'title':'Home'}
    res.status(200).render(`index.pug`, params)
})
app.post(`/gym`, (req,res)=>{
    var myData = new gymform(req.body);
    myData.save().then(()=>{
        const params= {'title':'Home'}
        res.status(200).render(`index.pug`, params)});
    });

app.post(`/contact`, (req,res)=>{
    var mydata = new contactform(req.body);
    mydata.save().then(()=>{
        const params= {'title':'Home'}
        res.status(200).render(`index.pug`, params)});
});

app.listen(port, ()=>{
    
    console.log(`app has started on port ${port}` )
});
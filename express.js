const express = require('express');
const mysql = require('mysql');
const multer = require('multer');
const storage = multer.memoryStorage();
const url = require('url');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser')
let urlencodedParser = bodyParser.urlencoded({
    extended: false
})
const { check, validationResults } = require('express-validator')
const app = express();
const path = require('path');
const { error } = require('console');
const { query } = require('express');
app.set('view engine', 'ejs')
    // -- -- -- -- -- -- -- -- for landing---------------------
app.get('/', (req, res) => {
        res.sendFile(path.join(__dirname, 'landing.html'));
    })
    // -- -- -- -- -- -- -- -- for login---------------------
app.get('/login', (req, res) => {

    res.sendFile(path.join(__dirname, 'login.html'));
});
app.get('/homepage', (req, res) => {
    res.sendFile(path.join(__dirname, 'homepage.html'))
})

let values; //this is a grobal variable containing the data of the user from the database;

let userLoginEmail;
app.post('/validate', urlencodedParser, (req, res) => {
        let loginData = req.body
        let loginEmail = req.body.email
        let select = 'SELECT * FROM USER WHERE email = ?'

        db.query(select, loginEmail, (err, results) => {
            if (err) throw err;
            values = results[0];
            // console.log(values)
            if (loginData.email == values.email && loginData.username == values.Fullname && loginData.password == values.password) {
                res.render('homepage', { username: values.Fullname, email: values.email })
            } else {

                res.render('invalid');
            }
        })
    })
    // -- -- -- -- -- -- -- -- for signup---------------------
app.get('/signup', (req, res) => {
        res.render('signup')
    })
    // -- -- -- -- -- -- -- -- for homepage---------------------------------------------------------------//
app.post('/homepage', (req, res) => {
        res.end('This a homePage');
    })
    // -- -- -- -- -- -- -- -- -- -- -- -- -- -- - FOR DATABASE---------------------------------------------------------------------
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'vanica'
})
db.connect();
app.post('/register', urlencodedParser, (req, res) => {
    let userinfo = {
        fullname: req.body.fullname,
        email: req.body.email,
        password: req.body.password,
    }
    db.connect((err) => {
        console.log("My sql connected");
    })
    let sql = 'INSERT INTO USER SET ?'


    db.query(sql, userinfo, (err, results) => {
        if (err) throw err;
        res.end("The data has been saved successfully")
    })

});
app.get('/view', (req, res) => {

        let select = 'SELECT * FROM USER'

        db.query(select, (err, results) => {
            if (err) throw err;
            let values = results;
        })
    })
    // -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- - Aploading an image-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -
const upload = multer({ storage: multer.memoryStorage() })
app.post('/photoDb', upload.single('image'), (req, res) => {
    let image = req.file.buffer.toString('base64')
    let photo = req.query.image
    let query = `INSERT INTO IMAGES SET images = ?`
    db.query(query, image, (err, results) => {
        if (err) throw err
        res.render('homepage')
    })
});
app.listen(3000, () => {
    console.log("The server is running now");
})

app.get('/updateProfile', urlencodedParser, (req, res) => {
    let updatedData = req.query

    res.render('update', {
        username: values.Fullname,
        email: values.email,
        password: values.password
    })
    let query = `UPDATE user SET Fullname= ?, email= ?, password=? WHERE email=?`
    db.query(query, [updatedData.username, updatedData.email, updatedData.password, values.email], (err, results) => {
        if (err) throw err;
        res.render('homepage', { username: values.Fullname, email: values.email })
    })
})

// app.post('/profile', )

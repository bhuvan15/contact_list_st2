//Modules
const express = require('express');
const path = require('path');
const alert = require('alert');
const db = require('./config/mongoose');
const Contact = require('./models/contact');

//Port number
const PORT = 8000;

const app = express();

//Setting up view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//Middlewares
app.use(express.static('assets'));
app.use(express.urlencoded());


//Routes and controllers

/* Home page */
app.get('/', function(req, res) {

    Contact.find({}, function(err, contacts) {
        if(err) {
            console.log('Erro in fetching data from db');
            return;
        }
        return res.render('home', {
        contacts : contacts,
    });
    })

    
})

/* Input Page */
app.get('/addContactPage', function(req, res) {
    return res.render('inputPage');
})

/* Add Contact */
app.post('/add_new_contact', function(req, res) {
    /* Checking if email or phone number already exists or not */
/*     let emailIndex = Contacts.findIndex(contact => contact.email == req.body.email);
    let phoneIndex = Contacts.findIndex(contact => contact.phone == req.body.phone);
    let nameIndex = Contacts.findIndex(contact => contact.name == req.body.name);
    if(phoneIndex != -1) {
        console.log("Phone Already Exists");
        alert("Phone Already Exists");
        return res.redirect('/addContactPage');
    }
    else if(emailIndex != -1) {
        console.log("Email Already Exists");
        alert("Email Already Exists");
        return res.redirect('/addContactPage');
    }
    else if(nameIndex != -1) {
        console.log("Name Already Exists");
        alert("Name Already Exists");
        return res.redirect('/addContactPage');
    } */

   
        Contact.create({
            name : req.body.name,
            email: req.body.email,
            phone: req.body.phone,
        }, function(err, newContact) {
            if(err) {
                console.log("error in creating a contact");
                return;
            }
            console.log('***' + newContact);
            return res.redirect('/');
        });
})



/* Clear list */
app.get('/clearList', function(req, res) {
    return res.redirect('/');
})



/* Delete Contact */
app.get('/delete_contact', function(req, res) {

    let id = req.query.id;

    Contact.findByIdAndDelete(id, function(err) {
        if(err) {
            console.log("Error in deleteing");
            return;
        }
    })

    return res.redirect('/');

})






app.listen(PORT, function(err) {
    if(err) {
        console.log(`${err} on port ${PORT}`);
        return;
    }
    console.log(`Server running on port ${PORT}`);
    
})
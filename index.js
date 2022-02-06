//Modules
const express = require('express');
const path = require('path');
const alert = require('alert');

//Port number
const PORT = 8000;

const app = express();

//Setting up view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//Middlewares
app.use(express.static('assets'));
app.use(express.urlencoded());

/* Temp Contacts */

let Contacts = [
    {
        name: "ABC",
        email: "Hello@gmail.com",
        phone: 124135465,
    },
     {
        name: "XYZ",
        email: "h1@gmail.com",
        phone: 234342342,
    },
     {
        name: "user",
        email: "hey@gmail.com",
        phone: 328483432,
    }

]





//Routes and controllers

/* Home page */
app.get('/', function(req, res) {
    return res.render('home', {
        contacts : Contacts,
    });
})

/* Input Page */
app.get('/addContactPage', function(req, res) {
    return res.render('inputPage');
})

/* Add Contact */
app.post('/add_new_contact', function(req, res) {

    let phoneIndex = Contacts.findIndex(contact => contact.phone == req.body.phone);
    if(phoneIndex != -1) {
        console.log("Phone Already Exists");
        alert("Phone Already Exists");
        return res.redirect('/addContactPage');
    }
   
    

    Contacts.push(req.body);
     return res.redirect('/');
})

/* Clear list */
app.get('/clearList', function(req, res) {
    Contacts = [];
    return res.redirect('/');
})

/* Delete Contact */
app.get('/delete_contact', function(req, res) {
    console.log(req.query.phone);

    let phone = req.query.phone;

    let contactIndex = Contacts.findIndex(contact => contact.phone == phone);
    if(contactIndex != -1) {
        Contacts.splice(contactIndex, 1);
    } 

    return res.redirect('/');

})






app.listen(PORT, function(err) {
    if(err) {
        console.log(`${err} on port ${PORT}`);
        return;
    }
    console.log(`Server running on port ${PORT}`);
    
})
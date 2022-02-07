//Modules
const express = require('express');
const path = require('path');
const alert = require('alert');
const db = require('./config/mongoose');
const Contact = require('./models/contact');
const { response } = require('express');
const { isValidObjectId } = require('mongoose');

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

        let phone = req.body.phone;
        let email = req.body.email;

        /* Checking if same phone number exists or note*/
        Contact.find({phone}, function(err, contact) {

           if(err) {
            console.log("Error in checking if phone number exists or not");
           }
           /* if phone number not found */
           if(contact.length == 0) {
               /* Checking for if same exists or not */
                Contact.find({email}, function(err, email) {

                    if(err) {
                        console.log("error in checking if email exists or not");
                    }
                    /* if email not found we will create out new contact */
                    if(email.length == 0) {
                        /* Creating Contact */
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
                    }
                    else {
                        alert("Email already exists");
                        return res.redirect('back');
                    }
                })
            }
            else {
                alert("Phone Number already Exists");
                return res.redirect('back');
            }

        })

        
        //Creating Contact
            /* Contact.create({
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
        }); */
                    
})



/* Clear list */
/* app.get('/clearList', function(req, res) {
    Contact.deleteMany({});
    return res.redirect('/');
}) */


/* Search contact */
app.post('/search', function(req, res) {
    let name = req.body.search;
    if(name == '') {
        return res.redirect('/');
    } 
    Contact.find({name}, function(err, contacts) {
        if(err) {
            console.log(err);
            return res.redirect('/');
        }

        if(contacts.length == 0) {
            alert("Contact Not Found");
            return res.redirect('/');
        }

        return res.render('home', {
            contacts : contacts,
        })
    })
})  


/* Delete Contact */
app.get('/delete_contact', function(req, res) {

    let id = req.query.id;

    Contact.findByIdAndDelete(id, function(err) {
        if(err) {
            console.log("Error in deleting");
            return;
        }
    })

    return res.redirect('/');

})


/* Updating Contact */
app.get('/update_contact', function(req, res) {
    let id = req.query.id;
     Contact.find({"_id" : id}, function(err, contacts) {
        return res.render('update',
            {contact : contacts}
        )
    }) 
    
    
    
})





app.listen(PORT, function(err) {
    if(err) {
        console.log(`${err} on port ${PORT}`);
        return;
    }
    console.log(`Server running on port ${PORT}`);
    
})
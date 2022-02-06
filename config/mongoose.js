const mongoose = require('mongoose');

//Connect to database
mongoose.connect('mongodb://localhost/contacts_list_db_st2');

//Acquire the connection
const db = mongoose.connection;

//error
db.on('error', console.error.bind(console, "Error connecting to DB"));

//working and printing the message
db.once('open', function() {
    console.log("Successfully connected to db");
})
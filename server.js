/******************/
/*npm run dev*/
/******************/
require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const verifyJWT = require('./middleware/verifyJWT');
const mongoose = require('mongoose');
const connectDB = require('./config/dbConnection');
const PORT = process.env.PORT || 3500;

//connect to MongoDB
connectDB();

//built-in middleware to handle urlencoded data
//to be 'content-type: application/x-www-form-urlencoded'
app.use(express.urlencoded({extended: false}));

//built-in middleware for json
app.use(express.json());

//middleware for cookies
app.use(cookieParser());

//add routes
app.use('/register',require('./routes/register'));
app.use('/auth',require('./routes/auth'));
app.use('/refresh',require('./routes/refresh'));

app.use(verifyJWT);

//all means accept everything
app.all('*',(req,res) => {
    if(req.accepts('json')){
        res.json({error : '404 not found'});
    }else {
        res.type('txt').send('404 not found');
    }
    
})

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})

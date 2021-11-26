
// Import npm packages
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const routes = require('./routes/api');


const app = express();
const PORT = process.env.PORT || 8080 ;

const MONGODB_URI = 'mongodb+srv://oronbendemo:benoron123@tabcluster.ytz0u.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

mongoose.connect(process.env.MONGODB_URI ,{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on('connected', () => {
    console.log('Mongoose is connected!!!!');
});


// Data parsing
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


if (process.env.NODE_ENV === 'production') {
    app.use(express.static('tabApp/build'));
}

// HTTP request logger
app.use(morgan('tiny'));
app.use('/api', routes);


app.listen(PORT, console.log(`Server is starting at ${PORT}`));


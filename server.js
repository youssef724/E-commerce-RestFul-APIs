const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
dotenv.config({"path": "config.env"});
const connectDB = require('./Config/DB');
const CategoryRoute = require('./Routes/CategoryRoute');


//express app
const app = express();

//Connect to MongoDB
connectDB();

//Middlewares
app.use(express.json());
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
    console.log(`Development mode: ${process.env.NODE_ENV}`);
}
//Routes
app.use('/api/v1/category', CategoryRoute);



const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

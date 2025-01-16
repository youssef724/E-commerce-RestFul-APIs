const mongoose = require('mongoose');
const DBConnection = () =>{
    mongoose
        .connect(process.env.MONGO_URL)
        .then(() => {
        console.log('Connected to MongoDB');
    })  .catch((err)=>{
        console.log(`DataBase connection error: ${err}` );
        process.exit(1);
    });  
    
}
module.exports = DBConnection;
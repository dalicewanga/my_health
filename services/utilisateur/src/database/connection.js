const mongoose = require('mongoose');

const { MONGODB_URI } = process.env;


module.exports = async() => {
  
    try{
        await mongoose.connect(MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Db connected : '+MONGODB_URI);
    } catch (error) {
        console.log('Error =========');
        console.log(error);
        process.exit(1);
    }
    
};

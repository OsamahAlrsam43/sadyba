const mongoose = require('mongoose');
require('dotenv').config();


const db = async (namedata)=>{
    try {
            const dburl = `mongodb+srv://test:test@test.1cmov.mongodb.net/${namedata}?retryWrites=true&w=majority`;


        await mongoose.connect(dburl,{useNewUrlParser:true,useUnifiedTopology:true,useFindAndModify:false,useCreateIndex:true});
        console.log(`db connectt ${namedata}`);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
    
};

module.exports = db;
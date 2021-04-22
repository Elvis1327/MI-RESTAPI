const mongoose = require('mongoose');

const conectarDB = async () => {

    try {
        
        await mongoose.connect(process.env.MONGO_CNN , {
            useCreateIndex: true,
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        })
        console.log('The data base is running');

    } catch (error) {
        console.log(error)
    }

};

module.exports = {
    conectarDB
}


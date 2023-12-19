const mongoose = require('mongoose');

async function conectarBD(req = null, res = null, next = null) {
    try {
        await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true});
        console.log('Conectado ao bando de dados.');
        try { next();} catch { };
        return mongoose;
    } catch (error){
        return error;
    }
}

module.exports = conectarBD;
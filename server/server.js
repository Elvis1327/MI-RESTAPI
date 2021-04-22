const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { conectarDB } = require('../database/database');

class Server {

    constructor(){
        this.app = express();
        this.PORT = process.env.PORT || 3000;

        // DataBase
        this.dataBase();
        // Middlewares
        this.middlewares();
    }

    // Middlewares
    middlewares(){
        this.app.use( express.json() );
        this.app.use(cors());
        this.app.use(morgan('dev'));
        this.app.use( '/api/auth', require('../routes/users') );
        this.app.use( express.static('public'));
    }

    // Base de datos
    async dataBase(){
        await conectarDB();
    }

    // Connect to Server
    listen(){
        this.app.listen(this.PORT, ()=>{
            console.log(`The Server is running at ${this.PORT}`);
        });
    };
}

module.exports = Server;


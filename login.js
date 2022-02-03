const db= require('./bd')

const users = db.sequelize.define('users', {
    email: {
        type: db.Sequelize.STRING,
    },
    usuario :{
     type: db.Sequelize.STRING
    },
    senha :{
        type: db.Sequelize.STRING
       }
    
    });
    //pacientes.sync({force: true});

//users.sync({force: true})

module.exports = users
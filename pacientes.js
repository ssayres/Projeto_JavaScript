const db= require('./bd')

const pacientes = db.sequelize.define('cadastro_pacientes', {
    local: {
        type: db.Sequelize.STRING,
    },
    nome_paciente :{
        type: db.Sequelize.STRING
       },
    rg :{
        type: db.Sequelize.STRING
       },
    cpf :{
    type: db.Sequelize.STRING
       },
    genero :{
    type: db.Sequelize.STRING
     },
     cep :{
        type: db.Sequelize.STRING
         },
    logradouro :{
        type: db.Sequelize.STRING
             },
    numero :{
        type: db.Sequelize.STRING
         },
    uf :{
        type: db.Sequelize.STRING
             },
    estado :{
        type: db.Sequelize.STRING
                     },
    status :{
    type: db.Sequelize.STRING
    }    
       
    });
    //pacientes.sync({force: true});

//users.sync({force: true})

module.exports = pacientes

const express = require("express");
const app = express();
const handlebars = require("express-handlebars");
const mysql = require('mysql');
const users = require("./login.js");
const Pacientes = require("./pacientes.js");
const bodyParser= require('body-parser');
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
const connection = mysql.createConnection({
    host:'localhost',
    user: 'sidnei',
    password: '123456',
    database: 'bancosip',
});
const Sequelize = require('sequelize');
const { Router } = require("express");
const { endsWith } = require("sequelize/dist/lib/operators");
const { route } = require("express/lib/application");

const sequelize = new Sequelize('bancosip', 'sidnei', '123456',{
host: 'localhost',
dialect: 'mysql',

});
sequelize.authenticate().then(function(){
console.log('Conexao realizada com sucesso');
}).catch(function(err){
    console.log('Erro de conexao' + err);
});

connection.connect(function(err){
    if(err){
        console.error('error conecting:'+ err.stack);
        return;
    }
    console.log('connected as id' + connection.threadId);
});
app.engine('handlebars',handlebars.engine({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.get("/login.html", function(req,res){
res.sendFile(__dirname+"/login.html");
});
app.get('/lista_pacientes2.handlebars', function(req,res){
Pacientes.findAll().then(function(posts){
    res.render('lista_pacientes2.handlebars', {posts: posts});
})

});
app.get('/pacientes_edit2.handlebars', function(req,res){
    Pacientes.findAll().then(function(edit){
        res.render('pacientes_edit2.handlebars', {edit: edit});
    });
});
   
app.post('/cadastro_pacientes.html', function(req,res){
users.create({
    email: req.body.email,
    usuario: req.body.usuario,
    senha: req.body.senha

}).then(function(){
    res.sendFile(__dirname+"/cadastro_pacientes.html");   
}).catch(function(erro){
    res.send("Erro ao se logar" + erro)
});
    //res.send("email: " + req.body.email +"<br>usuario: "+req.body.usuario + "<br>senha: "+req.body.senha+ "<br>")
});
app.post('/lista_pacientes.handlebars', function(req,res){
    Pacientes.create({
        local: req.body.local,
        nome_paciente: req.body.nome_paciente,
        rg: req.body.rg,
        cpf: req.body.cpf,
        genero: req.body.genero,
        cep: req.body.cep,
        logradouro: req.body.logradouro,
        numero: req.body.numero,
        uf: req.body.uf,
        estado: req.body.estado,
        status: req.body.status,
    
    }).then(function(){
        
        res.redirect('/lista_pacientes2.handlebars');  
    }).catch(function(erro){
        res.send("Erro ao se logar" + erro)
    })
})
app.get('/del-pacientes/:id',function(req,res){
Pacientes.destroy({
    where: {'id': req.params.id}
}).then(function(){
    res.redirect('/lista_pacientes2.handlebars');
}).catch(function(erro){
    res.send("Registro não apagado")
})
});

app.get('/pacientes_edit/:id',function(req,res){
    Pacientes.findOne({
        where: {'id': req.params.id}
    }).then(function(){
        res.redirect('/pacientes_edit2.handlebars');
    }).catch(function(erro){
        res.send("Registro não apagado")
    });
    
    });
app.listen(8080);




const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mysql = require('mysql')

app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

class Usuario{
    constructor(nome, cpf, verificado, datanasc, deficiencia, contato){
        this.nome = nome;
        this.cpf = cpf;
        this.verificado = verificado;
        this.datanasc = datanasc;
        this.deficiencia = deficiencia;
        this.contato = contato;
    }
}

const conexao = mysql.createConnection({
    host: '143.106.241.3',
    user: 'cl201240',
    password: 'cl*06112005',
    database: 'cl201240'
})

conexao.connect((erro) => {
    if (erro) throw erro;
    console.log("Conexão bem-sucedida");
})

app.get('/', (req, res) => {
  res.send('Olá, mundo!');
});

app.post('/cadastro', (req, res) => {   
    const {nome, cpf, verificado, datanasc, deficiencia, contato} = req.body;
    const novousuario = new Usuario(nome, cpf, verificado, datanasc, deficiencia, contato);

    const sql = "INSERT INTO `prototipo-api` SET ?";

    conexao.query(sql, novousuario, (erro, resultado) =>{
        if (erro){
            res.send("ERRO >:))))")
            throw erro;
        } 
        console.log(`O usuário ${nome} foi cadastrado com sucesso - ID: ${resultado.insertId}`)
        res.send(`Usuário ${nome} cadastrado com sucesso`);
    });
    conexao.end();
})

app.listen(3000, () => {
  console.log('O servidor está rodando na porta 3000');
});
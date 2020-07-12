const path = require('path')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const port = process.env.PORT || 2019
const mongo = process.env.PORT || 'mongodb://localhost:27017/meus-filmes'
const mongoose = require('mongoose')
const pages = require('./routes/pages')//Importando a rota
const filmes = require('./routes/filmes')

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);


mongoose.Promise = global.Promise

//receber requisições post
app.use(bodyParser.urlencoded({ extended: true }))

//assets
app.use(express.static('public'))

//Definindo o view engine
app.set('views',path.join(__dirname,'views'))
app.set('view engine','ejs')

app.use('/',pages)//Chamando a rota
app.use('/filmes',filmes)//Chamando a rota
app.get('/sobre',(req,res) => res.render('sobre'))//Renderiza sobre, é a resposta ao browser que fez um request

//conectando ao banco
mongoose.connect(mongo).then(() => {
    app.listen(port, () => { 
        console.log('Listening on port: ' + port)//Só escuta a porta, se conectar ao mongo 
    })
})
.catch( e => {
    console.log(e)
})






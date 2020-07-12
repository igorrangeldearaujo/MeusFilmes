const mongoose = require('mongoose')

const FilmeSchema = mongoose.Schema({
    name: { 
        type: String,
        required: true
    },
    status: {
        type: String,
        enumValues: ['to-watch','watching','watched']
    },
    comments: [String]
})

const Filme = mongoose.model('Filme',FilmeSchema)

module.exports = Filme
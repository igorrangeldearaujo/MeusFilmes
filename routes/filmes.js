const express = require('express')
//Chamando controllers
const filmesController = require('../controllers/filmes')
const router = express.Router()

const Filme = require('../models/filme')

const models = {
    Filme
}
//Caminho principal
router.get('/',filmesController.index.bind(null, models))//Para cada router que tiver
//Caminho para novo
router.get('/novo', filmesController.novoForm)
router.post('/novo',filmesController.novoProcess.bind(null,models))
//Caminho para chegar em excluir
router.get('/excluir/:id', filmesController.excluir.bind(null, models))
router.get('/editar/:id', filmesController.editarForm.bind(null, models))
router.post('/editar/:id', filmesController.editarProcess.bind(null, models))
router.get('/info/:id', filmesController.info.bind(null, models))//Mapeando info
router.post('/info/:id',filmesController.addComentario.bind(null,models))


module.exports = router
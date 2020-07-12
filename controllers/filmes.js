const labels = [
    { id: 'to-watch', name: 'Para Assistir' },
    { id: 'watching', name: 'Assistindo' },
    { id: 'watched', name: 'Assistido' }
]
const pagination = async(model,conditions,params) => {
    const total = await model.count(conditions)
    const pageSize = parseInt(params.pageSize) || 20
    const currentPage = parseInt(params.page)|| 0

    const pagination = {
        currentPage: parseInt(currentPage),
        pageSize: parseInt(pageSize),
        pages: parseInt(total / pageSize)
    }

    const results = await model
                            .find(conditions)
                            .skip(currentPage*pageSize)
                            .limit(pageSize)

    return {
        data: results,// Retorna data e pagination que é um objeto de paginação
        pagination
    } 
}

const index = async ({ Filme }, req,res) => {
    const results = await pagination(Filme,{},req.query) 
    res.render('filmes/index', { results, labels })//renderiza o index em views
}

const novoProcess = async ({ Filme }, req,res) => {
    const filme = new Filme(req.body)
    try{
        await filme.save()  
        res.redirect('/filmes')
    }catch(e){
        res.render('filmes/novo', {
            errors: Object.keys(e.errors)//Passando lista de campos para o novo.ejs
        })
    }   
}

//Nova série (cadê) a função

const novoForm = (req,res) => {
    res.render('filmes/novo',{ errors: null })//Chamando o view (filme/novo)
}

const excluir = async ({ Filme }, req, res) => {
    await Filme.remove({ _id: req.params.id }) //Esse id é o mesmo que esta na rota
    res.redirect('/filmes')//redirecionando para o index em views
}

const editarProcess = async ({ Filme }, req,res) => {
    const filme = await Filme.findOne({ _id: req.params.id }) 
        filme.name = req.body.name// Pegando o dado do campo de name name (do formulário)
        filme.status = req.body.status //Pegando o dado do campo de name status (do formulário)
        await filme.save()
        res.redirect('/filmes')//Redireciona a pagina para filmes 
}
//Editar form busca uma série baseada no id, quando encontra manda para o view
const editarForm = async ({ Filme }, req,res) => {
    const filme = await Filme.findOne({ _id: req.params.id }) 
    res.render('filmes/editar', { filme, labels, errors: [] }) //Passando um objeto erros para views
}

//Informação de cada filme cadastrado (comentário)
const info = async ({ Filme }, req, res) => {
    const filme = await Filme.findOne({ _id: req.params.id })
    res.render('filmes/info', { filme })//Passando filme para views(Chamando views)
}

const addComentario = async ({ Filme }, req, res) => {
    await Filme.updateOne({ _id: req.params.id }, { $push: { comments: req.body.comentario }})
    res.redirect('/filmes/info/'+req.params.id)
}


module.exports = {
    index, novoProcess, novoForm, excluir, editarForm, editarProcess, info, addComentario
}

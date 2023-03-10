const db = require('../database/models');
const sequelize = db.sequelize;

//Otra forma de llamar a los modelos
const Movies = db.Movie;

const moviesController = {
    'list': (req, res) => {
        db.Movie.findAll()
            .then(movies => {
                res.render('moviesList.ejs', {movies})
            })
    },
    'detail': (req, res) => {
        db.Movie.findByPk(req.params.id)
            .then(movie => {
                res.render('moviesDetail.ejs', {movie});
            });
    },
    'new': (req, res) => {
        db.Movie.findAll({
            order : [
                ['release_date', 'DESC']
            ],
            limit: 5
        })
            .then(movies => {
                res.render('newestMovies', {movies});
            });
    },
    'recomended': (req, res) => {
        db.Movie.findAll({
            where: {
                rating: {[db.Sequelize.Op.gte] : 8}
            },
            order: [
                ['rating', 'DESC']
            ]
        })
            .then(movies => {
                res.render('recommendedMovies.ejs', {movies});
            });
    }, //Aqui debemos modificar y completar lo necesario para trabajar con el CRUD
    add: (req, res) => {
        return res.render('moviesAdd')
    },
    create: (req, res) => {
        /* return res.send(req.body)  */ 
        let {title, rating, awards, release_date, length} = req.body
        
        db.Movie.create({

            title,
            rating: +rating,
            awards: +awards,
            release_date,
            length: +length
            
        })

        .then(newMovie => {
            db.Movie.findAll()
            .then(movies => {
                res.render('moviesList', {movies})
            })
        })
        
    },
    edit: (req, res) => {
        /* return res.send(req.body) */ 
        let idParams = +req.params.id
        let movie = db.Movie.findOne({
            where: {
                id : idParams
            },
            include: [{
                all:true
            }]
        })
        Promise.all([movie])
        .then(([Movie]) => {
            return res.render('moviesEdit', {Movie})
        })
        .catch(error => res.send(error))

    },
    update: (req,res) => {  
    let idParams = +req.params.id
        
    db.Movie.update({
        title: req.body.title,
        rating: +req.body.rating,
        awards: +req.body.awards,
        release_date: req.body.release_date,
        length: +req.body.length
    },{
        where:{id:idParams}
    })
    .then(pelicula => {
        res.redirect(`/movies/detail/${idParams}`)
    })
    .catch(errors => res.sens(errors))


    },
    delete: (req, res) => {
        let idParams = +req.params.id

        db.Movie.findOne({
            where: {id:idParams}
        })
        .then(movie => {
            res.render('moviesDelete',{Movie:movie})
        })
    },
    destroy: (req, res) => {
        let idParams = +req.params.id

        db.Movie.destroy({
            where:{id:idParams}
        })
        .then(pelicula => {
            res.redirect('/movies')
        })
    }


}

module.exports = moviesController;
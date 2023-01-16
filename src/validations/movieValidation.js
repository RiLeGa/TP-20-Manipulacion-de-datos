const {body, check} = require('express-validator')

module.exports = [
    check('title').trim()
    .notEmpty().withMessage('Debe ingresa el nombre'),

    check('rating').trim()
    .notEmpty().withMessage('Debe ingresar el rating de la película'),

    check('awards').trim()
    .notEmpty().withMessage('Debe ingresar los premios de la película'),

    check('release_date')
    .notEmpty().withMessage('Dene ingresar la fecha de estreno'),

    check('length').trim()
    .notEmpty().withMessage('Debe ingresar la duración de la película').bail()
    .isNumeric().withMessage('Solo se permiten caracteres numéricos'),

    check('genre').notEmpty().withMessage('Debe ingresar el género de la película')
]
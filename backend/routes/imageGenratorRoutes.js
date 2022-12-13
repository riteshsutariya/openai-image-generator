const express = require('express')
const { body, validationResult, check } = require('express-validator')

const app = express.Router()

const { generateImage } = require('../controllers/openaiContoller')

app.post('/generateimage', [check('prompt', 'please provide description more than 5 characters.').isLength({ min: 5 }),
check('size').isIn(['small', 'medium', 'large']).withMessage('not valid size'),
check('n', 'number of images must be between 1 to 5').isInt({ min: 1, max: 5 })
],
    generateImage)

module.exports = app
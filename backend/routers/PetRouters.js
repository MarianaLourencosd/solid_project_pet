const router = require('express').Router()

const PetController = require('../controllers/PetController')
const verifyToken = require('../helpers/verify-token')

// CRIAR PET
router.post('/create', verifyToken, PetController.create)

// LISTAR TODOS
router.get('/', PetController.getAll)

// IMPORTANTE: rotas fixas primeiro, depois dinâmicas

// BUSCAR POR ID
router.get('/:id', PetController.getById)

// EDITAR PET
router.patch('/edit/:id', verifyToken, PetController.edit)

module.exports = router
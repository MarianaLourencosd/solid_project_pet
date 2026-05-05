const jwt = require('jsonwebtoken')

const createPetToken = async (pet, req, res) => {
    const token = jwt.sign({
        name: pet.name,
        id: pet._id
    }, 'fatec-turma6-a2026')

    res.status(201).json({
        message: 'Pet criado com sucesso',
        token: token,
        petId: pet._id
    })
}

module.exports = createPetToken
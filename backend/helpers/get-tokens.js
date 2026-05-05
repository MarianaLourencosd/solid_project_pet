const jwt = require('jsonwebtoken')
const Pet = require('../models/Pet')

const getPetToken = async (token) => {
    const decoded = jwt.verify(token, 'fatec-turma6-a2026')
    const petId = decoded.id
    const pet = await Pet.findById({ _id: petId })
    return pet
}

module.exports = getPetToken
const jwt = require('jsonwebtoken')
const getToken = require('./get-tokens')

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization

    // SE NÃO TIVER LOGIN, NÃO BLOQUEIA
    if (!authHeader) {
        req.pet = null
        return next()
    }

    try {
        const token = getToken(req)
        const verified = jwt.verify(token, 'fatec-turma6-a2026')

        req.pet = verified

        next()
    } catch (err) {
        return res.status(400).json({
            message: 'Token Invalido'
        })
    }
}

module.exports = verifyToken
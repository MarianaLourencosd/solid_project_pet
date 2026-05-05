const express = require('express')
const cors = require('cors')
const PetRouters = require('./routers/PetRouters')

const app = express()

app.use(express.json())

app.use(cors({ credentials: true, origin: 'http://localhost:3000' }))

app.use(express.static('public'))

app.use('/pets', PetRouters)

app.listen(5000)
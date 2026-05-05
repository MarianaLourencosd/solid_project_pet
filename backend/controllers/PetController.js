const Pet = require('../models/Pet')
const createPetToken = require('../helpers/create-pet-token')
const getToken = require('../helpers/get-tokens')
const jwt = require('jsonwebtoken')

module.exports = class PetController {

    // CREATE PET
    static async create(req, res) {

        const { name, age, weight, color, image, available } = req.body

        if (!name) {
            return res.status(422).json({ message: 'Nome é obrigatório' })
        }
        if (!age) {
            return res.status(422).json({ message: 'Idade é obrigatória' })
        }
        if (!weight) {
            return res.status(422).json({ message: 'Peso é obrigatório' })
        }
        if (!color) {
            return res.status(422).json({ message: 'Cor é obrigatória' })
        }
        if (!image) {
            return res.status(422).json({ message: 'Imagem é obrigatória' })
        }

        const petExists = await Pet.findOne({ name })

        if (petExists) {
            return res.status(422).json({ message: 'Este pet já existe' })
        }

        const pet = new Pet({
            name,
            age,
            weight,
            color,
            image,
            available: available ?? true
        })

        try {
            const newPet = await pet.save()
            await createPetToken(newPet, req, res)
        } catch (error) {
            return res.status(500).json({ message: 'Erro ao criar pet', error })
        }
    }

    // LISTAR TODOS OS PETS
    static async getAll(req, res) {
        try {
            const pets = await Pet.find()
            return res.status(200).json(pets)
        } catch (error) {
            return res.status(500).json({ message: 'Erro ao buscar pets', error })
        }
    }

    // BUSCAR PET POR ID
    static async getById(req, res) {
        const id = req.params.id

        try {
            const pet = await Pet.findById(id)

            if (!pet) {
                return res.status(404).json({ message: 'Pet não encontrado' })
            }

            return res.status(200).json(pet)
        } catch (error) {
            return res.status(500).json({ message: 'Erro ao buscar pet', error })
        }
    }

    // EDITAR PET
    static async edit(req, res) {
        const id = req.params.id

        try {
            const pet = await Pet.findById(id)

            if (!pet) {
                return res.status(404).json({ message: 'Pet não encontrado' })
            }

            const updatedPet = await Pet.findByIdAndUpdate(
                id,
                req.body,
                { new: true }
            )

            return res.status(200).json({
                message: 'Pet atualizado com sucesso',
                pet: updatedPet
            })

        } catch (error) {
            return res.status(500).json({ message: 'Erro ao atualizar pet', error })
        }
    }

    // CHECK PET (TOKEN)
    static async checkPet(req, res) {
        let currentPet

        if (req.headers.authorization) {
            const token = getToken(req)
            const decoded = jwt.verify(token, 'fatec-turma6-a2026')

            currentPet = await Pet.findById(decoded.id)
        } else {
            currentPet = null
        }

        res.status(200).json(currentPet)
    }
}
const express = require('express')
const server = express()

// Servidor intercepta respostas em json
server.use(express.json())

// Array simulando uma base de dados
const users = ["Danilo", "Lucas", "Melquias", "Matheus"]

// Middlewares - Funções interceptadoras que manipulam dados de requisição e resposta

    // Middleware Global
    server.use((req, res, next) => {
        console.time('Request')

        console.log(`Método: ${req.method}, URL: ${req.url}`)

        next() // Impede que o middleware bloqueie o fluxo da aplicação

        console.timeEnd('Request')
    })

    // Middleware Local
    function checkIfUserExists (req, res, next) {
        if(!req.body.user) {
            res.status(400).json('User not found on request body.')
        }

        next()
    }

    function checkUserInArray (req, res, next) {
        if(!user[req.params.id]) {
            res.status(400).json('User does not exists.')
        }

        next()
    }

// Rotas do CRUD

    // Verbo http GET
    server.get('/users', ( req, res) => {
        return res.json(users)
    })

    // Verbo http GET (especificando um parâmetro)
    server.get('/users/:id', checkUserInArray, ( req, res) => {
        const { id } = req.params // Pega um parâmetro passado na url

        return res.json(users[id])
    })

    // Verbo http POST
    server.post('/create', checkIfUserExists, (req, res) => {
        const { name } = req.body // Pega um parâmetro passado no corpo da requisição

        users.push(name)

        return res.json(users)
    })

    // Verbo http PUT
    server.put('/edit/:id', checkIfUserExists, checkUserInArray, (req, res) => {
        const { id } = req.params
        const { name } = req.body

        users[id] = name

        return res.json(users)
    })

    // Verbo http DELETE
    server.delete('/delete/:id', checkUserInArray, (req, res) => {
        const { id } = req.params

        users.splice(id, 1)

        return res.json(users)
    })

// Porta em que o servidor está ouvindo
server.listen(3333)
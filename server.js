//import { createServer } from 'node:http'

//const server = createServer((request, response) => {
//    response.write('hello world')

//   return response.end()
//})

//server.listen(3333)

import { fastify } from "fastify"
// import { DatabaseMemory } from './database-memory.js'
import { DatabasePostgres } from "./database-postgres.js"

const server = fastify()

// POST http://localhost:3333/videos
// PUT http://localhost:3333/videos/1,2,3 etc
// GET http://localhost:3333/videos OBTER A INFORMAÇÃO(OBJETO)
// DELETE http://localhost:3333/videos seguido do ID para DELETAR o Objeto

// Route Parameter, parametro enviado na rota para identificar um univo objeto por pelo id

//Metodo POST para criar um novo objeto EXEMPLO criarndo um video no bando de dados

 // const database = new DatabaseMemory()
 const database = new DatabasePostgres()

//Request Body

server.post('/videos', async (request, reply) => {
    const { title, description, duration }= request.body

    await database.create({
        title,
        description,
        duration,
    })

    return reply.status(201).send()
})
//Motodo GET para consultar a informção 
server.get('/videos',async (request) => {
    const search = request.query.search

    const videos = await database.list(search)

    console.log(videos)

    return videos
})
// Metodo PUT para atualizar a informaçõa do objeto
server.put('/videos/:id', async (request, reply) => {
    const videoId =  request.params.id
    const { title, description, duration } = request.body
    
    await database.update(videoId, {
        title,
        description,
        duration,
    })

    return reply.status(204).send()
})
// Metodo DELETE para deletar um objeto
server.delete('/videos/:id', async (request, reply) => {
    const videoId = request.params.id

    await database.delete(videoId)
w
    return reply.status(204).send()
})

server.listen({
    host: '0.0.0.0',
    port: process.env.PORT || 3333,
})
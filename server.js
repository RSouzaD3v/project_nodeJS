// import { createServer } from 'node:http';

// const server = createServer((request, response) => {
//     res.write('Oi');

//     return res.end();
// });

// server.listen(2500, () => {
//     console.log('Servidor Funcionando');
// });

import { fastify } from "fastify";
// import { DatabaseMemory } from "./database-memory.js";
import { DatabasePostgres } from "./database-postgres.js";
import cors from '@fastify/cors';

const server = fastify();
server.register(cors, {
    origin: '*',
    methods: 'GET',
})


// const database = new DatabaseMemory();
const database = new DatabasePostgres();

server.post('/videos', async (request, reply) => {
    const { title, description, duration } = request.body;

    await database.create({
        title,
        description,
        duration,
    })


    return reply.status(201).send();
});

server.get('/videos', async (request) => {
    let search = request.query.search

    console.log(search);
    const videos = await database.list(search);

    return videos
});

server.put('/videos/:id', async (request, reply) => {
    const videoId = request.params.id
    const { title, description, duration } = request.body;

    await database.update(videoId, {
        title,
        description,
        duration,
    });

    return reply.status(204).send();
});

server.delete('/videos/:id', (request, reply) => {
    const videoId = request.params.id;

    database.delete(videoId);

    return reply.status(204).send();
});

server.listen({
    host: '0.0.0.0',
    port: process.env.PORT ?? 3333,
})
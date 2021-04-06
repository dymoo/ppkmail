import fastify from 'fastify'

const app = fastify({ logger: true })

app.get('/', async () => ({ hello: 'world!' }))

app.listen(8080, '0.0.0.0', 400, () =>
  console.log('API server listening! (8080)')
)

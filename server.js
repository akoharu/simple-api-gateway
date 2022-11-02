require('dotenv').config();
const fastify = require('fastify')({})

// required plugin for HTTP requests proxy
fastify.register(require('fastify-reply-from'))
fastify.register(require('fastify-multipart'))

// gateway plugin
fastify.register(require('k-fastify-gateway'), {
  routes: [{
    prefix: '/auth',
    target: process.env.AUTH_SERVICE || 'https://api.eyzet.io/auth'
  },{
    prefix: '/client',
    target: process.env.CLIENT_SERVICE || 'http://localhost:1337'
  }]
})

// start the gateway HTTP server
fastify.listen(process.env.PORT || 8080, "0.0.0.0").then((address) => {
  console.log(`API Gateway listening on ${address}`)
})

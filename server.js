const fastify = require('fastify')({})

// required plugin for HTTP requests proxy
fastify.register(require('fastify-reply-from'))

// gateway plugin
fastify.register(require('k-fastify-gateway'), {
  routes: [{
    prefix: '/auth',
    target: process.env.AUTH_SERVICE || 'http://localhost:90'
  },{
    prefix: '/client',
    target: process.env.CLIENT_SERVICE || 'http://localhost:1337'
  }]
})

// start the gateway HTTP server
fastify.listen(8080, "0.0.0.0").then((address) => {
  console.log(`API Gateway listening on ${address}`)
})

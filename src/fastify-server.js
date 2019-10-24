const { CONTENT_TYPES } = require('./config');
const routesRegister = require('./routes').register;

const Fastify = require('fastify');

function server (fastifyOpts) {
  const fastify = Fastify(fastifyOpts || {
    logger: true,
    trustProxy: true
  });

  // NOTE: add supported content-types
  fastify.addContentTypeParser(CONTENT_TYPES, function (req, done) {
    done();
  });

  routesRegister(fastify);

  return fastify;
};

module.exports = server;

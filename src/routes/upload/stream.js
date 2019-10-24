const uploadStreamController = require('./../../controllers/upload/stream-upload');

module.exports = function (fastify, opts, done) {
  fastify.route({
    method: ['POST', 'PUT'],
    url: '/upload/stream',
    handler: uploadStreamController
  });
  done();
};

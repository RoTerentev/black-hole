/**
 * Health checking response
 */
function healthcheck (request, reply) {
  reply
    .code(200)
    .header('Content-Type', 'application/json; charset=utf-8')
    .send({
      msg: 'ok',
      t: Date.now()
    });
}

module.exports = function (fastify, opts, done) {
  fastify.all('/health', healthcheck);
  done();
};

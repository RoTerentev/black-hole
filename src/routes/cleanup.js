function cleanup (request, reply) {
  reply
    .code(200)
    .header('Content-Type', 'application/json; charset=utf-8')
    .send({
      msg: 'ok'
    });
}

module.exports = function (fastify, opts, done) {
  fastify.all('/cleanup', cleanup);
  done();
};

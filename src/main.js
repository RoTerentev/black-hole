require('./process-init');

const log = require('./logger');
const fastifyInit = require('./fastify-server');
const { SERVER_PORT, SERVER_HOST } = require('./config');

const init = async () => {
  try {
    /**
     * init HTTP server
     */
    const fastify = fastifyInit();
    await fastify.listen(SERVER_PORT, SERVER_HOST);
  } catch (err) {
    log.error(err);
    process.exit(1);
  }
};
init();

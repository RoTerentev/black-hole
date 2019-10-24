const healthcheckRoute = require('./healthcheck');
// const cleanupRoute = require('./cleanup');
const uploadStreamRoute = require('./upload/stream');

function fastifyRoutesRegistration (fastifyInstance) {
  [
    healthcheckRoute,
    // cleanupRoute,
    uploadStreamRoute
  ].forEach(route => {
    fastifyInstance.register(route);
  });
}

module.exports = {
  register: fastifyRoutesRegistration
};

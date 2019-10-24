const path = require('path');
const fs = require('fs');

const log = require('../../logger');
const uuid = require('../../utils/generate-uuid');
const devnull = require('../../utils/dev-null-stream');
const { UPLOAD_DIR } = require('../../config');

function streamUploadController (request, reply) {
  const req = request.raw;

  const fileName = uuid();
  const pathToFile = path.resolve(UPLOAD_DIR, fileName);

  const toDevNull = request.query.dev_null === 'true' || Number(request.query.dev_null) === 1;

  const pipeline = new Promise((resolve, reject) => {
    const stream = toDevNull ? devnull() : fs.createWriteStream(pathToFile);

    stream.on('error', reject);
    stream.on('finish', resolve);

    req.on('error', reject);
    req.on('aborted', () => {
      reject(new Error('File upload aborted'));
    });
    req.on('timeout', () => {
      reject(new Error('File upload timeout'));
    });

    req
      .pipe(stream);
  });

  pipeline
    .then(() => {
      let msg = 'ok';

      if (!toDevNull) {
        msg += '. file: ' + pathToFile;
      }

      // response for client
      reply
        .code(200)
        .type('text/plain')
        .send(msg);
    })
    .catch(error => {
      log.error(error);

      if (!toDevNull) {
        fs.unlink(pathToFile, log.error);
      }

      reply
        .code(500)
        .send({ status: 'error', msg: 'UPLOAD_FAIL' });
    });
}

module.exports = streamUploadController;

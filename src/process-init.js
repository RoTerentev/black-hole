const log = require('./logger');

async function closeSomeStaff () {
  return Promise.resolve(true);
}

async function stop (signal) {
  let _err = null;
  log.warn('\nGraceful Stop: ' + signal);
  try {
    await closeSomeStaff();
  } catch (err) {
    _err = err;
  }
  if (_err) {
    log.error(_err);
    process.exit(1);
  } else {
    process.exit(0);
  }
}
process.on('SIGINT', () => stop('SIGINT'));
process.on('SIGTERM', () => stop('SIGTERM'));

process.on('uncaughtException', (err, origin) => {
  log.error(err);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  const errMsg = 'Unhandled Rejection: ' + promise.toString() + reason;
  log.error(errMsg);
  process.exit(1);
});

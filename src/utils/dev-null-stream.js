const { Transform } = require('stream');

module.exports = function () {
  return new Transform({
    transform: function (chunk, enc, done) {
      done(null);
    }
  });
};

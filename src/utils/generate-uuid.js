const hyperid = require('hyperid');

function generate () {
  const instance = hyperid({ urlSafe: true });
  return instance();
}

module.exports = generate;

const path = require('path');

const types = require('./content-types');

const ENV = process.env;

exports.SERVER_HOST = ENV.SERVER_PORT || '0.0.0.0';
exports.SERVER_PORT = ENV.SERVER_HOST || 8989;

exports.SRC_DIR = path.resolve(__dirname, '..');
exports.UPLOAD_DIR = ENV.UPLOAD_DIR || path.resolve(exports.SRC_DIR, '../uploads');

exports.CONTENT_TYPES = types;

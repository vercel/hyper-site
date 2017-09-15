'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = clean;

var _path = require('path');

var _del = require('del');

var _del2 = _interopRequireDefault(_del);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function clean(dir) {
  var dist = (0, _config2.default)(dir).distDir;
  return (0, _del2.default)((0, _path.resolve)(dir, dist), { force: true });
}
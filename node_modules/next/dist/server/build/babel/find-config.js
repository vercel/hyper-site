'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = findBabelConfig;

var _path = require('path');

var _buildConfigChain = require('babel-core/lib/transformation/file/options/build-config-chain');

var _buildConfigChain2 = _interopRequireDefault(_buildConfigChain);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function findBabelConfig(dir) {
  // We need to provide a location of a filename inside the `dir`.
  // For the name of the file, we could be provide anything.
  var filename = (0, _path.join)(dir, 'filename.js');
  var options = { babelrc: true, filename: filename

    // First We need to build the config chain.
    // Then we need to remove the config item with the location as "base".
    // That's the config we are passing as the "options" below
  };var configList = (0, _buildConfigChain2.default)(options).filter(function (i) {
    return i.loc !== 'base';
  });

  return configList[0];
}
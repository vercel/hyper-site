'use strict';

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var relativeResolve = require('../root-module-relative-path').default(require);

var envPlugins = {
  'development': [require.resolve('babel-plugin-transform-react-jsx-source')],
  'production': [require.resolve('babel-plugin-transform-react-remove-prop-types')]
};

var plugins = envPlugins[process.env.NODE_ENV] || envPlugins['development'];

module.exports = {
  presets: [[require.resolve('babel-preset-env'), {
    modules: false
  }], require.resolve('babel-preset-react')],
  plugins: [require.resolve('babel-plugin-react-require'), require.resolve('./plugins/handle-import'), require.resolve('babel-plugin-transform-object-rest-spread'), require.resolve('babel-plugin-transform-class-properties'), require.resolve('babel-plugin-transform-runtime'), require.resolve('styled-jsx/babel')].concat((0, _toConsumableArray3.default)(plugins), [[require.resolve('babel-plugin-module-resolver'), {
    alias: {
      'babel-runtime': relativeResolve('babel-runtime/package'),
      'next/link': relativeResolve('../../../lib/link'),
      'next/prefetch': relativeResolve('../../../lib/prefetch'),
      'next/css': relativeResolve('../../../lib/css'),
      'next/dynamic': relativeResolve('../../../lib/dynamic'),
      'next/head': relativeResolve('../../../lib/head'),
      'next/document': relativeResolve('../../../server/document'),
      'next/router': relativeResolve('../../../lib/router'),
      'next/error': relativeResolve('../../../lib/error')
    }
  }]])
};
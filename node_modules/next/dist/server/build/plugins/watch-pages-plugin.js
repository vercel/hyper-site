'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _path = require('path');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var WatchPagesPlugin = function () {
  function WatchPagesPlugin(dir) {
    (0, _classCallCheck3.default)(this, WatchPagesPlugin);

    this.dir = (0, _path.resolve)(dir, 'pages');
  }

  (0, _createClass3.default)(WatchPagesPlugin, [{
    key: 'apply',
    value: function apply(compiler) {
      var _this = this;

      compiler.plugin('compilation', function (compilation) {
        compilation.plugin('optimize-assets', function (assets, callback) {
          // transpile pages/_document.js and descendants,
          // but don't need the bundle file
          delete assets[(0, _path.join)('bundles', 'pages', '_document.js')];
          callback();
        });
      });

      compiler.plugin('emit', function (compilation, callback) {
        // watch the pages directory
        compilation.contextDependencies = [].concat((0, _toConsumableArray3.default)(compilation.contextDependencies), [_this.dir]);
        callback();
      });
    }
  }]);
  return WatchPagesPlugin;
}();

exports.default = WatchPagesPlugin;
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// This plugin combines a set of assets into a single asset
// This should be only used with text assets,
// otherwise the result is unpredictable.
var CombineAssetsPlugin = function () {
  function CombineAssetsPlugin(_ref) {
    var input = _ref.input,
        output = _ref.output;
    (0, _classCallCheck3.default)(this, CombineAssetsPlugin);

    this.input = input;
    this.output = output;
  }

  (0, _createClass3.default)(CombineAssetsPlugin, [{
    key: 'apply',
    value: function apply(compiler) {
      var _this = this;

      compiler.plugin('after-compile', function (compilation, callback) {
        var newSource = '';
        _this.input.forEach(function (name) {
          var asset = compilation.assets[name];
          if (!asset) return;

          newSource += asset.source() + '\n';

          // We keep existing assets since that helps when analyzing the bundle
        });

        compilation.assets[_this.output] = {
          source: function source() {
            return newSource;
          },
          size: function size() {
            return newSource.length;
          }
        };

        callback();
      });
    }
  }]);
  return CombineAssetsPlugin;
}();

exports.default = CombineAssetsPlugin;
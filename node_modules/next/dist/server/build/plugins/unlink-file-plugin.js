'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _path = require('path');

var _fs = require('mz/fs');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var UnlinkFilePlugin = function () {
  function UnlinkFilePlugin() {
    (0, _classCallCheck3.default)(this, UnlinkFilePlugin);

    this.prevAssets = {};
  }

  (0, _createClass3.default)(UnlinkFilePlugin, [{
    key: 'apply',
    value: function apply(compiler) {
      var _this = this;

      compiler.plugin('after-emit', function (compilation, callback) {
        var removed = (0, _keys2.default)(_this.prevAssets).filter(function (a) {
          return !compilation.assets[a];
        });

        _this.prevAssets = compilation.assets;

        _promise2.default.all(removed.map(function () {
          var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(f) {
            var path;
            return _regenerator2.default.wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    path = (0, _path.join)(compiler.outputPath, f);
                    _context.prev = 1;
                    _context.next = 4;
                    return (0, _fs.unlink)(path);

                  case 4:
                    _context.next = 11;
                    break;

                  case 6:
                    _context.prev = 6;
                    _context.t0 = _context['catch'](1);

                    if (!(_context.t0.code === 'ENOENT')) {
                      _context.next = 10;
                      break;
                    }

                    return _context.abrupt('return');

                  case 10:
                    throw _context.t0;

                  case 11:
                  case 'end':
                    return _context.stop();
                }
              }
            }, _callee, _this, [[1, 6]]);
          }));

          return function (_x) {
            return _ref.apply(this, arguments);
          };
        }())).then(function () {
          return callback();
        }, callback);
      });
    }
  }]);
  return UnlinkFilePlugin;
}();

exports.default = UnlinkFilePlugin;
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _mv = require('mv');

var _mv2 = _interopRequireDefault(_mv);

var _path = require('path');

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(dir, buildDir) {
    var dist, _dir, _buildDir, oldDir;

    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            dist = (0, _config2.default)(dir).distDir;
            _dir = (0, _path.join)(dir, dist);
            _buildDir = (0, _path.join)(buildDir, '.next');
            oldDir = (0, _path.join)(buildDir, '.next.old');
            _context.prev = 4;
            _context.next = 7;
            return move(_dir, oldDir);

          case 7:
            _context.next = 13;
            break;

          case 9:
            _context.prev = 9;
            _context.t0 = _context['catch'](4);

            if (!(_context.t0.code !== 'ENOENT')) {
              _context.next = 13;
              break;
            }

            throw _context.t0;

          case 13:
            _context.next = 15;
            return move(_buildDir, _dir);

          case 15:
            return _context.abrupt('return', oldDir);

          case 16:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this, [[4, 9]]);
  }));

  function replaceCurrentBuild(_x, _x2) {
    return _ref.apply(this, arguments);
  }

  return replaceCurrentBuild;
}();

function move(from, to) {
  return new _promise2.default(function (resolve, reject) {
    return (0, _mv2.default)(from, to, function (err) {
      return err ? reject(err) : resolve();
    });
  });
}
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var writeBuildStats = function () {
  var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(dir) {
    var assetHashMap, buildStatsPath;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return (0, _promise4.default)((0, _path.join)(dir, '.next', 'app.js'));

          case 2:
            _context2.t0 = _context2.sent;
            _context2.t1 = {
              hash: _context2.t0
            };
            assetHashMap = {
              'app.js': _context2.t1
            };
            buildStatsPath = (0, _path.join)(dir, '.next', 'build-stats.json');
            _context2.next = 8;
            return _fs2.default.writeFile(buildStatsPath, (0, _stringify2.default)(assetHashMap), 'utf8');

          case 8:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function writeBuildStats(_x3) {
    return _ref2.apply(this, arguments);
  };
}();

var writeBuildId = function () {
  var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(dir, buildId) {
    var buildIdPath;
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            buildIdPath = (0, _path.join)(dir, '.next', 'BUILD_ID');
            _context3.next = 3;
            return _fs2.default.writeFile(buildIdPath, buildId, 'utf8');

          case 3:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));

  return function writeBuildId(_x4, _x5) {
    return _ref3.apply(this, arguments);
  };
}();

var _os = require('os');

var _path = require('path');

var _fs = require('mz/fs');

var _fs2 = _interopRequireDefault(_fs);

var _uuid = require('uuid');

var _uuid2 = _interopRequireDefault(_uuid);

var _del = require('del');

var _del2 = _interopRequireDefault(_del);

var _webpack = require('./webpack');

var _webpack2 = _interopRequireDefault(_webpack);

var _replace = require('./replace');

var _replace2 = _interopRequireDefault(_replace);

var _promise3 = require('md5-file/promise');

var _promise4 = _interopRequireDefault(_promise3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(dir) {
    var conf = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    var buildId, buildDir, compiler;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            buildId = _uuid2.default.v4();
            buildDir = (0, _path.join)((0, _os.tmpdir)(), _uuid2.default.v4());
            _context.next = 4;
            return (0, _webpack2.default)(dir, { buildId: buildId, buildDir: buildDir, conf: conf });

          case 4:
            compiler = _context.sent;
            _context.prev = 5;
            _context.next = 8;
            return runCompiler(compiler);

          case 8:
            _context.next = 10;
            return writeBuildStats(buildDir);

          case 10:
            _context.next = 12;
            return writeBuildId(buildDir, buildId);

          case 12:
            _context.next = 18;
            break;

          case 14:
            _context.prev = 14;
            _context.t0 = _context['catch'](5);

            console.error('> Failed to build on ' + buildDir);
            throw _context.t0;

          case 18:
            _context.next = 20;
            return (0, _replace2.default)(dir, buildDir);

          case 20:

            // no need to wait
            (0, _del2.default)(buildDir, { force: true });

          case 21:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this, [[5, 14]]);
  }));

  function build(_x2) {
    return _ref.apply(this, arguments);
  }

  return build;
}();

function runCompiler(compiler) {
  return new _promise2.default(function (resolve, reject) {
    compiler.run(function (err, stats) {
      if (err) return reject(err);

      var jsonStats = stats.toJson();

      if (jsonStats.errors.length > 0) {
        var error = new Error(jsonStats.errors[0]);
        error.errors = jsonStats.errors;
        error.warnings = jsonStats.warnings;
        return reject(error);
      }

      resolve(jsonStats);
    });
  });
}
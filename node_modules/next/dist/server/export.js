'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _del = require('del');

var _del2 = _interopRequireDefault(_del);

var _recursiveCopy = require('recursive-copy');

var _recursiveCopy2 = _interopRequireDefault(_recursiveCopy);

var _mkdirpThen = require('mkdirp-then');

var _mkdirpThen2 = _interopRequireDefault(_mkdirpThen);

var _walk = require('walk');

var _walk2 = _interopRequireDefault(_walk);

var _path = require('path');

var _fs = require('fs');

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

var _render = require('./render');

var _utils = require('./utils');

var _utils2 = require('../lib/utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(dir, options) {
    var config, nextDir, buildId, buildStats, outDir, exportPathMap, exportPaths, renderOpts, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, path, _exportPathMap$path, page, _exportPathMap$path$q, query, req, res, htmlFilename, baseDir, htmlFilepath, html, log;

    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            log = function log(message) {
              if (options.silent) return;
              console.log(message);
            };

            dir = (0, _path.resolve)(dir);
            config = (0, _config2.default)(dir);
            nextDir = (0, _path.join)(dir, config.distDir);


            log('  using build directory: ' + nextDir);

            if (!(0, _fs.existsSync)(nextDir)) {
              console.error('Build directory ' + nextDir + ' does not exist. Make sure you run "next build" before running "next start" or "next export".');
              process.exit(1);
            }

            buildId = (0, _fs.readFileSync)((0, _path.join)(nextDir, 'BUILD_ID'), 'utf8');
            buildStats = require((0, _path.join)(nextDir, 'build-stats.json'));

            // Initialize the output directory

            outDir = options.outdir;
            _context.next = 11;
            return (0, _del2.default)((0, _path.join)(outDir, '*'));

          case 11:
            _context.next = 13;
            return (0, _mkdirpThen2.default)((0, _path.join)(outDir, '_next', buildStats['app.js'].hash));

          case 13:
            _context.next = 15;
            return (0, _mkdirpThen2.default)((0, _path.join)(outDir, '_next', buildId));

          case 15:
            _context.next = 17;
            return (0, _recursiveCopy2.default)((0, _path.join)(nextDir, 'app.js'), (0, _path.join)(outDir, '_next', buildStats['app.js'].hash, 'app.js'));

          case 17:
            if (!(0, _fs.existsSync)((0, _path.join)(dir, 'static'))) {
              _context.next = 21;
              break;
            }

            log('  copying "static" directory');
            _context.next = 21;
            return (0, _recursiveCopy2.default)((0, _path.join)(dir, 'static'), (0, _path.join)(outDir, 'static'));

          case 21:
            if (!(0, _fs.existsSync)((0, _path.join)(nextDir, 'chunks'))) {
              _context.next = 27;
              break;
            }

            log('  copying dynamic import chunks');

            _context.next = 25;
            return (0, _mkdirpThen2.default)((0, _path.join)(outDir, '_next', buildId, 'webpack'));

          case 25:
            _context.next = 27;
            return (0, _recursiveCopy2.default)((0, _path.join)(nextDir, 'chunks'), (0, _path.join)(outDir, '_next', buildId, 'webpack', 'chunks'));

          case 27:
            _context.next = 29;
            return copyPages(nextDir, outDir, buildId);

          case 29:

            // Get the exportPathMap from the `next.config.js`
            if (typeof config.exportPathMap !== 'function') {
              (0, _utils2.printAndExit)('> Could not found "exportPathMap" function inside "next.config.js"\n' + '> "next export" uses that function build html pages.');
            }

            _context.next = 32;
            return config.exportPathMap();

          case 32:
            exportPathMap = _context.sent;
            exportPaths = (0, _keys2.default)(exportPathMap);

            // Start the rendering process

            renderOpts = {
              dir: dir,
              buildStats: buildStats,
              buildId: buildId,
              nextExport: true,
              assetPrefix: config.assetPrefix.replace(/\/$/, ''),
              dev: false,
              staticMarkup: false,
              hotReloader: null,
              availableChunks: (0, _utils.getAvailableChunks)(dir, config.distDir)

              // We need this for server rendering the Link component.
            };
            global.__NEXT_DATA__ = {
              nextExport: true
            };

            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _iteratorError = undefined;
            _context.prev = 39;
            _iterator = (0, _getIterator3.default)(exportPaths);

          case 41:
            if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
              _context.next = 59;
              break;
            }

            path = _step.value;

            log('  exporting path: ' + path);

            _exportPathMap$path = exportPathMap[path], page = _exportPathMap$path.page, _exportPathMap$path$q = _exportPathMap$path.query, query = _exportPathMap$path$q === undefined ? {} : _exportPathMap$path$q;
            req = { url: path };
            res = {};
            htmlFilename = path === '/' ? 'index.html' : '' + path + _path.sep + 'index.html';
            baseDir = (0, _path.join)(outDir, (0, _path.dirname)(htmlFilename));
            htmlFilepath = (0, _path.join)(outDir, htmlFilename);
            _context.next = 52;
            return (0, _mkdirpThen2.default)(baseDir);

          case 52:
            _context.next = 54;
            return (0, _render.renderToHTML)(req, res, page, query, renderOpts);

          case 54:
            html = _context.sent;

            (0, _fs.writeFileSync)(htmlFilepath, html, 'utf8');

          case 56:
            _iteratorNormalCompletion = true;
            _context.next = 41;
            break;

          case 59:
            _context.next = 65;
            break;

          case 61:
            _context.prev = 61;
            _context.t0 = _context['catch'](39);
            _didIteratorError = true;
            _iteratorError = _context.t0;

          case 65:
            _context.prev = 65;
            _context.prev = 66;

            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }

          case 68:
            _context.prev = 68;

            if (!_didIteratorError) {
              _context.next = 71;
              break;
            }

            throw _iteratorError;

          case 71:
            return _context.finish(68);

          case 72:
            return _context.finish(65);

          case 73:

            // Add an empty line to the console for the better readability.
            log('');

          case 74:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this, [[39, 61, 65, 73], [66,, 68, 72]]);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

function copyPages(nextDir, outDir, buildId) {
  // TODO: do some proper error handling
  return new _promise2.default(function (resolve, reject) {
    var nextBundlesDir = (0, _path.join)(nextDir, 'bundles', 'pages');
    var walker = _walk2.default.walk(nextBundlesDir, { followLinks: false });

    walker.on('file', function (root, stat, next) {
      var filename = stat.name;
      var fullFilePath = '' + root + _path.sep + filename;
      var relativeFilePath = fullFilePath.replace(nextBundlesDir, '');

      // We should not expose this page to the client side since
      // it has no use in the client side.
      if (relativeFilePath === '/_document.js') {
        next();
        return;
      }

      var destFilePath = null;
      if (/index\.js$/.test(filename)) {
        destFilePath = (0, _path.join)(outDir, '_next', buildId, 'page', relativeFilePath);
      } else {
        var newRelativeFilePath = relativeFilePath.replace(/\.js/, _path.sep + 'index.js');
        destFilePath = (0, _path.join)(outDir, '_next', buildId, 'page', newRelativeFilePath);
      }

      (0, _recursiveCopy2.default)(fullFilePath, destFilePath).then(next).catch(reject);
    });

    walker.on('end', resolve);
  });
}
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _map = require('babel-runtime/core-js/map');

var _map2 = _interopRequireDefault(_map);

var _path = require('path');

var _crypto = require('crypto');

var _webpack = require('webpack');

var _webpack2 = _interopRequireDefault(_webpack);

var _globPromise = require('glob-promise');

var _globPromise2 = _interopRequireDefault(_globPromise);

var _writeFileWebpackPlugin = require('write-file-webpack-plugin');

var _writeFileWebpackPlugin2 = _interopRequireDefault(_writeFileWebpackPlugin);

var _friendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

var _friendlyErrorsWebpackPlugin2 = _interopRequireDefault(_friendlyErrorsWebpackPlugin);

var _caseSensitivePathsWebpackPlugin = require('case-sensitive-paths-webpack-plugin');

var _caseSensitivePathsWebpackPlugin2 = _interopRequireDefault(_caseSensitivePathsWebpackPlugin);

var _unlinkFilePlugin = require('./plugins/unlink-file-plugin');

var _unlinkFilePlugin2 = _interopRequireDefault(_unlinkFilePlugin);

var _pagesPlugin = require('./plugins/pages-plugin');

var _pagesPlugin2 = _interopRequireDefault(_pagesPlugin);

var _dynamicChunksPlugin = require('./plugins/dynamic-chunks-plugin');

var _dynamicChunksPlugin2 = _interopRequireDefault(_dynamicChunksPlugin);

var _combineAssetsPlugin = require('./plugins/combine-assets-plugin');

var _combineAssetsPlugin2 = _interopRequireDefault(_combineAssetsPlugin);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

var _babelCore = require('babel-core');

var babelCore = _interopRequireWildcard(_babelCore);

var _findConfig = require('./babel/find-config');

var _findConfig2 = _interopRequireDefault(_findConfig);

var _rootModuleRelativePath = require('./root-module-relative-path');

var _rootModuleRelativePath2 = _interopRequireDefault(_rootModuleRelativePath);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var documentPage = (0, _path.join)('pages', '_document.js');
var defaultPages = ['_error.js', '_document.js'];
var nextPagesDir = (0, _path.join)(__dirname, '..', '..', 'pages');
var nextNodeModulesDir = (0, _path.join)(__dirname, '..', '..', '..', 'node_modules');
var interpolateNames = new _map2.default(defaultPages.map(function (p) {
  return [(0, _path.join)(nextPagesDir, p), 'dist/pages/' + p];
}));

var relativeResolve = (0, _rootModuleRelativePath2.default)(require);

exports.default = function () {
  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(dir) {
    var _this = this;

    var _ref2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        buildId = _ref2.buildId,
        _ref2$dev = _ref2.dev,
        dev = _ref2$dev === undefined ? false : _ref2$dev,
        _ref2$quiet = _ref2.quiet,
        quiet = _ref2$quiet === undefined ? false : _ref2$quiet,
        buildDir = _ref2.buildDir,
        _ref2$conf = _ref2.conf,
        conf = _ref2$conf === undefined ? null : _ref2$conf;

    var config, defaultEntries, mainJS, totalPages, entry, plugins, nodePathList, mainBabelOptions, externalBabelConfig, options, rules, webpackConfig;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            dir = (0, _path.resolve)(dir);
            config = (0, _config2.default)(dir, conf);
            defaultEntries = dev ? [(0, _path.join)(__dirname, '..', '..', 'client', 'webpack-hot-middleware-client'), (0, _path.join)(__dirname, '..', '..', 'client', 'on-demand-entries-client')] : [];
            mainJS = dev ? require.resolve('../../client/next-dev') : require.resolve('../../client/next');
            totalPages = void 0;

            entry = function () {
              var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
                var entries, pages, devPages, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, p, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, _p, _iteratorNormalCompletion3, _didIteratorError3, _iteratorError3, _iterator3, _step3, _p2, entryName;

                return _regenerator2.default.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        entries = {
                          'main.js': [].concat(defaultEntries, [mainJS])
                        };
                        _context.next = 3;
                        return (0, _globPromise2.default)('pages/**/*.js', { cwd: dir });

                      case 3:
                        pages = _context.sent;
                        devPages = pages.filter(function (p) {
                          return p === 'pages/_document.js' || p === 'pages/_error.js';
                        });

                        // In the dev environment, on-demand-entry-handler will take care of
                        // managing pages.

                        if (!dev) {
                          _context.next = 27;
                          break;
                        }

                        _iteratorNormalCompletion = true;
                        _didIteratorError = false;
                        _iteratorError = undefined;
                        _context.prev = 9;

                        for (_iterator = (0, _getIterator3.default)(devPages); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                          p = _step.value;

                          entries[(0, _path.join)('bundles', p)] = ['./' + p + '?entry'];
                        }
                        _context.next = 17;
                        break;

                      case 13:
                        _context.prev = 13;
                        _context.t0 = _context['catch'](9);
                        _didIteratorError = true;
                        _iteratorError = _context.t0;

                      case 17:
                        _context.prev = 17;
                        _context.prev = 18;

                        if (!_iteratorNormalCompletion && _iterator.return) {
                          _iterator.return();
                        }

                      case 20:
                        _context.prev = 20;

                        if (!_didIteratorError) {
                          _context.next = 23;
                          break;
                        }

                        throw _iteratorError;

                      case 23:
                        return _context.finish(20);

                      case 24:
                        return _context.finish(17);

                      case 25:
                        _context.next = 46;
                        break;

                      case 27:
                        _iteratorNormalCompletion2 = true;
                        _didIteratorError2 = false;
                        _iteratorError2 = undefined;
                        _context.prev = 30;

                        for (_iterator2 = (0, _getIterator3.default)(pages); !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                          _p = _step2.value;

                          entries[(0, _path.join)('bundles', _p)] = ['./' + _p + '?entry'];
                        }
                        _context.next = 38;
                        break;

                      case 34:
                        _context.prev = 34;
                        _context.t1 = _context['catch'](30);
                        _didIteratorError2 = true;
                        _iteratorError2 = _context.t1;

                      case 38:
                        _context.prev = 38;
                        _context.prev = 39;

                        if (!_iteratorNormalCompletion2 && _iterator2.return) {
                          _iterator2.return();
                        }

                      case 41:
                        _context.prev = 41;

                        if (!_didIteratorError2) {
                          _context.next = 44;
                          break;
                        }

                        throw _iteratorError2;

                      case 44:
                        return _context.finish(41);

                      case 45:
                        return _context.finish(38);

                      case 46:
                        _iteratorNormalCompletion3 = true;
                        _didIteratorError3 = false;
                        _iteratorError3 = undefined;
                        _context.prev = 49;


                        for (_iterator3 = (0, _getIterator3.default)(defaultPages); !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                          _p2 = _step3.value;
                          entryName = (0, _path.join)('bundles', 'pages', _p2);

                          if (!entries[entryName]) {
                            entries[entryName] = [(0, _path.join)(nextPagesDir, _p2) + '?entry'];
                          }
                        }

                        _context.next = 57;
                        break;

                      case 53:
                        _context.prev = 53;
                        _context.t2 = _context['catch'](49);
                        _didIteratorError3 = true;
                        _iteratorError3 = _context.t2;

                      case 57:
                        _context.prev = 57;
                        _context.prev = 58;

                        if (!_iteratorNormalCompletion3 && _iterator3.return) {
                          _iterator3.return();
                        }

                      case 60:
                        _context.prev = 60;

                        if (!_didIteratorError3) {
                          _context.next = 63;
                          break;
                        }

                        throw _iteratorError3;

                      case 63:
                        return _context.finish(60);

                      case 64:
                        return _context.finish(57);

                      case 65:
                        totalPages = pages.filter(function (p) {
                          return p !== documentPage;
                        }).length;

                        return _context.abrupt('return', entries);

                      case 67:
                      case 'end':
                        return _context.stop();
                    }
                  }
                }, _callee, _this, [[9, 13, 17, 25], [18,, 20, 24], [30, 34, 38, 46], [39,, 41, 45], [49, 53, 57, 65], [58,, 60, 64]]);
              }));

              return function entry() {
                return _ref3.apply(this, arguments);
              };
            }();

            plugins = [new _webpack2.default.IgnorePlugin(/(precomputed)/, /node_modules.+(elliptic)/), new _webpack2.default.LoaderOptionsPlugin({
              options: {
                context: dir,
                customInterpolateName: function customInterpolateName(url, name, opts) {
                  return interpolateNames.get(this.resourcePath) || url;
                }
              }
            }), new _writeFileWebpackPlugin2.default({
              exitOnErrors: false,
              log: false,
              // required not to cache removed files
              useHashIndex: false
            }), new _webpack2.default.optimize.CommonsChunkPlugin({
              name: 'commons',
              filename: 'commons.js',
              minChunks: function minChunks(module, count) {
                // We need to move react-dom explicitly into common chunks.
                // Otherwise, if some other page or module uses it, it might
                // included in that bundle too.
                if (module.context && module.context.indexOf(_path.sep + 'react-dom' + _path.sep) >= 0) {
                  return true;
                }

                // In the dev we use on-demand-entries.
                // So, it makes no sense to use commonChunks based on the minChunks count.
                // Instead, we move all the code in node_modules into each of the pages.
                if (dev) {
                  return false;
                }

                // If there are one or two pages, only move modules to common if they are
                // used in all of the pages. Otherwise, move modules used in at-least
                // 1/2 of the total pages into commons.
                if (totalPages <= 2) {
                  return count >= totalPages;
                }
                return count >= totalPages * 0.5;
              }
            }),
            // This chunk contains all the webpack related code. So, all the changes
            // related to that happens to this chunk.
            // It won't touch commons.js and that gives us much better re-build perf.
            new _webpack2.default.optimize.CommonsChunkPlugin({
              name: 'manifest',
              filename: 'manifest.js'
            }), new _webpack2.default.DefinePlugin({
              'process.env.NODE_ENV': (0, _stringify2.default)(dev ? 'development' : 'production')
            }), new _pagesPlugin2.default(), new _dynamicChunksPlugin2.default(), new _caseSensitivePathsWebpackPlugin2.default()];


            if (dev) {
              plugins.push(new _webpack2.default.HotModuleReplacementPlugin(), new _webpack2.default.NoEmitOnErrorsPlugin(), new _unlinkFilePlugin2.default());
              if (!quiet) {
                plugins.push(new _friendlyErrorsWebpackPlugin2.default());
              }
            } else {
              plugins.push(new _webpack2.default.IgnorePlugin(/react-hot-loader/));
              plugins.push(new _combineAssetsPlugin2.default({
                input: ['manifest.js', 'commons.js', 'main.js'],
                output: 'app.js'
              }), new _webpack2.default.optimize.UglifyJsPlugin({
                compress: { warnings: false },
                sourceMap: false
              }));
              plugins.push(new _webpack2.default.optimize.ModuleConcatenationPlugin());
            }

            nodePathList = (process.env.NODE_PATH || '').split(process.platform === 'win32' ? ';' : ':').filter(function (p) {
              return !!p;
            });
            mainBabelOptions = {
              cacheDirectory: true,
              presets: []
            };
            externalBabelConfig = (0, _findConfig2.default)(dir);

            if (externalBabelConfig) {
              console.log('> Using external babel configuration');
              console.log('> Location: "' + externalBabelConfig.loc + '"');
              // It's possible to turn off babelrc support via babelrc itself.
              // In that case, we should add our default preset.
              // That's why we need to do this.
              options = externalBabelConfig.options;

              mainBabelOptions.babelrc = options.babelrc !== false;
            } else {
              mainBabelOptions.babelrc = false;
            }

            // Add our default preset if the no "babelrc" found.
            if (!mainBabelOptions.babelrc) {
              mainBabelOptions.presets.push(require.resolve('./babel/preset'));
            }

            rules = (dev ? [{
              test: /\.js(\?[^?]*)?$/,
              loader: 'hot-self-accept-loader',
              include: [(0, _path.join)(dir, 'pages'), nextPagesDir]
            }, {
              test: /\.js(\?[^?]*)?$/,
              loader: 'react-hot-loader/webpack',
              exclude: /node_modules/
            }] : []).concat([{
              test: /\.json$/,
              loader: 'json-loader'
            }, {
              test: /\.(js|json)(\?[^?]*)?$/,
              loader: 'emit-file-loader',
              include: [dir, nextPagesDir],
              exclude: function exclude(str) {
                return (/node_modules/.test(str) && str.indexOf(nextPagesDir) !== 0
                );
              },

              options: {
                name: 'dist/[path][name].[ext]',
                // By default, our babel config does not transpile ES2015 module syntax because
                // webpack knows how to handle them. (That's how it can do tree-shaking)
                // But Node.js doesn't know how to handle them. So, we have to transpile them here.
                transform: function transform(_ref4) {
                  var content = _ref4.content,
                      sourceMap = _ref4.sourceMap,
                      interpolatedName = _ref4.interpolatedName;

                  // Only handle .js files
                  if (!/\.js$/.test(interpolatedName)) {
                    return { content: content, sourceMap: sourceMap };
                  }

                  var transpiled = babelCore.transform(content, {
                    babelrc: false,
                    sourceMaps: dev ? 'both' : false,
                    // Here we need to resolve all modules to the absolute paths.
                    // Earlier we did it with the babel-preset.
                    // But since we don't transpile ES2015 in the preset this is not resolving.
                    // That's why we need to do it here.
                    // See more: https://github.com/zeit/next.js/issues/951
                    plugins: [[require.resolve('babel-plugin-transform-es2015-modules-commonjs')], [require.resolve('babel-plugin-module-resolver'), {
                      alias: {
                        'babel-runtime': relativeResolve('babel-runtime/package'),
                        'next/link': relativeResolve('../../lib/link'),
                        'next/prefetch': relativeResolve('../../lib/prefetch'),
                        'next/css': relativeResolve('../../lib/css'),
                        'next/dynamic': relativeResolve('../../lib/dynamic'),
                        'next/head': relativeResolve('../../lib/head'),
                        'next/document': relativeResolve('../../server/document'),
                        'next/router': relativeResolve('../../lib/router'),
                        'next/error': relativeResolve('../../lib/error'),
                        'styled-jsx/style': relativeResolve('styled-jsx/style')
                      }
                    }]],
                    inputSourceMap: sourceMap
                  });

                  // Strip ?entry to map back to filesystem and work with iTerm, etc.
                  var map = transpiled.map;

                  var output = transpiled.code;

                  if (map) {
                    var nodeMap = (0, _assign2.default)({}, map);
                    nodeMap.sources = nodeMap.sources.map(function (source) {
                      return source.replace(/\?entry/, '');
                    });
                    delete nodeMap.sourcesContent;

                    // Output explicit inline source map that source-map-support can pickup via requireHook mode.
                    // Since these are not formal chunks, the devtool infrastructure in webpack does not output
                    // a source map for these files.
                    var sourceMapUrl = new Buffer((0, _stringify2.default)(nodeMap), 'utf-8').toString('base64');
                    output = output + '\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,' + sourceMapUrl;
                  }

                  return {
                    content: output,
                    sourceMap: transpiled.map
                  };
                }
              }
            }, {
              loader: 'babel-loader',
              include: nextPagesDir,
              exclude: function exclude(str) {
                return (/node_modules/.test(str) && str.indexOf(nextPagesDir) !== 0
                );
              },

              options: {
                babelrc: false,
                cacheDirectory: true,
                presets: [require.resolve('./babel/preset')]
              }
            }, {
              test: /\.js(\?[^?]*)?$/,
              loader: 'babel-loader',
              include: [dir],
              exclude: function exclude(str) {
                return (/node_modules/.test(str)
                );
              },

              options: mainBabelOptions
            }]);
            webpackConfig = {
              context: dir,
              entry: entry,
              output: {
                path: buildDir ? (0, _path.join)(buildDir, '.next') : (0, _path.join)(dir, config.distDir),
                filename: '[name]',
                libraryTarget: 'commonjs2',
                publicPath: '/_next/' + buildId + '/webpack/',
                strictModuleExceptionHandling: true,
                devtoolModuleFilenameTemplate: function devtoolModuleFilenameTemplate(_ref5) {
                  var resourcePath = _ref5.resourcePath;

                  var hash = (0, _crypto.createHash)('sha1');
                  hash.update(Date.now() + '');
                  var id = hash.digest('hex').slice(0, 7);

                  // append hash id for cache busting
                  return 'webpack:///' + resourcePath + '?' + id;
                },

                // This saves chunks with the name given via require.ensure()
                chunkFilename: '[name]'
              },
              resolve: {
                modules: [nextNodeModulesDir, 'node_modules'].concat((0, _toConsumableArray3.default)(nodePathList))
              },
              resolveLoader: {
                modules: [nextNodeModulesDir, 'node_modules', (0, _path.join)(__dirname, 'loaders')].concat((0, _toConsumableArray3.default)(nodePathList))
              },
              plugins: plugins,
              module: {
                rules: rules
              },
              devtool: dev ? 'cheap-module-inline-source-map' : false,
              performance: { hints: false }
            };

            if (!config.webpack) {
              _context2.next = 20;
              break;
            }

            console.log('> Using "webpack" config function defined in ' + config.configOrigin + '.');
            _context2.next = 19;
            return config.webpack(webpackConfig, { dev: dev });

          case 19:
            webpackConfig = _context2.sent;

          case 20:
            return _context2.abrupt('return', (0, _webpack2.default)(webpackConfig));

          case 21:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  function createCompiler(_x2) {
    return _ref.apply(this, arguments);
  }

  return createCompiler;
}();
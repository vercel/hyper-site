'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getModulePath = getModulePath;

var _babelTemplate = require('babel-template');

var _babelTemplate2 = _interopRequireDefault(_babelTemplate);

var _babelPluginSyntaxDynamicImport = require('babel-plugin-syntax-dynamic-import');

var _babelPluginSyntaxDynamicImport2 = _interopRequireDefault(_babelPluginSyntaxDynamicImport);

var _path = require('path');

var _crypto = require('crypto');

var _crypto2 = _interopRequireDefault(_crypto);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Based on https://github.com/airbnb/babel-plugin-dynamic-import-webpack
// We've added support for SSR with this version
var TYPE_IMPORT = 'Import';

var buildImport = function buildImport(args) {
  return (0, _babelTemplate2.default)('\n  (\n    typeof window === \'undefined\' ?\n      new (require(\'next/dynamic\').SameLoopPromise)((resolve, reject) => {\n        eval(\'require.ensure = function (deps, callback) { callback(require) }\')\n        require.ensure([], (require) => {\n          let m = require(SOURCE)\n          m.__webpackChunkName = \'' + args.name + '.js\'\n          resolve(m);\n        }, \'chunks/' + args.name + '.js\');\n      })\n      :\n      new (require(\'next/dynamic\').SameLoopPromise)((resolve, reject) => {\n        const weakId = require.resolveWeak(SOURCE)\n        try {\n          const weakModule = __webpack_require__(weakId)\n          return resolve(weakModule)\n        } catch (err) {}\n\n        require.ensure([], (require) => {\n          try {\n            let m = require(SOURCE)\n            resolve(m)\n          } catch(error) {\n            reject(error)\n          }\n        }, \'chunks/' + args.name + '.js\');\n      })\n  )\n');
};

function getModulePath(sourceFilename, moduleName) {
  // resolve only if it's a local module
  var modulePath = moduleName[0] === '.' ? (0, _path.resolve)((0, _path.dirname)(sourceFilename), moduleName) : moduleName;

  var cleanedModulePath = modulePath.replace(/(index){0,1}\.js$/, '') // remove .js, index.js
  .replace(/[/\\]$/, ''); // remove end slash

  return cleanedModulePath;
}

exports.default = function () {
  return {
    inherits: _babelPluginSyntaxDynamicImport2.default,

    visitor: {
      CallExpression: function CallExpression(path, state) {
        if (path.node.callee.type === TYPE_IMPORT) {
          var moduleName = path.node.arguments[0].value;
          var sourceFilename = state.file.opts.filename;

          var modulePath = getModulePath(sourceFilename, moduleName);
          var modulePathHash = _crypto2.default.createHash('md5').update(modulePath).digest('hex');

          var relativeModulePath = modulePath.replace('' + process.cwd() + _path.sep, '');
          var name = relativeModulePath.replace(/[^\w]/g, '_') + '_' + modulePathHash;

          var newImport = buildImport({
            name: name
          })({
            SOURCE: path.node.arguments
          });
          path.replaceWith(newImport);
        }
      }
    }
  };
};
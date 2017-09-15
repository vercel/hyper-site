'use strict';

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _path = require('path');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function (content, sourceMap) {
  this.cacheable();

  var route = getRoute(this);

  this.callback(null, content + '\n    (function (Component, route) {\n      if (!module.hot) return\n      if (!__resourceQuery) return\n\n      var qs = require(\'querystring\')\n      var params = qs.parse(__resourceQuery.slice(1))\n      if (params.entry == null) return\n\n      module.hot.accept()\n      Component.__route = route\n\n      if (module.hot.status() === \'idle\') return\n\n      var components = next.router.components\n      for (var r in components) {\n        if (!components.hasOwnProperty(r)) continue\n\n        if (components[r].Component.__route === route) {\n          next.router.update(r, Component)\n        }\n      }\n    })(typeof __webpack_exports__ !== \'undefined\' ? __webpack_exports__.default : (module.exports.default || module.exports), ' + (0, _stringify2.default)(route) + ')\n  ', sourceMap);
};

var nextPagesDir = (0, _path.resolve)(__dirname, '..', '..', '..', 'pages');

function getRoute(loaderContext) {
  var pagesDir = (0, _path.resolve)(loaderContext.options.context, 'pages');
  var resourcePath = loaderContext.resourcePath;

  var dir = [pagesDir, nextPagesDir].find(function (d) {
    return resourcePath.indexOf(d) === 0;
  });
  var path = (0, _path.relative)(dir, resourcePath);
  return '/' + path.replace(/((^|\/)index)?\.js$/, '');
}
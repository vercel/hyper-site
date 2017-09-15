'use strict';

var _loaderUtils = require('loader-utils');

var _loaderUtils2 = _interopRequireDefault(_loaderUtils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function (content, sourceMap) {
  var _this = this;

  this.cacheable();

  var query = _loaderUtils2.default.getOptions(this);
  var name = query.name || '[hash].[ext]';
  var context = query.context || this.options.context;
  var regExp = query.regExp;
  var opts = { context: context, content: content, regExp: regExp };
  var interpolatedName = _loaderUtils2.default.interpolateName(this, name, opts);

  var emit = function emit(code, map) {
    _this.emitFile(interpolatedName, code, map);
    _this.callback(null, code, map);
  };

  if (query.transform) {
    var transformed = query.transform({ content: content, sourceMap: sourceMap, interpolatedName: interpolatedName });
    return emit(transformed.content, transformed.sourceMap);
  }

  return emit(content, sourceMap);
};
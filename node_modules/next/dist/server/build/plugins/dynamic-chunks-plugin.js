'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PagesPlugin = function () {
  function PagesPlugin() {
    (0, _classCallCheck3.default)(this, PagesPlugin);
  }

  (0, _createClass3.default)(PagesPlugin, [{
    key: 'apply',
    value: function apply(compiler) {
      var isImportChunk = /^chunks[/\\].*\.js$/;
      var matchChunkName = /^chunks[/\\](.*)$/;

      compiler.plugin('after-compile', function (compilation, callback) {
        var chunks = (0, _keys2.default)(compilation.namedChunks).map(function (key) {
          return compilation.namedChunks[key];
        }).filter(function (chunk) {
          return isImportChunk.test(chunk.name);
        });

        chunks.forEach(function (chunk) {
          var asset = compilation.assets[chunk.name];
          if (!asset) return;

          var chunkName = matchChunkName.exec(chunk.name)[1];

          var content = asset.source();
          var newContent = '\n          window.__NEXT_REGISTER_CHUNK(\'' + chunkName + '\', function() {\n            ' + content + '\n          })\n        ';
          // Replace the exisiting chunk with the new content
          compilation.assets[chunk.name] = {
            source: function source() {
              return newContent;
            },
            size: function size() {
              return newContent.length;
            }

            // This is to support, webpack dynamic import support with HMR
          };compilation.assets['chunks/' + chunk.id] = {
            source: function source() {
              return newContent;
            },
            size: function size() {
              return newContent.length;
            }
          };
        });
        callback();
      });
    }
  }]);
  return PagesPlugin;
}();

exports.default = PagesPlugin;
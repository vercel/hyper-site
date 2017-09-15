'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MATCH_ROUTE_NAME = exports.IS_BUNDLED_PAGE = undefined;
exports.getAvailableChunks = getAvailableChunks;

var _path = require('path');

var _fs = require('fs');

var IS_BUNDLED_PAGE = exports.IS_BUNDLED_PAGE = /^bundles[/\\]pages.*\.js$/;
var MATCH_ROUTE_NAME = exports.MATCH_ROUTE_NAME = /^bundles[/\\]pages[/\\](.*)\.js$/;

function getAvailableChunks(dir, dist) {
  var chunksDir = (0, _path.join)(dir, dist, 'chunks');
  if (!(0, _fs.existsSync)(chunksDir)) return {};

  var chunksMap = {};
  var chunkFiles = (0, _fs.readdirSync)(chunksDir);

  chunkFiles.forEach(function (filename) {
    if (/\.js$/.test(filename)) {
      chunksMap[filename] = true;
    }
  });

  return chunksMap;
}
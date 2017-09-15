'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _EventEmitter = require('./EventEmitter');

var _EventEmitter2 = _interopRequireDefault(_EventEmitter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var webpackModule = module; /* global window, document, __NEXT_DATA__ */

var PageLoader = function () {
  function PageLoader(buildId, assetPrefix) {
    (0, _classCallCheck3.default)(this, PageLoader);

    this.buildId = buildId;
    this.assetPrefix = assetPrefix;

    this.pageCache = {};
    this.pageLoadedHandlers = {};
    this.pageRegisterEvents = new _EventEmitter2.default();
    this.loadingRoutes = {};

    this.chunkRegisterEvents = new _EventEmitter2.default();
    this.loadedChunks = {};
  }

  (0, _createClass3.default)(PageLoader, [{
    key: 'normalizeRoute',
    value: function normalizeRoute(route) {
      if (route[0] !== '/') {
        throw new Error('Route name should start with a "/", got "' + route + '"');
      }
      route = route.replace(/\/index$/, '/');

      if (route === '/') return route;
      return route.replace(/\/$/, '');
    }
  }, {
    key: 'loadPage',
    value: function loadPage(route) {
      var _this = this;

      route = this.normalizeRoute(route);

      return new _promise2.default(function (resolve, reject) {
        var fire = function fire(_ref) {
          var error = _ref.error,
              page = _ref.page;

          _this.pageRegisterEvents.off(route, fire);
          delete _this.loadingRoutes[route];

          if (error) {
            reject(error);
          } else {
            resolve(page);
          }
        };

        // If there's a cached version of the page, let's use it.
        var cachedPage = _this.pageCache[route];
        if (cachedPage) {
          var error = cachedPage.error,
              page = cachedPage.page;

          error ? reject(error) : resolve(page);
          return;
        }

        // Register a listener to get the page
        _this.pageRegisterEvents.on(route, fire);

        // If the page is loading via SSR, we need to wait for it
        // rather downloading it again.
        if (document.getElementById('__NEXT_PAGE__' + route)) {
          return;
        }

        // Load the script if not asked to load yet.
        if (!_this.loadingRoutes[route]) {
          _this.loadScript(route);
          _this.loadingRoutes[route] = true;
        }
      });
    }
  }, {
    key: 'loadScript',
    value: function loadScript(route) {
      var _this2 = this;

      route = this.normalizeRoute(route);

      if (__NEXT_DATA__.nextExport) {
        route = route === '/' ? '/index.js' : route + '/index.js';
      }

      var script = document.createElement('script');
      var url = this.assetPrefix + '/_next/' + encodeURIComponent(this.buildId) + '/page' + route;
      script.src = url;
      script.type = 'text/javascript';
      script.onerror = function () {
        var error = new Error('Error when loading route: ' + route);
        _this2.pageRegisterEvents.emit(route, { error: error });
      };

      document.body.appendChild(script);
    }

    // This method if called by the route code.

  }, {
    key: 'registerPage',
    value: function registerPage(route, regFn) {
      var _this3 = this;

      var register = function register() {
        try {
          var _regFn = regFn(),
              error = _regFn.error,
              page = _regFn.page;

          _this3.pageCache[route] = { error: error, page: page };
          _this3.pageRegisterEvents.emit(route, { error: error, page: page });
        } catch (error) {
          _this3.pageCache[route] = { error: error };
          _this3.pageRegisterEvents.emit(route, { error: error });
        }
      };

      // Wait for webpack to become idle if it's not.
      // More info: https://github.com/zeit/next.js/pull/1511
      if (webpackModule && webpackModule.hot && webpackModule.hot.status() !== 'idle') {
        console.log('Waiting for webpack to become "idle" to initialize the page: "' + route + '"');

        var check = function check(status) {
          if (status === 'idle') {
            webpackModule.hot.removeStatusHandler(check);
            register();
          }
        };
        webpackModule.hot.status(check);
      } else {
        register();
      }
    }
  }, {
    key: 'registerChunk',
    value: function registerChunk(chunkName, regFn) {
      var chunk = regFn();
      this.loadedChunks[chunkName] = true;
      this.chunkRegisterEvents.emit(chunkName, chunk);
    }
  }, {
    key: 'waitForChunk',
    value: function waitForChunk(chunkName, regFn) {
      var _this4 = this;

      var loadedChunk = this.loadedChunks[chunkName];
      if (loadedChunk) {
        return _promise2.default.resolve(true);
      }

      return new _promise2.default(function (resolve) {
        var register = function register(chunk) {
          _this4.chunkRegisterEvents.off(chunkName, register);
          resolve(chunk);
        };

        _this4.chunkRegisterEvents.on(chunkName, register);
      });
    }
  }, {
    key: 'clearCache',
    value: function clearCache(route) {
      route = this.normalizeRoute(route);
      delete this.pageCache[route];
      delete this.loadingRoutes[route];

      var script = document.getElementById('__NEXT_PAGE__' + route);
      if (script) {
        script.parentNode.removeChild(script);
      }
    }
  }]);
  return PageLoader;
}();

exports.default = PageLoader;
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = setupReact;

var _EventPluginHub = require('react-dom/lib/EventPluginHub');

var _EventPluginHub2 = _interopRequireDefault(_EventPluginHub);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var hub = _EventPluginHub2.default;

function setupReact() {
  hub.injection.injectEventPluginsByName({
    ResponderEventPlugin: {
      extractEvents: function extractEvents(topLevelType, targetInst, nativeEvent) {
        if (topLevelType !== 'click' || !targetInst) {
          return;
        }

        var currentElement = targetInst._debugOwner;

        var names = [];
        while (currentElement) {
          var name = currentElement.type.displayName || currentElement.type.name;
          if (name) {
            names.push(name);
          }
          currentElement = currentElement._debugOwner;
        }

        // eslint-disable-next-line no-param-reassign
        nativeEvent.__lrName = names;
      }
    }
  });
}
module.exports = exports['default'];
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _emojiMenu = _interopRequireDefault(require("./emoji-menu"));

var _utils = require("./utils");

var _emojiIcons = require("./emoji-icons");

require("./style.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var EzEmoji = /*#__PURE__*/function (_Component) {
  _inherits(EzEmoji, _Component);

  function EzEmoji(props) {
    var _this;

    _classCallCheck(this, EzEmoji);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(EzEmoji).call(this, props));
    _this.state = {
      emojis: _emojiIcons.emojiIcons,
      savedSelection: {
        start: 0,
        end: 0
      },
      menuVisible: false
    };
    _this.inputRef = _react.default.createRef();
    _this.menuRef = _react.default.createRef();
    _this.onChange = _this.onChange.bind(_assertThisInitialized(_this));
    _this.MenuToggle = _this.MenuToggle.bind(_assertThisInitialized(_this));
    _this.getSanitizedVal = _this.getSanitizedVal.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(EzEmoji, [{
    key: "getSanitizedVal",
    value: function getSanitizedVal() {
      var el = this.inputRef.current;
      return (0, _utils.sanitizeInput)(el);
    }
  }, {
    key: "onChange",
    value: function onChange() {
      var savedSel = (0, _utils.saveSelection)(this.inputRef.current);
      var sanitizedText = this.getSanitizedVal();
      this.props.setVal(sanitizedText);
      this.setState({
        savedSelection: savedSel
      });
      document.execCommand('enableObjectResizing', true, true);
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      (0, _utils.restoreSelection)(this.inputRef.current, this.state.savedSelection);
    }
  }, {
    key: "disableResize",
    value: function disableResize() {
      document.execCommand('enableObjectResizing', false, false);
    }
  }, {
    key: "MenuToggle",
    value: function MenuToggle() {
      this.setState({
        menuVisible: !this.state.menuVisible
      });
    }
  }, {
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextprop, nextstate) {
      return this.state.menuVisible !== nextstate.menuVisible;
    }
  }, {
    key: "render",
    value: function render() {
      return _react.default.createElement("div", {
        className: "ez-emoji-container"
      }, _react.default.createElement("div", {
        className: "emoji-wysiwyg-editor",
        id: "ez-emoji-input",
        contentEditable: true,
        suppressContentEditableWarning: "true",
        onKeyUp: this.onChange,
        onPaste: this.onChange,
        onMouseDown: this.disableResize,
        onFocus: this.onFocus,
        ref: this.inputRef
      }), _react.default.createElement("svg", {
        onClick: this.MenuToggle,
        className: "ez-emoji-btn",
        "aria-hidden": "true",
        focusable: "false",
        "data-prefix": "fa",
        "data-icon": "smile",
        role: "img",
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 496 512",
        "data-fa-i2svg": ""
      }, _react.default.createElement("path", {
        fill: "currentColor",
        d: "M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm80 168c17.7 0 32 14.3 32 32s-14.3 32-32 32-32-14.3-32-32 14.3-32 32-32zm-160 0c17.7 0 32 14.3 32 32s-14.3 32-32 32-32-14.3-32-32 14.3-32 32-32zm194.8 170.2C334.3 380.4 292.5 400 248 400s-86.3-19.6-114.8-53.8c-13.6-16.3 11-36.7 24.6-20.5 22.4 26.9 55.2 42.2 90.2 42.2s67.8-15.4 90.2-42.2c13.4-16.2 38.1 4.2 24.6 20.5z"
      })), this.state.menuVisible && _react.default.createElement(_emojiMenu.default, {
        emojiPath: this.props.emojiPath,
        triggerChange: this.onChange,
        MenuToggle: this.MenuToggle
      }));
    }
  }]);

  return EzEmoji;
}(_react.Component);

exports.default = EzEmoji;
EzEmoji.propTypes = {
  setVal: _propTypes.default.func.isRequired,
  emojiPath: _propTypes.default.string.isRequired
};
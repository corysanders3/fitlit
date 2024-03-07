/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),
/* 2 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



var isOldIE = function isOldIE() {
  var memo;
  return function memorize() {
    if (typeof memo === 'undefined') {
      // Test for IE <= 9 as proposed by Browserhacks
      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
      // Tests for existence of standard globals is to allow style-loader
      // to operate correctly into non-standard environments
      // @see https://github.com/webpack-contrib/style-loader/issues/177
      memo = Boolean(window && document && document.all && !window.atob);
    }

    return memo;
  };
}();

var getTarget = function getTarget() {
  var memo = {};
  return function memorize(target) {
    if (typeof memo[target] === 'undefined') {
      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

      if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
        try {
          // This will throw an exception if access to iframe is blocked
          // due to cross-origin restrictions
          styleTarget = styleTarget.contentDocument.head;
        } catch (e) {
          // istanbul ignore next
          styleTarget = null;
        }
      }

      memo[target] = styleTarget;
    }

    return memo[target];
  };
}();

var stylesInDom = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDom.length; i++) {
    if (stylesInDom[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var index = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3]
    };

    if (index !== -1) {
      stylesInDom[index].references++;
      stylesInDom[index].updater(obj);
    } else {
      stylesInDom.push({
        identifier: identifier,
        updater: addStyle(obj, options),
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function insertStyleElement(options) {
  var style = document.createElement('style');
  var attributes = options.attributes || {};

  if (typeof attributes.nonce === 'undefined') {
    var nonce =  true ? __webpack_require__.nc : 0;

    if (nonce) {
      attributes.nonce = nonce;
    }
  }

  Object.keys(attributes).forEach(function (key) {
    style.setAttribute(key, attributes[key]);
  });

  if (typeof options.insert === 'function') {
    options.insert(style);
  } else {
    var target = getTarget(options.insert || 'head');

    if (!target) {
      throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
    }

    target.appendChild(style);
  }

  return style;
}

function removeStyleElement(style) {
  // istanbul ignore if
  if (style.parentNode === null) {
    return false;
  }

  style.parentNode.removeChild(style);
}
/* istanbul ignore next  */


var replaceText = function replaceText() {
  var textStore = [];
  return function replace(index, replacement) {
    textStore[index] = replacement;
    return textStore.filter(Boolean).join('\n');
  };
}();

function applyToSingletonTag(style, index, remove, obj) {
  var css = remove ? '' : obj.media ? "@media ".concat(obj.media, " {").concat(obj.css, "}") : obj.css; // For old IE

  /* istanbul ignore if  */

  if (style.styleSheet) {
    style.styleSheet.cssText = replaceText(index, css);
  } else {
    var cssNode = document.createTextNode(css);
    var childNodes = style.childNodes;

    if (childNodes[index]) {
      style.removeChild(childNodes[index]);
    }

    if (childNodes.length) {
      style.insertBefore(cssNode, childNodes[index]);
    } else {
      style.appendChild(cssNode);
    }
  }
}

function applyToTag(style, options, obj) {
  var css = obj.css;
  var media = obj.media;
  var sourceMap = obj.sourceMap;

  if (media) {
    style.setAttribute('media', media);
  } else {
    style.removeAttribute('media');
  }

  if (sourceMap && typeof btoa !== 'undefined') {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    while (style.firstChild) {
      style.removeChild(style.firstChild);
    }

    style.appendChild(document.createTextNode(css));
  }
}

var singleton = null;
var singletonCounter = 0;

function addStyle(obj, options) {
  var style;
  var update;
  var remove;

  if (options.singleton) {
    var styleIndex = singletonCounter++;
    style = singleton || (singleton = insertStyleElement(options));
    update = applyToSingletonTag.bind(null, style, styleIndex, false);
    remove = applyToSingletonTag.bind(null, style, styleIndex, true);
  } else {
    style = insertStyleElement(options);
    update = applyToTag.bind(null, style, options);

    remove = function remove() {
      removeStyleElement(style);
    };
  }

  update(obj);
  return function updateStyle(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {
        return;
      }

      update(obj = newObj);
    } else {
      remove();
    }
  };
}

module.exports = function (list, options) {
  options = options || {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
  // tags it will allow on a page

  if (!options.singleton && typeof options.singleton !== 'boolean') {
    options.singleton = isOldIE();
  }

  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    if (Object.prototype.toString.call(newList) !== '[object Array]') {
      return;
    }

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDom[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDom[_index].references === 0) {
        stylesInDom[_index].updater();

        stylesInDom.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),
/* 3 */
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4);
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "body,\nhtml {\n  background-image: linear-gradient(to right bottom, #e3edf7, #dde7f1, #d7e1eb, #d2dce6, #ccd6e0, #ccd6e0, #ccd6e0, #ccd6e0, #d2dce6, #d7e1eb, #dde7f1, #e3edf7);\n  color: #e3edf7;\n  background-repeat: no-repeat;\n  height: 100vh;\n  width: 100vw;\n  margin: 0;\n  font-family: \"M PLUS Rounded 1c\", sans-serif;\n}\n\nsection,\naside,\n.main,\n.info-area,\n.sleep-area,\n.widget,\n#infoCard,\n#days,\n#hydrationDaysLabel,\n#hydrationBottleLabel,\n#hydrationBottle,\n.meter-container,\n.sleep-titles {\n  display: flex;\n}\n\n.main,\n.sleep-area,\n#sleepWidget,\n#infoCard,\n#sleepAveragesWidget,\n#hydrationWidget {\n  flex-direction: column;\n}\n\naside,\n.sleep-titles,\n.meter-container,\n#days,\n#hydrationDaysLabel,\n#hydrationBottleLabel {\n  justify-content: space-evenly;\n}\n\n#meter-container-avg {\n  margin-bottom: 5%;\n}\n\nsection,\n#infoCard,\n#days,\n#hydrationDaysLabel,\n#hydrationBottleLabel,\n#hydrationBottle,\n#hydrationWidget {\n  justify-content: center;\n  align-items: center;\n}\n\nsection,\n#hydrationBottle,\n#hydrationWidget .hydration-area,\n#waterMeterContainer,\n#waterBottle {\n  height: 100%;\n}\n\n.info-area,\n.sleep-area,\n.widget-area,\n#hydrationVisual,\n#hydrationDays,\n#hydrationDaysLabel,\n#hydrationBottleLabel,\n#waterMeterContainer {\n  width: 100%;\n}\n\n#info,\n#friends,\n#days,\n#hydrationDaysLabel,\n#hydrationBottleLabel,\n#dateSleepTitle,\n#averageSleepTitle {\n  text-align: center;\n}\n\n#hydrationDaysLabel,\n#hydrationBottleLabel {\n  height: 10%;\n}\n\n.main {\n  height: 100vh;\n  width: 100vw;\n}\n\n.widget-area {\n  height: 90%;\n}\n\n#days {\n  height: 6%;\n}\n\n.info-area,\n.sleep-area,\n.hydration-area {\n  height: 90%;\n  width: 33%;\n  justify-content: center;\n  align-items: center;\n  text-align: center;\n}\n\n.widget {\n  height: 80%;\n  width: 90%;\n  border-radius: 3rem;\n  box-shadow: 10px 10px 12px -1px rgba(0, 0, 0, 0.61), -10px 10px 15px -1px rgba(255, 255, 255, 0.822);\n}\n\n#infoCard {\n  height: 100%;\n  width: 95%;\n  background-image: linear-gradient(to right bottom, #ff6968, #fe706e, #fc7675, #fb7c7b, #f98281, #f98281, #f98281, #f98281, #fb7c7b, #fc7675, #fe706e, #ff6968);\n}\n\n#info {\n  width: 60%;\n  margin-bottom: 5%;\n}\n\n#friends {\n  width: 90%;\n  overflow: auto;\n  border-top: 4px solid white;\n}\n\n::-webkit-scrollbar {\n  -webkit-appearance: none;\n  width: 10px;\n}\n\n::-webkit-scrollbar-thumb {\n  border-radius: 5px;\n  background-color: rgba(0, 0, 0, 0.5);\n  -webkit-box-shadow: 0 0 1px rgba(255, 255, 255, 0.5);\n}\n\n#friendsHeader {\n  margin-bottom: 8%;\n  padding-top: 5%;\n}\n\nh1 {\n  font-size: x-large;\n  font-weight: 600;\n  margin: 2%;\n}\n\n#name {\n  font-size: 1.6rem;\n  text-shadow: -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000, 2px 2px 0 #000;\n}\n\nh2 {\n  font-size: large;\n  font-weight: 700;\n  margin: 0;\n}\n\nh3 {\n  font-size: medium;\n  font-weight: 700;\n  margin: 2%;\n}\n\n#hydrationWidget {\n  height: 100%;\n  background-image: linear-gradient(to right bottom, #2ac3ff, #48c7fc, #5dcbfa, #6ecef7, #7ed2f5, #7ed2f5, #7ed2f5, #7ed2f5, #6ecef7, #5dcbfa, #48c7fc, #2ac3ff);\n}\n\n#hydrationVisual {\n  height: 60%;\n}\n\n#hydrationBottleLabel {\n  margin-top: 10%;\n}\n\n#days {\n  width: 100vw;\n}\n\n.day-selector,\n.input-hydration,\n.save-layout-button {\n  height: 80%;\n  width: 10%;\n  border: none;\n  border-radius: 1rem;\n  font-family: \"M PLUS Rounded 1c\", sans-serif;\n  font-size: large;\n  font-weight: 400;\n  color: #e3edf7;\n  background-image: linear-gradient(to right bottom, #4b4b86, #50508b, #56568f, #5b5b94, #616199, #616199, #616199, #616199, #5b5b94, #56568f, #50508b, #4b4b86);\n  box-shadow: 5px 5px 12px -1px rgba(0, 0, 0, 0.61), -5px 5px 15px -1px rgba(255, 255, 255, 0.822);\n}\n\nbutton {\n  background-color: #466585;\n  cursor: pointer;\n}\n\n#waterMeter {\n  height: 10%;\n  width: 10%;\n}\n\n#sleepWidget {\n  background-image: linear-gradient(to right bottom, #5a65ff, #636dfe, #6d76fd, #757efc, #7e86fb, #7e86fb, #7e86fb, #7e86fb, #757efc, #6d76fd, #636dfe, #5a65ff);\n  height: 55%;\n  width: 100%;\n}\n\n#sleepAveragesWidget {\n  background-image: linear-gradient(to right bottom, #7a55fd, #8261fb, #8b6cf9, #9276f7, #9a81f4, #9a81f4, #9a81f4, #9a81f4, #9276f7, #8b6cf9, #8261fb, #7a55fd);\n  height: 45%;\n  width: 100%;\n  margin-bottom: 2%;\n}\n\n.sleep-meter {\n  position: relative;\n  height: 10rem;\n  width: 10rem;\n  border-radius: 50%;\n  display: grid;\n  place-items: center;\n}\n\n.sleep-meter:before {\n  content: \"\";\n  position: absolute;\n  height: 84%;\n  width: 84%;\n  background-color: #fff;\n  border-radius: 50%;\n}\n\n.sleep-data {\n  position: relative;\n  font-family: \"Poppins\", sans-serif;\n  font-size: 2.5rem;\n  color: purple;\n  filter: none;\n}\n\n#averageSleepTitle {\n  margin-top: -2%;\n}\n\n.sleep-titles {\n  height: 5%;\n  margin-bottom: 3%;\n}\n\n.sleep-widget-pair {\n  height: 100%;\n  width: 90%;\n}\n\n.input-hydration {\n  height: 5%;\n  width: 40%;\n  background: #48494B;\n  color: #fff;\n  font-weight: 500;\n  box-shadow: 5px 5px 12px -1px rgba(0, 0, 0, 0.61), -5px 5px 15px -1px rgba(0, 0, 0, 0.61);\n  cursor: pointer;\n}\n\n#hydrationForm {\n  background-color: #2ac3ff;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: space-around;\n  height: 400px;\n  width: 250px;\n  box-shadow: 5px 5px 12px -1px rgba(0, 0, 0, 0.61), -5px 5px 15px -1px rgba(0, 0, 0, 0.61);\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n}\n\n.pop-up-form {\n  display: none;\n  width: 100%;\n  height: 100%;\n  top: 0;\n  left: 0;\n  position: fixed;\n  backdrop-filter: blur(6px);\n}\n\n#hydrationForm input[type=date], #hydrationForm input[type=number] {\n  background: white;\n  width: 50%;\n  height: 30px;\n}\n\n#hydrationForm button {\n  border-radius: 10%;\n  width: 100px;\n  height: 50px;\n  border: none;\n  font-size: 20px;\n}\n\n#hydrationForm aside {\n  display: flex;\n  justify-content: space-around;\n  width: 100%;\n  align-items: center;\n}\n\n.closeBtn {\n  background-color: red;\n  color: #fff;\n}\n\n.form-error {\n  color: red;\n  font-weight: 900;\n  text-align: center;\n  margin: 0px;\n}\n\n.hydration-form {\n  margin-bottom: 0px;\n}\n\n.formBtn {\n  background-color: white;\n}\n\nlabel {\n  font-weight: 700;\n}\n\n.blur {\n  filter: blur(4px);\n}\n\n.draggable {\n  cursor: move;\n}\n\n.draggable.dragging {\n  opacity: 0.2;\n}\n\n.drag-drop-icon {\n  position: absolute;\n  height: 8%;\n  width: 8%;\n}\n\n#dragAndDrop1 {\n  top: 8%;\n  left: 30%;\n}\n\n#dragAndDrop2 {\n  top: 8%;\n  right: 30%;\n}\n\n.drag-and-drop-hint {\n  height: 4%;\n}\n\n.drag-and-drop-label {\n  color: black;\n  margin: 0;\n  font-weight: 600;\n  text-align: center;\n  padding-top: 5%;\n}\n\n.save-layout-button {\n  font-size: small;\n  height: 100%;\n  width: 60%;\n  margin-top: 2%;\n  cursor: pointer;\n}", "",{"version":3,"sources":["webpack://./src/css/styles.css"],"names":[],"mappings":"AAAA;;EAEE,8JAAA;EACA,cAAA;EACA,4BAAA;EACA,aAAA;EACA,YAAA;EACA,SAAA;EACA,4CAAA;AACF;;AAEA;;;;;;;;;;;;;EAaE,aAAA;AACF;;AAEA;;;;;;EAME,sBAAA;AACF;;AAEA;;;;;;EAME,6BAAA;AACF;;AAEA;EACE,iBAAA;AACF;;AAEA;;;;;;;EAOE,uBAAA;EACA,mBAAA;AACF;;AAEA;;;;;EAME,YAAA;AAAF;;AAGA;;;;;;;;EAQE,WAAA;AAAF;;AAGA;;;;;;;EAOE,kBAAA;AAAF;;AAGA;;EAEE,WAAA;AAAF;;AAGA;EACE,aAAA;EACA,YAAA;AAAF;;AAGA;EACE,WAAA;AAAF;;AAGA;EACE,UAAA;AAAF;;AAGA;;;EAGE,WAAA;EACA,UAAA;EACA,uBAAA;EACA,mBAAA;EACA,kBAAA;AAAF;;AAGA;EACE,WAAA;EACA,UAAA;EACA,mBAAA;EACA,oGAAA;AAAF;;AAIA;EACE,YAAA;EACA,UAAA;EACA,8JAAA;AADF;;AAIA;EACE,UAAA;EACA,iBAAA;AADF;;AAIA;EACE,UAAA;EACA,cAAA;EACA,2BAAA;AADF;;AAIA;EACE,wBAAA;EACA,WAAA;AADF;;AAIA;EACE,kBAAA;EACA,oCAAA;EACA,oDAAA;AADF;;AAIA;EACE,iBAAA;EACA,eAAA;AADF;;AAIA;EACE,kBAAA;EACA,gBAAA;EACA,UAAA;AADF;;AAIA;EACE,iBAAA;EACA,+EACE;AAFJ;;AAQA;EACE,gBAAA;EACA,gBAAA;EACA,SAAA;AALF;;AAQA;EACE,iBAAA;EACA,gBAAA;EACA,UAAA;AALF;;AAQA;EACE,YAAA;EACA,8JAAA;AALF;;AAQA;EACE,WAAA;AALF;;AAQA;EACE,eAAA;AALF;;AAQA;EACE,YAAA;AALF;;AAQA;;;EAGE,WAAA;EACA,UAAA;EACA,YAAA;EACA,mBAAA;EACA,4CAAA;EACA,gBAAA;EACA,gBAAA;EACA,cAAA;EACA,8JAAA;EACA,gGAAA;AALF;;AASA;EACE,yBAAA;EACA,eAAA;AANF;;AASA;EACE,WAAA;EACA,UAAA;AANF;;AASA;EACE,8JAAA;EACA,WAAA;EACA,WAAA;AANF;;AAUA;EACE,8JAAA;EACA,WAAA;EACA,WAAA;EACA,iBAAA;AAPF;;AAUA;EACE,kBAAA;EACA,aAAA;EACA,YAAA;EACA,kBAAA;EACA,aAAA;EACA,mBAAA;AAPF;;AAUA;EACE,WAAA;EACA,kBAAA;EACA,WAAA;EACA,UAAA;EACA,sBAAA;EACA,kBAAA;AAPF;;AAUA;EACE,kBAAA;EACA,kCAAA;EACA,iBAAA;EACA,aAAA;EACA,YAAA;AAPF;;AAUA;EACE,eAAA;AAPF;;AAUA;EACE,UAAA;EACA,iBAAA;AAPF;;AAUA;EACE,YAAA;EACA,UAAA;AAPF;;AAUA;EACE,UAAA;EACA,UAAA;EACA,mBAAA;EACA,WAAA;EACA,gBAAA;EACA,yFAAA;EAEA,eAAA;AARF;;AAWA;EACE,yBAAA;EACA,aAAA;EACA,sBAAA;EACA,mBAAA;EACA,6BAAA;EACA,aAAA;EACA,YAAA;EACA,yFAAA;EAEA,kBAAA;EACA,QAAA;EACA,SAAA;EACA,gCAAA;AATF;;AAYA;EACE,aAAA;EACA,WAAA;EACA,YAAA;EACA,MAAA;EACA,OAAA;EACA,eAAA;EACA,0BAAA;AATF;;AAYA;EACE,iBAAA;EACA,UAAA;EACA,YAAA;AATF;;AAYA;EACE,kBAAA;EACA,YAAA;EACA,YAAA;EACA,YAAA;EACA,eAAA;AATF;;AAYA;EACE,aAAA;EACA,6BAAA;EACA,WAAA;EACA,mBAAA;AATF;;AAYA;EACE,qBAAA;EACA,WAAA;AATF;;AAYA;EACE,UAAA;EACA,gBAAA;EACA,kBAAA;EACA,WAAA;AATF;;AAYA;EACE,kBAAA;AATF;;AAYA;EACE,uBAAA;AATF;;AAYA;EACE,gBAAA;AATF;;AAYA;EACE,iBAAA;AATF;;AAYA;EACE,YAAA;AATF;;AAYA;EACE,YAAA;AATF;;AAYA;EACE,kBAAA;EACA,UAAA;EACA,SAAA;AATF;;AAYA;EACE,OAAA;EACA,SAAA;AATF;;AAYA;EACE,OAAA;EACA,UAAA;AATF;;AAYA;EACE,UAAA;AATF;;AAYA;EACE,YAAA;EACA,SAAA;EACA,gBAAA;EACA,kBAAA;EACA,eAAA;AATF;;AAYA;EACE,gBAAA;EACA,YAAA;EACA,UAAA;EACA,cAAA;EACA,eAAA;AATF","sourcesContent":["body,\nhtml {\n  background-image: linear-gradient(to right bottom, #e3edf7, #dde7f1, #d7e1eb, #d2dce6, #ccd6e0, #ccd6e0, #ccd6e0, #ccd6e0, #d2dce6, #d7e1eb, #dde7f1, #e3edf7);\n  color: #e3edf7;\n  background-repeat: no-repeat;\n  height: 100vh;\n  width: 100vw;\n  margin: 0;\n  font-family: 'M PLUS Rounded 1c', sans-serif;\n}\n\nsection,\naside,\n.main, \n.info-area,\n.sleep-area,\n.widget,\n#infoCard,\n#days,\n#hydrationDaysLabel,\n#hydrationBottleLabel,\n#hydrationBottle,\n.meter-container,\n.sleep-titles {\n  display: flex;\n}\n\n.main,\n.sleep-area,\n#sleepWidget,\n#infoCard,\n#sleepAveragesWidget,\n#hydrationWidget {\n  flex-direction: column;\n}\n\naside,\n.sleep-titles,\n.meter-container,\n#days,\n#hydrationDaysLabel,\n#hydrationBottleLabel {\n  justify-content: space-evenly;\n}\n\n#meter-container-avg {\n  margin-bottom: 5%;\n}\n\nsection,\n#infoCard,\n#days,\n#hydrationDaysLabel,\n#hydrationBottleLabel,\n#hydrationBottle,\n#hydrationWidget {\n  justify-content: center;\n  align-items: center;\n}\n\nsection,\n#hydrationBottle,\n#hydrationWidget\n.hydration-area,\n#waterMeterContainer,\n#waterBottle {\n  height: 100%;\n}\n\n.info-area,\n.sleep-area,\n.widget-area,\n#hydrationVisual,\n#hydrationDays,\n#hydrationDaysLabel,\n#hydrationBottleLabel,\n#waterMeterContainer {\n  width: 100%;\n}\n\n#info,\n#friends,\n#days,\n#hydrationDaysLabel,\n#hydrationBottleLabel,\n#dateSleepTitle,\n#averageSleepTitle {\n  text-align: center;\n}\n\n#hydrationDaysLabel,\n#hydrationBottleLabel {\n  height: 10%;\n}\n\n.main {\n  height: 100vh;\n  width: 100vw;\n}\n\n.widget-area {\n  height: 90%;\n}\n\n#days {\n  height: 6%;\n}\n\n.info-area,\n.sleep-area,\n.hydration-area {\n  height: 90%;\n  width: 33%;\n  justify-content: center;\n  align-items: center;\n  text-align: center;\n}\n\n.widget {\n  height: 80%;\n  width: 90%;\n  border-radius: 3rem;\n  box-shadow: 10px 10px 12px -1px rgba(0, 0, 0, 0.61),\n    -10px 10px 15px -1px rgba(255, 255, 255, 0.822);\n}\n\n#infoCard {\n  height: 100%;\n  width: 95%;\n  background-image: linear-gradient(to right bottom, #ff6968, #fe706e, #fc7675, #fb7c7b, #f98281, #f98281, #f98281, #f98281, #fb7c7b, #fc7675, #fe706e, #ff6968);\n}\n\n#info {\n  width: 60%;\n  margin-bottom: 5%;\n}\n\n#friends {\n  width: 90%;\n  overflow: auto;\n  border-top: 4px solid white;\n}\n\n::-webkit-scrollbar {\n  -webkit-appearance: none;\n  width: 10px;\n}\n\n::-webkit-scrollbar-thumb {\n  border-radius: 5px;\n  background-color: rgba(0,0,0,.5);\n  -webkit-box-shadow: 0 0 1px rgba(255,255,255,.5);\n}\n\n#friendsHeader {\n  margin-bottom: 8%;\n  padding-top: 5%;\n}\n\nh1 {\n  font-size: x-large;\n  font-weight: 600;\n  margin: 2%;\n}\n\n#name {\n  font-size: 1.6rem;\n  text-shadow:\n    -2px -2px 0 #000,\n    2px -2px 0 #000,\n    -2px 2px 0 #000,\n    2px 2px 0 #000;\n}\n\nh2 {\n  font-size: large;\n  font-weight: 700;\n  margin: 0;\n}\n\nh3 {\n  font-size: medium;\n  font-weight: 700;\n  margin: 2%;\n}\n\n#hydrationWidget {\n  height: 100%;\n  background-image: linear-gradient(to right bottom, #2ac3ff, #48c7fc, #5dcbfa, #6ecef7, #7ed2f5, #7ed2f5, #7ed2f5, #7ed2f5, #6ecef7, #5dcbfa, #48c7fc, #2ac3ff);\n}\n\n#hydrationVisual {\n  height: 60%;\n}\n\n#hydrationBottleLabel {\n  margin-top: 10%;\n}\n\n#days {\n  width: 100vw;\n}\n\n.day-selector,\n.input-hydration,\n.save-layout-button {\n  height: 80%;\n  width: 10%;\n  border: none;\n  border-radius: 1rem;\n  font-family: \"M PLUS Rounded 1c\", sans-serif;\n  font-size: large;\n  font-weight: 400;\n  color: #e3edf7;\n  background-image: linear-gradient(to right bottom, #4b4b86, #50508b, #56568f, #5b5b94, #616199, #616199, #616199, #616199, #5b5b94, #56568f, #50508b, #4b4b86);\n  box-shadow: 5px 5px 12px -1px rgba(0, 0, 0, 0.61),\n    -5px 5px 15px -1px rgba(255, 255, 255, 0.822);\n}\n\nbutton {\n  background-color: #466585;\n  cursor: pointer;\n}\n\n#waterMeter {\n  height: 10%;\n  width: 10%;\n}\n\n#sleepWidget {\n  background-image: linear-gradient(to right bottom, #5a65ff, #636dfe, #6d76fd, #757efc, #7e86fb, #7e86fb, #7e86fb, #7e86fb, #757efc, #6d76fd, #636dfe, #5a65ff);\n  height: 55%;\n  width: 100%;\n  \n}\n\n#sleepAveragesWidget {\n  background-image: linear-gradient(to right bottom, #7a55fd, #8261fb, #8b6cf9, #9276f7, #9a81f4, #9a81f4, #9a81f4, #9a81f4, #9276f7, #8b6cf9, #8261fb, #7a55fd);\n  height: 45%;\n  width: 100%;\n  margin-bottom: 2%;\n}\n\n.sleep-meter {\n  position: relative;\n  height: 10rem;\n  width: 10rem;\n  border-radius: 50%;\n  display: grid;\n  place-items: center;\n}\n\n.sleep-meter:before {\n  content: \"\";\n  position: absolute;\n  height: 84%;\n  width: 84%;\n  background-color: #fff;\n  border-radius: 50%;\n}\n\n.sleep-data {\n  position: relative;\n  font-family: \"Poppins\", sans-serif;\n  font-size: 2.5rem;\n  color: purple;\n  filter: none;\n}\n\n#averageSleepTitle {\n  margin-top: -2%;\n}\n\n.sleep-titles {\n  height: 5%;\n  margin-bottom: 3%;\n}\n\n.sleep-widget-pair {\n  height: 100%;\n  width: 90%;\n}\n\n.input-hydration{\n  height: 5%;\n  width: 40%;\n  background: #48494B;\n  color: #fff;\n  font-weight:500;\n  box-shadow: 5px 5px 12px -1px rgba(0, 0, 0, 0.61),\n    -5px 5px 15px -1px rgba(0, 0, 0, 0.61);\n  cursor: pointer;\n}\n\n#hydrationForm {\n  background-color: #2ac3ff;\n  display:flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: space-around;\n  height:400px;\n  width:250px;\n  box-shadow: 5px 5px 12px -1px rgba(0, 0, 0, 0.61),\n    -5px 5px 15px -1px rgba(0, 0, 0, 0.61);\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n}\n\n.pop-up-form {\n  display: none;\n  width:100%;\n  height: 100%;\n  top: 0;\n  left: 0;\n  position: fixed;\n  backdrop-filter: blur(6px);\n}\n\n#hydrationForm input[type=date], #hydrationForm input[type=number]{\n  background:white;\n  width:50%;\n  height:30px;\n}\n\n#hydrationForm button {\n  border-radius: 10%;\n  width:100px;\n  height:50px;\n  border:none;\n  font-size: 20px;\n}\n\n#hydrationForm aside {\n  display:flex;\n  justify-content: space-around;\n  width:100%;\n  align-items: center;\n}\n\n.closeBtn {\n  background-color:red;\n  color: #fff;\n}\n\n.form-error {\n  color: red;\n  font-weight: 900;\n  text-align: center;\n  margin: 0px;\n}\n\n.hydration-form {\n  margin-bottom: 0px;\n}\n\n.formBtn{\n  background-color:white;\n}\n\nlabel{\n  font-weight:700;\n}\n\n.blur {\n  filter: blur(4px);\n}\n\n.draggable {\n  cursor: move;\n}\n\n.draggable.dragging {\n  opacity: 0.2;\n}\n\n.drag-drop-icon {\n  position: absolute;\n  height: 8%;\n  width: 8%;\n}\n\n#dragAndDrop1 {\n  top: 8%;\n  left: 30%;\n}\n\n#dragAndDrop2 {\n  top: 8%;\n  right: 30%;\n}\n\n.drag-and-drop-hint{\n  height: 4%;\n}\n\n.drag-and-drop-label {\n  color: black;\n  margin: 0;\n  font-weight: 600;\n  text-align: center;\n  padding-top: 5%;\n}\n\n.save-layout-button {\n  font-size: small;\n  height: 100%;\n  width: 60%;\n  margin-top: 2%;\n  cursor: pointer;\n}\n\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),
/* 4 */
/***/ ((module) => {



function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]); if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

module.exports = function cssWithMappingToString(item) {
  var _item = _slicedToArray(item, 4),
      content = _item[1],
      cssMapping = _item[3];

  if (!cssMapping) {
    return content;
  }

  if (typeof btoa === "function") {
    // eslint-disable-next-line no-undef
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || "").concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join("\n");
  }

  return [content].join("\n");
};

/***/ }),
/* 5 */
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item);

      if (item[2]) {
        return "@media ".concat(item[2], " {").concat(content, "}");
      }

      return content;
    }).join("");
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery, dedupe) {
    if (typeof modules === "string") {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, ""]];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var i = 0; i < this.length; i++) {
        // eslint-disable-next-line prefer-destructuring
        var id = this[i][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = [].concat(modules[_i]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        // eslint-disable-next-line no-continue
        continue;
      }

      if (mediaQuery) {
        if (!item[2]) {
          item[2] = mediaQuery;
        } else {
          item[2] = "".concat(mediaQuery, " and ").concat(item[2]);
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),
/* 6 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/user-icon.svg");

/***/ }),
/* 7 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/sleep-icon.svg");

/***/ }),
/* 8 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/hydration-icon.svg");

/***/ }),
/* 9 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/friends-icon.svg");

/***/ }),
/* 10 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   fetchHydrationData: () => (/* binding */ fetchHydrationData),
/* harmony export */   fetchSleepData: () => (/* binding */ fetchSleepData),
/* harmony export */   fetchUserData: () => (/* binding */ fetchUserData),
/* harmony export */   postHydrationData: () => (/* binding */ postHydrationData)
/* harmony export */ });
function fetchUserData(usersData) {
  return fetch("http://localhost:3001/api/v1/users")
    .then((response) => response.json())
    .then((data) => (usersData = data));
}
function fetchHydrationData(hydration) {
  return fetch("http://localhost:3001/api/v1/hydration")
    .then((repsonse) => repsonse.json())
    .then((data) => (hydration = data));
}

function fetchSleepData(sleep) {
  return fetch("http://localhost:3001/api/v1/sleep")
    .then((repsonse) => repsonse.json())
    .then((data) => (sleep = data));
}

function postHydrationData(date, numOunces, userID) {
  fetch("http://localhost:3001/api/v1/hydration", {
    method: 'POST',
    body: JSON.stringify({
      date,
      numOunces,
      userID
    }),
    headers: { 'Content-Type': 'application/json' }
  })
  .then(response => {
    if(!response.ok) {
      throw new Error("There was an issue adding your hydration details. Please try again later.")
    }
    return response.json();
  })
  .then(data => data)
  .catch(error => popUpError.innerText = error.message)
}




/***/ }),
/* 11 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Speed = exports.CircularFluidMeter = void 0;
const CircularFluidMeter_1 = __webpack_require__(12);
Object.defineProperty(exports, "CircularFluidMeter", ({ enumerable: true, get: function () { return CircularFluidMeter_1.CircularFluidMeter; } }));
const FluidLayer_1 = __webpack_require__(16);
Object.defineProperty(exports, "Speed", ({ enumerable: true, get: function () { return FluidLayer_1.Speed; } }));
//# sourceMappingURL=index.js.map

/***/ }),
/* 12 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CircularFluidMeter = void 0;
const BaseMeter_1 = __webpack_require__(13);
const BubblesLayer_1 = __webpack_require__(14);
const FluidLayer_1 = __webpack_require__(16);
const ColorUtils_1 = __webpack_require__(17);
const CircularFluidMeterConfig_1 = __webpack_require__(18);
const ResponsiveUtils_1 = __webpack_require__(19);
const MathUtils_1 = __webpack_require__(15);
class CircularFluidMeter extends BaseMeter_1.BaseMeter {
    constructor(container, config) {
        super(container);
        Object.defineProperty(this, "_fluidConfiguration", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_layers", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_bubbles", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: new BubblesLayer_1.BubblesLayer()
        });
        Object.defineProperty(this, "_meterDiameter", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 0
        });
        Object.defineProperty(this, "_targetProgress", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_progress", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_maxProgress", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        // computed value used to animate the variation of fluid when the progress changes
        Object.defineProperty(this, "_progressStepSpeed", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 0
        });
        Object.defineProperty(this, "_calculatedBorderWidth", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 0
        });
        Object.defineProperty(this, "_borderWidth", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_borderColor", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: '#ff00ff'
        });
        Object.defineProperty(this, "_padding", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 15
        });
        Object.defineProperty(this, "_backgroundColor", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: '#ff00ff'
        });
        Object.defineProperty(this, "_textColor", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: ''
        });
        Object.defineProperty(this, "_fontFamily", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 'Arial'
        });
        Object.defineProperty(this, "_calculatedFontSize", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 0
        });
        Object.defineProperty(this, "_fontSize", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_textDropShadow", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: true
        });
        Object.defineProperty(this, "_textShadowOpacity", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_textShadowColor", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_showProgress", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: true
        });
        Object.defineProperty(this, "_showBubbles", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: true
        });
        Object.defineProperty(this, "_bubbleColor", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: '#ffffff'
        });
        Object.defineProperty(this, "_use3D", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: true
        });
        Object.defineProperty(this, "_dropShadow", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: true
        });
        Object.defineProperty(this, "_dropShadowColor", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_progressFormatter", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (value) => `${value}%`
        });
        const computedConfig = Object.assign(Object.assign({}, CircularFluidMeterConfig_1.defaultConfig), config);
        this._progress = computedConfig.initialProgress;
        this._maxProgress = computedConfig.maxProgress;
        this._borderWidth = computedConfig.borderWidth;
        this._borderColor = computedConfig.borderColor;
        this._padding = computedConfig.padding;
        this._targetProgress = this._progress;
        this._backgroundColor = computedConfig.backgroundColor;
        this._fluidConfiguration = computedConfig.fluidConfiguration;
        this._textColor = computedConfig.textColor;
        this._textDropShadow = computedConfig.textDropShadow;
        this._textShadowColor = computedConfig.textShadowColor;
        this._textShadowOpacity = computedConfig.textShadowOpacity;
        this._showProgress = computedConfig.showProgress;
        this._fontFamily = computedConfig.fontFamily;
        this._fontSize = computedConfig.fontSize;
        this._showBubbles = computedConfig.showBubbles;
        this._bubbleColor = computedConfig.bubbleColor;
        this._use3D = computedConfig.use3D;
        this._dropShadow = computedConfig.dropShadow;
        this._dropShadowColor = computedConfig.dropShadowColor;
        this._progressFormatter = computedConfig.progressFormatter;
        this.calculateDrawingValues();
    }
    get progress() {
        return this._progress;
    }
    set progress(value) {
        this._targetProgress = (0, MathUtils_1.clamp)(value, 0, this._maxProgress);
    }
    get maxProgress() {
        return this._maxProgress;
    }
    get borderWidth() {
        return this._borderWidth;
    }
    set borderWidth(borderWidth) {
        this._borderWidth = borderWidth;
        this.calculateDrawingValues();
    }
    get borderColor() {
        return this._borderColor;
    }
    set borderColor(color) {
        this._borderColor = color;
    }
    get meterPadding() {
        return this._padding;
    }
    set meterPadding(padding) {
        this._padding = padding;
        this.calculateDrawingValues();
    }
    get backgroundColor() {
        return this._backgroundColor;
    }
    set backgroundColor(color) {
        this._backgroundColor = color;
    }
    get textColor() {
        return this._textColor;
    }
    set textColor(color) {
        this._textColor = color;
    }
    get fontFamily() {
        return this._fontFamily;
    }
    set fontFamily(family) {
        this._fontFamily = family;
    }
    get fontSize() {
        return this._fontSize;
    }
    set fontSize(size) {
        this._fontSize = size;
    }
    get textDropShadow() {
        return this._textDropShadow;
    }
    set textDropShadow(dropShadow) {
        this._textDropShadow = dropShadow;
    }
    get textShadowOpacity() {
        return this._textShadowOpacity;
    }
    set textShadowOpacity(alphaLevel) {
        this._textShadowOpacity = (0, MathUtils_1.clamp)(alphaLevel, 0, 1);
    }
    get textShadowColor() {
        return this._textShadowColor;
    }
    set textShadowColor(color) {
        this._textShadowColor = color;
    }
    get showProgress() {
        return this._showProgress;
    }
    set showProgress(show) {
        this._showProgress = show;
    }
    get showBubbles() {
        return this._showBubbles;
    }
    set showBubbles(show) {
        this._showBubbles = show;
    }
    get bubbleColor() {
        return this._bubbleColor;
    }
    set bubbleColor(color) {
        this._bubbleColor = color;
    }
    get use3D() {
        return this._use3D;
    }
    set use3D(show) {
        this._use3D = show;
    }
    get dropShadow() {
        return this._dropShadow;
    }
    set dropShadow(drop) {
        this._dropShadow = drop;
    }
    get dropShadowColor() {
        return this._dropShadowColor;
    }
    set dropShadowColor(color) {
        this._dropShadowColor = color;
    }
    set progressFormatter(formatter) {
        this._progressFormatter = formatter;
    }
    draw() {
        this.clear();
        if (this._meterDiameter <= 0 || !this._width || !this._height) {
            return;
        }
        if (this._dropShadow) {
            this._context.save();
            this._context.beginPath();
            this._context.shadowColor = this._dropShadowColor;
            this._context.shadowBlur = 10;
            this._context.shadowOffsetY = 5;
            this._context.arc(this._width / 2, this._height / 2, this._meterDiameter / 2 - 1, 0, 2 * Math.PI);
            this._context.closePath();
            this._context.fill();
            this._context.restore();
        }
        this.drawBackground();
        // #region clip
        this._context.save();
        this._context.arc(this._width / 2, this._height / 2, this._meterDiameter / 2 - this._calculatedBorderWidth, 0, Math.PI * 2);
        this._context.clip();
        // #endregion
        if (this._layers) {
            this.drawLayer(this._layers[0], false);
            this.drawLayer(this._layers[1]);
        }
        if (this._showBubbles) {
            this._bubbles.updateBubbleCount();
            this.drawBubbles();
        }
        if (this._showProgress) {
            this.drawText();
        }
        // restore clip
        this._context.restore();
        // can draw in whole canvas again
        this.drawForeground();
    }
    clear() {
        this._context.clearRect(0, 0, this._width, this._height);
    }
    /**
     * calculates the values required to correctly draw all components.
     * should be called on init and on resize or when some key value
     * changes such as border width or padding
     */
    calculateDrawingValues() {
        this._meterDiameter = this.calculateMeterDiameter();
        this._layers = FluidLayer_1.FluidLayerHelper.buildFluidLayersFromConfiguration(this._fluidConfiguration, this._meterDiameter);
        // other computed values
        this._progressStepSpeed = this._maxProgress / 6;
        // responsive (if required)
        const screenWidth = window.innerWidth;
        if (typeof this._borderWidth == 'number') {
            this._calculatedBorderWidth = this._borderWidth;
        }
        else {
            this._calculatedBorderWidth = (0, ResponsiveUtils_1.getResponsiveValue)(screenWidth, this._borderWidth);
        }
        if (typeof this._fontSize == 'number') {
            this._calculatedFontSize = this._fontSize;
        }
        else {
            this._calculatedFontSize = (0, ResponsiveUtils_1.getResponsiveValue)(screenWidth, this._fontSize);
        }
        // values for the bubble layer
        this.updateBubbleLayer();
        this._bubbles.reset();
    }
    updateBubbleLayer() {
        const meterBottomLimit = this.getMeterBottomLimit();
        let yThreshold = this.getFluidLevel();
        if (this._layers) {
            yThreshold += this._layers[0].waveAmplitude;
        }
        let minY = meterBottomLimit * 0.85;
        if (minY < yThreshold) {
            minY = yThreshold;
        }
        const maxY = meterBottomLimit;
        const minX = this._width / 2 - this._meterDiameter / 2;
        const maxX = this._width / 2 + this._meterDiameter / 2;
        this._bubbles.minY = minY;
        this._bubbles.maxY = maxY;
        this._bubbles.minX = minX;
        this._bubbles.maxX = maxX;
        this._bubbles.yThreshold = yThreshold;
        this._bubbles.averageSize = this._meterDiameter * 0.006;
        this._bubbles.averageSpeed = (this._meterDiameter * 2) / 14; // should take X seconds to go from bottom to top
        this._bubbles.speedDeviation = this._bubbles.averageSpeed * 0.25;
        // calculate the amount of bubbles depending on the fill percentage
        let maxBubbles = this._width * 0.1;
        if (this._progress < this._maxProgress * 0.5 &&
            this._progress >= this._maxProgress * 0.25) {
            maxBubbles = maxBubbles * 0.5;
        }
        else if (this._progress < this._maxProgress * 0.25 &&
            this._progress >= this._maxProgress * 0.12) {
            maxBubbles = maxBubbles * 0.18;
        }
        else if (this._progress < this._maxProgress * 0.12) {
            maxBubbles = maxBubbles * 0.04;
        }
        this._bubbles.total = maxBubbles;
    }
    // bottom limit where fluid gets drawn
    getMeterBottomLimit() {
        return (this._height -
            (this._height - this._meterDiameter) / 2 -
            this._calculatedBorderWidth);
    }
    // returns the line where the fluid makes waves
    getFluidLevel() {
        let waveAmplitudeCalculation = 0;
        if (this._layers) {
            waveAmplitudeCalculation = this._layers[0].waveAmplitude / 2;
        }
        const meterFillPercentage = ((this._meterDiameter -
            waveAmplitudeCalculation -
            this._calculatedBorderWidth * 2) *
            this._progress) /
            this._maxProgress;
        return this.getMeterBottomLimit() - meterFillPercentage;
    }
    updateProgress() {
        if (this._progress === this._targetProgress) {
            return;
        }
        if (this._progress < this._targetProgress) {
            this._progress += this._progressStepSpeed * this._elapsed;
            if (this._progress > this._targetProgress) {
                this._progress = this._targetProgress;
            }
        }
        else if (this._progress > this._targetProgress) {
            this._progress -= this._progressStepSpeed * this._elapsed;
            if (this._progress < this._targetProgress) {
                this._progress = this._targetProgress;
            }
        }
        this.updateBubbleLayer();
    }
    /**
     * draws a fluid layer
     * @param layer layer to draw
     * @param canUse3d will add gradients and details to give an impression of depth
     */
    drawLayer(layer, canUse3d = true) {
        // calculate wave angle
        let angle = layer.angle + layer.waveSpeed * this._elapsed;
        if (angle > Math.PI * 2) {
            angle = angle - Math.PI * 2;
        }
        layer.angle = angle;
        // calculate horizontal position
        layer.horizontalPosition += layer.horizontalSpeed * this._elapsed;
        let x = 0;
        let y = 0;
        const amplitude = layer.waveAmplitude * Math.sin(layer.angle);
        const meterBottom = this.getMeterBottomLimit();
        const fluidAmount = this.getFluidLevel();
        this.updateProgress();
        this._context.save();
        this._context.beginPath();
        this._context.lineTo(0, fluidAmount);
        while (x < this._width) {
            y =
                fluidAmount +
                    amplitude * Math.sin((x + layer.horizontalPosition) / layer.frequency);
            this._context.lineTo(x, y);
            x++;
        }
        this._context.lineTo(x, this._height);
        this._context.lineTo(0, this._height);
        this._context.closePath();
        if (this._use3D && canUse3d) {
            const x1 = this._width / 2;
            const y1 = meterBottom;
            const r1 = this._meterDiameter * 0.05;
            const gradientBackgroundFill = this._context.createRadialGradient(x1, y1, r1, x1, y1, this._meterDiameter * 0.65);
            const startColor = layer.color;
            const endColor = ColorUtils_1.ColorUtils.pSBC(-0.8, layer.color);
            gradientBackgroundFill.addColorStop(0, startColor);
            if (endColor) {
                gradientBackgroundFill.addColorStop(1, endColor);
            }
            this._context.fillStyle = gradientBackgroundFill;
        }
        else {
            this._context.fillStyle = layer.color;
        }
        this._context.fill();
        this._context.restore();
    }
    drawText() {
        const text = this._progressFormatter(this._progress);
        this._context.save();
        this._context.font = `${this._calculatedFontSize}px ${this._fontFamily}`;
        this._context.fillStyle = this._textColor;
        this._context.textAlign = 'center';
        this._context.textBaseline = 'middle';
        if (this._textDropShadow) {
            this._context.save();
            this._context.shadowColor = this._textShadowColor;
            this._context.shadowBlur = 7;
            this._context.globalAlpha = this._textShadowOpacity;
            this._context.fillText(text, this._width / 2, this._height / 2);
            this._context.restore();
        }
        this._context.fillText(text, this._width / 2, this._height / 2);
        this._context.restore();
    }
    drawBackground() {
        this._context.save();
        this._context.beginPath();
        this._context.arc(this._width / 2, this._height / 2, this._meterDiameter / 2 - this._calculatedBorderWidth, 0, 2 * Math.PI);
        this._context.closePath();
        if (this._use3D) {
            const x1 = this._width / 2;
            const y1 = this._height / 2;
            const r1 = this._meterDiameter * 0.1;
            const gradientBackgroundFill = this._context.createRadialGradient(x1, y1, r1, x1, y1, this._meterDiameter * 0.75);
            const startColor = this._backgroundColor;
            const endColor = ColorUtils_1.ColorUtils.pSBC(-0.8, this.backgroundColor);
            gradientBackgroundFill.addColorStop(0, startColor);
            if (endColor) {
                gradientBackgroundFill.addColorStop(0.9, endColor);
            }
            this._context.fillStyle = gradientBackgroundFill;
        }
        else {
            this._context.fillStyle = this.backgroundColor;
        }
        this._context.fill();
        this._context.restore();
    }
    drawForeground() {
        this._context.save();
        this._context.lineWidth = this._calculatedBorderWidth;
        this._context.strokeStyle = this._borderColor;
        this._context.beginPath();
        this._context.arc(this._width / 2, this._height / 2, this._meterDiameter / 2 - this._calculatedBorderWidth / 2, 0, 2 * Math.PI);
        this._context.closePath();
        this._context.stroke();
        // inner border
        const innerBorderColor = ColorUtils_1.ColorUtils.pSBC(-0.35, this._borderColor);
        const innerBorderWidth = this._calculatedBorderWidth * 0.25;
        this._context.lineWidth = innerBorderWidth;
        this._context.strokeStyle = innerBorderColor || this._borderColor;
        this._context.beginPath();
        this._context.arc(this._width / 2, this._height / 2, this._meterDiameter / 2 -
            this._calculatedBorderWidth * 0.85 -
            innerBorderWidth / 2, 0, 2 * Math.PI);
        this._context.closePath();
        this._context.stroke();
        // outer border
        const outerBorderColor = ColorUtils_1.ColorUtils.pSBC(0.05, this._borderColor);
        const outerBorderWidth = this._calculatedBorderWidth * 0.15;
        this._context.lineWidth = outerBorderWidth;
        this._context.strokeStyle = outerBorderColor || this._borderColor;
        this._context.beginPath();
        this._context.arc(this._width / 2, this._height / 2, this._meterDiameter / 2 - outerBorderWidth / 2, 0, 2 * Math.PI);
        this._context.closePath();
        this._context.stroke();
        this._context.restore();
        // details
        if (this._use3D) {
            this._context.save();
            this._context.shadowColor = '#ffffff';
            this._context.shadowBlur = 17;
            const availableSurface = this._meterDiameter - this._calculatedBorderWidth;
            let x = this._width / 2 - availableSurface / 4.5;
            let y = this._height / 2 - availableSurface / 5.27;
            let size = availableSurface * 0.045;
            const shineTop = new Path2D();
            shineTop.arc(-this._width * 2, y, size, 0, 2 * Math.PI);
            this._context.shadowOffsetX = this._width * 2 + x;
            this._context.globalAlpha = 0.7;
            this._context.fill(shineTop);
            this._context.restore();
            this._context.save();
            this._context.shadowColor = '#ffffff';
            this._context.shadowBlur = 11;
            x = this._width / 2 + availableSurface / 5;
            y = this._height / 2 + availableSurface / 4;
            size = availableSurface * 0.025;
            const shineBottom = new Path2D();
            shineBottom.arc(-this._width * 2, y, size, 0, 2 * Math.PI);
            this._context.shadowOffsetX = this._width * 2 + x;
            this._context.globalAlpha = 0.45;
            this._context.fill(shineBottom);
            this._context.restore();
        }
    }
    drawBubbles() {
        this._context.save();
        this._bubbles.bubbles.forEach((bubble) => {
            bubble.update(this._elapsed);
            if (bubble.isDead || bubble.y < this._bubbles.yThreshold) {
                this._bubbles.resetBubble(bubble);
            }
            this._context.beginPath();
            this._context.strokeStyle = this._bubbleColor;
            this._context.arc(bubble.x - bubble.currentRadius / 2, bubble.y - bubble.currentRadius / 2, bubble.currentRadius, 0, 2 * Math.PI);
            this._context.filter = `opacity(${bubble.currentOpacity})`;
            this._context.stroke();
            this._context.closePath();
        });
        this._context.restore();
    }
    calculateMeterDiameter() {
        if (this._width >= this._height) {
            return this._height - this._padding;
        }
        else {
            return this._width - this._padding;
        }
    }
    resize() {
        super.resize();
        this.calculateDrawingValues();
        this._bubbles.reset();
    }
}
exports.CircularFluidMeter = CircularFluidMeter;
//# sourceMappingURL=CircularFluidMeter.js.map

/***/ }),
/* 13 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BaseMeter = void 0;
class BaseMeter {
    constructor(container) {
        Object.defineProperty(this, "_container", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_canvas", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_context", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_width", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 0
        });
        Object.defineProperty(this, "_height", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 0
        });
        Object.defineProperty(this, "_time", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 0
        });
        Object.defineProperty(this, "_elapsed", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 0
        });
        Object.defineProperty(this, "_animationRequestId", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 0
        });
        // references
        Object.defineProperty(this, "_updateBind", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_resizeBind", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this._container = container;
        const size = this._container.getBoundingClientRect();
        this._width = Math.floor(size.width);
        this._height = Math.floor(size.height);
        this._canvas = document.createElement('canvas');
        this._canvas.width = this._width;
        this._canvas.height = this._height;
        const currentContext = this._canvas.getContext('2d');
        if (currentContext) {
            this._context = currentContext;
        }
        else {
            throw 'unable to get 2d context';
        }
        this._container.appendChild(this._canvas);
        // setup references
        this._updateBind = this.update.bind(this);
        this._resizeBind = this.resize.bind(this);
        this._animationRequestId = requestAnimationFrame(this._updateBind);
        window.addEventListener('resize', this._resizeBind);
    }
    update() {
        const now = new Date().getTime();
        this._elapsed = (now - (this._time || now)) / 1000;
        this._time = now;
        this._animationRequestId = requestAnimationFrame(this._updateBind);
        this.draw();
    }
    resize() {
        if (this._container !== undefined) {
            const size = this._container.getBoundingClientRect();
            const width = Math.floor(size.width);
            const height = Math.floor(size.height);
            this._width = width;
            this._height = height;
            this._canvas.width = width;
            this._canvas.height = height;
        }
    }
    dispose() {
        cancelAnimationFrame(this._animationRequestId);
        window.removeEventListener('resize', this._resizeBind);
    }
}
exports.BaseMeter = BaseMeter;
//# sourceMappingURL=BaseMeter.js.map

/***/ }),
/* 14 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BubblesLayer = void 0;
const MathUtils_1 = __webpack_require__(15);
class BubblesLayer {
    constructor() {
        Object.defineProperty(this, "bubbles", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: []
        });
        Object.defineProperty(this, "total", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 22
        });
        Object.defineProperty(this, "averageSpeed", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 50
        });
        Object.defineProperty(this, "speedDeviation", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 12
        });
        Object.defineProperty(this, "current", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 0
        });
        Object.defineProperty(this, "swing", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 0
        });
        Object.defineProperty(this, "averageSize", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 4
        });
        // spawning limits
        Object.defineProperty(this, "minX", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 0
        });
        Object.defineProperty(this, "maxX", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 0
        });
        Object.defineProperty(this, "minY", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 0
        });
        Object.defineProperty(this, "maxY", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 0
        });
        // max y position
        Object.defineProperty(this, "yThreshold", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 0
        });
    }
    getBubble() {
        const x = (0, MathUtils_1.random)(this.minX, this.maxX);
        const y = (0, MathUtils_1.random)(this.minY, this.maxY);
        const r = (0, MathUtils_1.random)(this.averageSize * 0.5, this.averageSize * 1.5);
        const opacity = r < this.averageSize ? 0.5 : 1;
        const velY = (0, MathUtils_1.random)(this.averageSpeed - this.speedDeviation, this.averageSpeed + this.speedDeviation);
        // lifespan is calculated in based on how long the particles will reach surface (y threshold)
        const totalDistance = y - this.yThreshold;
        const particleLife = totalDistance / velY;
        return new BubbleParticle(x, y, r, velY, particleLife, opacity);
    }
    resetBubble(bubble) {
        this.bubbles = this.bubbles.filter((b) => b !== bubble);
        if (this.bubbles.length < this.total) {
            this.bubbles.push(this.getBubble());
        }
    }
    updateBubbleCount() {
        if (this.bubbles.length < this.total) {
            const missing = this.total - this.bubbles.length;
            for (let i = 0; i < missing; i++) {
                this.bubbles.push(this.getBubble());
            }
        }
    }
    reset() {
        this.bubbles = [];
        for (let i = 0; i < this.total; i++) {
            this.bubbles.push(this.getBubble());
        }
    }
}
exports.BubblesLayer = BubblesLayer;
class BubbleParticle {
    constructor(x, y, r, velY, lifespan, opacity = 1) {
        Object.defineProperty(this, "x", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 0
        });
        Object.defineProperty(this, "y", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 0
        });
        Object.defineProperty(this, "r", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 0
        });
        Object.defineProperty(this, "velY", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 0
        });
        Object.defineProperty(this, "lifespan", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 0
        });
        Object.defineProperty(this, "currentRadius", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 0
        });
        Object.defineProperty(this, "currentLifespan", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 0
        });
        Object.defineProperty(this, "opacityThreshold", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 0
        });
        Object.defineProperty(this, "currentOpacity", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 1
        });
        Object.defineProperty(this, "opacityDecayingSpeed", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 0
        });
        this.x = x;
        this.y = y;
        this.r = r;
        this.velY = velY;
        this.lifespan = lifespan;
        this.currentLifespan = lifespan;
        this.currentOpacity = opacity;
        /**
         *  calculate opacity decrease factor base on lifespan:
         * particles will fade out when they reach X% of their life
         */
        this.opacityThreshold = this.lifespan * 0.2;
        this.opacityDecayingSpeed = (100 / this.lifespan) * 0.2;
    }
    get isDead() {
        return this.currentLifespan <= 0;
    }
    update(elapsed) {
        this.y -= this.velY * elapsed;
        if (this.currentRadius < this.r) {
            this.currentRadius += 20 * elapsed;
        }
        if (this.currentLifespan < this.opacityThreshold) {
            this.currentOpacity -= this.opacityDecayingSpeed * elapsed;
            if (this.currentOpacity <= 0) {
                this.currentOpacity = 0;
            }
        }
        this.currentLifespan -= elapsed;
    }
}
//# sourceMappingURL=BubblesLayer.js.map

/***/ }),
/* 15 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.random = exports.clamp = void 0;
const clamp = (number, min, max) => {
    return Math.min(Math.max(number, min), max);
};
exports.clamp = clamp;
const random = (min, max) => {
    const delta = max - min;
    return max === min ? min : Math.random() * delta + min;
};
exports.random = random;
//# sourceMappingURL=MathUtils.js.map

/***/ }),
/* 16 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Speed = exports.FluidLayerHelper = void 0;
const ColorUtils_1 = __webpack_require__(17);
var Speed;
(function (Speed) {
    Speed[Speed["SLOW"] = 0] = "SLOW";
    Speed[Speed["NORMAL"] = 1] = "NORMAL";
    Speed[Speed["FAST"] = 2] = "FAST";
})(Speed || (Speed = {}));
exports.Speed = Speed;
class FluidLayerSettings {
}
Object.defineProperty(FluidLayerSettings, "ANGULAR_SPEED_NORMAL", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: Math.PI / 2
});
Object.defineProperty(FluidLayerSettings, "ANGULAR_SPEED_FAST", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: Math.PI
});
Object.defineProperty(FluidLayerSettings, "ANGULAR_SPEED_SLOW", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: Math.PI / 4
});
Object.defineProperty(FluidLayerSettings, "HORIZONTAL_SPEED_NORMAL", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: 55
});
Object.defineProperty(FluidLayerSettings, "HORIZONTAL_SPEED_FAST", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: 155
});
Object.defineProperty(FluidLayerSettings, "HORIZONTAL_SPEED_SLOW", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: 25
});
class FluidLayerHelper {
    static buildFluidLayersFromConfiguration(configuration, meterDiameter) {
        // determine values
        let waveSpeed = FluidLayerSettings.ANGULAR_SPEED_NORMAL;
        let horizontalSpeed = FluidLayerSettings.HORIZONTAL_SPEED_NORMAL;
        const frequency = this.calculateFrequency(meterDiameter);
        switch (configuration.horizontalSpeed) {
            case Speed.FAST:
                horizontalSpeed = FluidLayerSettings.HORIZONTAL_SPEED_FAST;
                break;
            case Speed.SLOW:
                horizontalSpeed = FluidLayerSettings.HORIZONTAL_SPEED_SLOW;
                break;
            default:
                horizontalSpeed = FluidLayerSettings.HORIZONTAL_SPEED_NORMAL;
                break;
        }
        switch (configuration.waveSpeed) {
            case Speed.FAST:
                waveSpeed = FluidLayerSettings.ANGULAR_SPEED_FAST;
                break;
            case Speed.SLOW:
                waveSpeed = FluidLayerSettings.ANGULAR_SPEED_SLOW;
                break;
            default:
                waveSpeed = FluidLayerSettings.ANGULAR_SPEED_NORMAL;
                break;
        }
        const backgroundColor = ColorUtils_1.ColorUtils.pSBC(-0.75, configuration.color || '#ffffff');
        const waveAmplitude = this.calculateWaveAmplitude(meterDiameter);
        const foreGroundLayer = {
            angle: 0,
            horizontalPosition: 0,
            color: configuration.color || '#ffffff',
            frequency: frequency,
            waveAmplitude: waveAmplitude,
            horizontalSpeed: horizontalSpeed,
            waveSpeed: waveSpeed
        };
        const backgroundLayer = {
            angle: 0,
            horizontalPosition: 0,
            color: backgroundColor
                ? backgroundColor
                : configuration.color || '#ffffff',
            frequency: frequency,
            waveAmplitude: waveAmplitude,
            horizontalSpeed: -horizontalSpeed,
            waveSpeed: waveSpeed
        };
        return [backgroundLayer, foreGroundLayer];
    }
    static calculateWaveAmplitude(meterDiameter) {
        return meterDiameter * 0.021;
    }
    static calculateFrequency(meterDiameter) {
        return meterDiameter / 11;
    }
}
exports.FluidLayerHelper = FluidLayerHelper;
//# sourceMappingURL=FluidLayer.js.map

/***/ }),
/* 17 */
/***/ ((__unused_webpack_module, exports) => {


/**
 * https://stackoverflow.com/questions/5560248/programmatically-lighten-or-darken-a-hex-color-or-rgb-and-blend-colors
 * all credits to
 * https://stackoverflow.com/users/740553/mike-pomax-kamermans
 */
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ColorUtils = void 0;
class ColorUtils {
    static pSBC(p, c0, c1 = null, l = null) {
        let h;
        let r;
        let g;
        let b;
        let t;
        let a = typeof c1 == 'string';
        let P;
        let f;
        const m = Math.round;
        (h = c0.length > 9),
            (h = a ? (c1.length > 9 ? true : c1 == 'c' ? !h : false) : h),
            (f = this.pSBCr(c0)),
            (P = p < 0),
            (t =
                c1 && c1 != 'c'
                    ? this.pSBCr(c1)
                    : P
                        ? { r: 0, g: 0, b: 0, a: -1 }
                        : { r: 255, g: 255, b: 255, a: -1 }),
            (p = P ? p * -1 : p),
            (P = 1 - p);
        if (!f || !t)
            return null;
        if (l)
            (r = m(P * f.r + p * t.r)),
                (g = m(P * f.g + p * t.g)),
                (b = m(P * f.b + p * t.b));
        else
            (r = m(Math.pow((P * Math.pow(f.r, 2) + p * Math.pow(t.r, 2)), 0.5))),
                (g = m(Math.pow((P * Math.pow(f.g, 2) + p * Math.pow(t.g, 2)), 0.5))),
                (b = m(Math.pow((P * Math.pow(f.b, 2) + p * Math.pow(t.b, 2)), 0.5)));
        (a = f.a),
            (t = t.a),
            (f = a >= 0 || t >= 0),
            (a = f ? (a < 0 ? t : t < 0 ? a : a * P + t * p) : 0);
        if (h)
            return ('rgb' +
                (f ? 'a(' : '(') +
                r +
                ',' +
                g +
                ',' +
                b +
                (f ? ',' + m(a * 1000) / 1000 : '') +
                ')');
        else
            return ('#' +
                (4294967296 + r * 16777216 + g * 65536 + b * 256 + (f ? m(a * 255) : 0))
                    .toString(16)
                    .slice(1, f ? undefined : -2));
    }
    static pSBCr(d) {
        let r, g, b, a;
        const i = parseInt;
        const m = Math.round;
        let n = d.length;
        const x = {
            r: 0,
            g: 0,
            b: 0,
            a: 0
        };
        if (n > 9) {
            ([r, g, b, a] = d.split(',')), (n = d.length);
            if (n < 3 || n > 4)
                return null;
            (x.r = i(r[3] == 'a' ? r.slice(5) : r.slice(4))),
                (x.g = i(g)),
                (x.b = i(b)),
                (x.a = a ? parseFloat(a) : -1);
        }
        else {
            if (n == 8 || n == 6 || n < 4)
                return null;
            if (n < 6)
                d =
                    '#' +
                        d[1] +
                        d[1] +
                        d[2] +
                        d[2] +
                        d[3] +
                        d[3] +
                        (n > 4 ? d[4] + d[4] : '');
            const d1 = i(d.slice(1), 16);
            if (n == 9 || n == 5)
                (x.r = (d1 >> 24) & 255),
                    (x.g = (d1 >> 16) & 255),
                    (x.b = (d1 >> 8) & 255),
                    (x.a = m((d1 & 255) / 0.255) / 1000);
            else
                (x.r = d1 >> 16), (x.g = (d1 >> 8) & 255), (x.b = d1 & 255), (x.a = -1);
        }
        return x;
    }
}
exports.ColorUtils = ColorUtils;
//# sourceMappingURL=ColorUtils.js.map

/***/ }),
/* 18 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.defaultConfig = void 0;
const FluidLayer_1 = __webpack_require__(16);
const defaultConfig = {
    initialProgress: 0,
    maxProgress: 100,
    borderWidth: 30,
    borderColor: '#75758b',
    padding: 30,
    backgroundColor: '#9f9fae',
    showProgress: true,
    showBubbles: true,
    bubbleColor: '#ffffff',
    textColor: '#ffffff',
    textDropShadow: true,
    textShadowOpacity: 1,
    textShadowColor: '#000000',
    fontFamily: 'Arial',
    fontSize: 30,
    use3D: true,
    dropShadow: true,
    dropShadowColor: '#000000',
    progressFormatter: (value) => Math.round(value).toString(),
    fluidConfiguration: {
        color: '#ff0000',
        waveSpeed: FluidLayer_1.Speed.NORMAL,
        horizontalSpeed: FluidLayer_1.Speed.NORMAL
    }
};
exports.defaultConfig = defaultConfig;
//# sourceMappingURL=CircularFluidMeterConfig.js.map

/***/ }),
/* 19 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getResponsiveValue = void 0;
const getResponsiveValue = (screenWidth, responsiveConfigs) => {
    var _a, _b;
    if (!responsiveConfigs.length) {
        return 0;
    }
    const breakPoint = (_b = (_a = responsiveConfigs
        .filter((c) => c.resolution <= screenWidth)) === null || _a === void 0 ? void 0 : _a.sort(breakPointCompare)) === null || _b === void 0 ? void 0 : _b[0];
    if (!breakPoint) {
        const minValue = responsiveConfigs.sort(breakPointCompare).reverse()[0];
        return minValue ? minValue.value : 0;
    }
    else {
        return breakPoint.value;
    }
};
exports.getResponsiveValue = getResponsiveValue;
const breakPointCompare = (b1, b2) => {
    if (b1.resolution < b2.resolution) {
        return 1;
    }
    if (b1.resolution > b2.resolution) {
        return -1;
    }
    return 0;
};
//# sourceMappingURL=ResponsiveUtils.js.map

/***/ }),
/* 20 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getAverageSteps: () => (/* binding */ getAverageSteps),
/* harmony export */   getUserData: () => (/* binding */ getUserData)
/* harmony export */ });
function getUserData(userID, users) {
  let findUser = users.find((user) => {
    return user.id === userID;
  });
  let updatedFriends = findUser.friends.map((friend) => {
    return users.find((match) => {
      return match.id === friend;
    });
  });
  findUser.friends = updatedFriends;
  return findUser;
}

function getAverageSteps(users) {
  let totalSteps = users.reduce((total, user) => {
    total += user.dailyStepGoal;
    return total;
  }, 0);
  return Math.round(totalSteps / users.length);
}




/***/ }),
/* 21 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getAverageFluidOunce: () => (/* binding */ getAverageFluidOunce),
/* harmony export */   getFluidOunceForDay: () => (/* binding */ getFluidOunceForDay),
/* harmony export */   getFluidOunceForWeek: () => (/* binding */ getFluidOunceForWeek)
/* harmony export */ });
function getAverageFluidOunce(userID, hydrationData) {
  let count = 0;
  let totalOunces = hydrationData.reduce((total, hydrate) => {
    if (hydrate.userID === userID) {
      total += hydrate.numOunces;
      count++;
    }
    return total;
  }, 0);
  return Math.round(totalOunces / count);
}

function getFluidOunceForDay(userID, hydrationData, date) {
  let foundHydrationData = hydrationData.find((data) => {
    return data.userID === userID && data.date === date;
  });
  return foundHydrationData;
}

function getFluidOunceForWeek(userID, hydrationData) {
  const usersWeekHydration = hydrationData.reduce((usersHydration, data) => {
    if (data.userID === userID) {
      usersHydration.push({
        date: data.date,
        ounces: data.numOunces,
      });
    }
    return usersHydration;
  }, []);
  return usersWeekHydration;
}




/***/ }),
/* 22 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getAverageHoursSleptNet: () => (/* binding */ getAverageHoursSleptNet),
/* harmony export */   getAverageSleepQualityNet: () => (/* binding */ getAverageSleepQualityNet),
/* harmony export */   getHoursSlept: () => (/* binding */ getHoursSlept),
/* harmony export */   getHoursSleptWeek: () => (/* binding */ getHoursSleptWeek),
/* harmony export */   getSleepQuality: () => (/* binding */ getSleepQuality),
/* harmony export */   getSleepQualityWeek: () => (/* binding */ getSleepQualityWeek)
/* harmony export */ });
function getAverageHoursSleptNet(userID, sleep) {
  let allSleepData = sleep.sleepData.filter((data) => {
    return data.userID === userID;
  });
  let netHours = allSleepData.reduce((acc, data) => {
    acc += data.hoursSlept;
    return acc;
  }, 0);
  return Math.round((10 * netHours) / allSleepData.length) / 10;
}

function getAverageSleepQualityNet(userID, sleep) {
  let allSleepData = sleep.sleepData.filter((data) => {
    return data.userID === userID;
  });
  let netQuality = allSleepData.reduce((acc, data) => {
    acc += data.sleepQuality;
    return acc;
  }, 0);
  return Math.round((10 * netQuality) / allSleepData.length) / 10;
}

function getHoursSlept(userID, sleep, date) {
  let allSleepData = sleep.sleepData.filter((data) => {
    return data.userID === userID;
  });
  let targetDate = allSleepData.find((data) => {
    return data.date === date;
  });
  return targetDate.hoursSlept;
}

function getSleepQuality(userID, sleep, date) {
  let allSleepData = sleep.sleepData.filter((data) => {
    return data.userID === userID;
  });
  let targetDate = allSleepData.find((data) => {
    return data.date === date;
  });
  return targetDate.sleepQuality;
}

function getHoursSleptWeek(userID, sleep) {
  let allSleepData = sleep.sleepData.filter((data) => {
    return data.userID === userID;
  });
  return allSleepData;
}

function getSleepQualityWeek(userID, sleep) {
  let allSleepData = sleep.sleepData.filter((data) => {
    return data.userID === userID;
  });
  return allSleepData;
}




/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _css_styles_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _images_user_icon_svg__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6);
/* harmony import */ var _images_sleep_icon_svg__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7);
/* harmony import */ var _images_hydration_icon_svg__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(8);
/* harmony import */ var _images_friends_icon_svg__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(9);
/* harmony import */ var _apiCalls__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(10);
/* harmony import */ var fluid_meter__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(11);
/* harmony import */ var _users__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(20);
/* harmony import */ var _hydration__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(21);
/* harmony import */ var _sleep__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(22);











const info = document.querySelector("#info");
const friendsList = document.querySelector("#friends");
const waterMeter = document.querySelector("#waterMeterContainer");
const userHydrationDate = document.querySelector("#dateHydrationTitle");
const dayButtons = document.querySelector("#days");
const sleepHoursMeter = document.querySelector("#sleepHoursMeter");
const sleepHours = document.querySelector("#sleepHours");
const sleepQualityMeter = document.querySelector("#sleepQualityMeter");
const sleepQuality = document.querySelector("#sleepQuality");
const userSleepTitle = document.querySelector("#dateSleepTitle");
const sleepAverageTitle = document.querySelector("#averageSleepTitle");
const sleepHoursMeterAvg = document.querySelector("#sleepHoursMeterAverage");
const sleepHoursAvg = document.querySelector("#sleepHoursAverage");
const sleepQualityMeterAvg = document.querySelector(
  "#sleepQualityMeterAverage"
);
const sleepQualityAvg = document.querySelector("#sleepQualityAverage");
const addHydrationButton = document.querySelector(".input-hydration");
const popUpForm = document.querySelector(".pop-up-form");
const closeFormButton = document.querySelector(".closeBtn");
const dateInput = document.querySelector("#dateInput");
const ozInput = document.querySelector("#ozDrank");
const submitButton = document.querySelector(".formBtn");
const formError = document.querySelector(".form-error");
const draggables = document.querySelectorAll(".draggable");
const containers = document.querySelectorAll(".container");
const sleepMeters = document.querySelectorAll(".sleep-meter");

let containerPositions = {};
let user, hydration, sleep, today, flOzDays, userSleepInfo, currentPostion;
let createdWaterMeter = new fluid_meter__WEBPACK_IMPORTED_MODULE_6__.CircularFluidMeter(waterMeter, {
  borderWidth: 15,
  maxProgress: 100,
  initialProgress: 0,
  backgroundColor: "#002d59",
  borderColor: "#3e4954",
  bubbleColor: "#6bcfff",
  fontFamily: "'M PLUS Rounded 1c', sans-serif",
  fontSize: 34,
  progressFormatter: (value) => {
    return `${value.toFixed(0)} fl oz`;
  },
  fluidConfiguration: {
    color: "#1e90ff",
  },
});

window.addEventListener("load", function () {
  if (!user) {
    updatePage();
  } else {
    updatePage(user.id);
  }
});

dayButtons.addEventListener("click", (event) => {
  let button = event.target.closest("button");

  if (!flOzDays[today - Number(button.id)]) {
    userHydrationDate.innerHTML = `<h1>No Data to Display...</h1>`;
    createdWaterMeter.progress = 0;
  } else {
    updateHydration(user, today - Number(button.id));
    updateHoursSlept(user, today - Number(button.id));
    updateSleepQuality(user, today - Number(button.id));
  }
});

submitButton.addEventListener("click", () => {
  if (ozInput.value.length > 0 && dateInput.value.length > 0) {
    closeForm();
    let date = dateInput.value.split("-").join("/");
    (0,_apiCalls__WEBPACK_IMPORTED_MODULE_5__.postHydrationData)(date, ozInput.value, user.id);
  } else if (ozInput.value.trim().length === 0 && dateInput.value.length > 0) {
    event.preventDefault();
    formError.innerText = "Please enter Oz Drank...";
  } else if (ozInput.value.trim().length > 0 && dateInput.value.length === 0) {
    event.preventDefault();
    formError.innerText = "Please select a date...";
  } else {
    event.preventDefault();
    formError.innerText = "You need to select a date and enter Oz Drank!";
  }
});

addHydrationButton.addEventListener("click", openForm);

closeFormButton.addEventListener("click", closeForm);

function updatePage() {
  Promise.all([(0,_apiCalls__WEBPACK_IMPORTED_MODULE_5__.fetchHydrationData)(), (0,_apiCalls__WEBPACK_IMPORTED_MODULE_5__.fetchUserData)(), (0,_apiCalls__WEBPACK_IMPORTED_MODULE_5__.fetchSleepData)()]).then(
    ([hydrationFetch, usersData, sleepFetch]) => {
      sleep = sleepFetch;
      hydration = hydrationFetch;
      let avgStep = (0,_users__WEBPACK_IMPORTED_MODULE_7__.getAverageSteps)(usersData.users);
      user = userGrabber(usersData);
      getPositions();
      flOzDays = getDays(user.id, hydration.hydrationData);
      today = flOzDays.length - 1;
      userSleepInfo = (0,_sleep__WEBPACK_IMPORTED_MODULE_9__.getHoursSleptWeek)(user.id, sleep);
      updateButtonsDate(flOzDays);
      updateUserInfo(avgStep);
      updateSleepAverages(user);
      updateHoursSlept(user, today);
      updateSleepQuality(user, today);
    }
  );
}

function getPositions() {
  if (sessionStorage.getItem("user")) {
    containers.forEach((container) => {
      let position = JSON.parse(sessionStorage.getItem('containerPositions')) || [];
      let positionKeys = Object.keys(position)
      positionKeys.forEach((key) => {
        if(container.id === key)
        container.appendChild(document.getElementById(position[key]))
      });
    });
  }
}

function getDays(id, hydration) {
  let flOzDays1 = (0,_hydration__WEBPACK_IMPORTED_MODULE_8__.getFluidOunceForWeek)(id, hydration).map((day) => {
    return {
      date: new Date(day.date),
      ounces: day.ounces,
    };
  });
  flOzDays1.sort((a, b) => {
    return a.date - b.date;
  });
  let flOzDays2 = flOzDays1.map((day) => {
    return {
      date: day.date.toISOString().split("T")[0].replaceAll("-", "/"),
      ounces: day.ounces,
    };
  });
  return flOzDays2;
}

function userGrabber(usersData) {
  let index;
  if (sessionStorage.getItem("user")) {
    index = parseInt(sessionStorage.getItem("user"));
  } else {
    index = getUserIndex(usersData);
  }
  let currentUser = (0,_users__WEBPACK_IMPORTED_MODULE_7__.getUserData)(index, usersData.users);
  return currentUser;
}

function getUserIndex(usersData) {
  return Math.floor(Math.random() * (usersData.users.length - 1)) + 1;
}

function updateUserInfo(avgStep) {
  info.innerHTML = `<h1 id="name">Welcome: ${user.name}</h1>
  <h2 id="userID">ID: ${user.id} </h2>
  <h2 id="address">Address: ${user.address} </h2>
  <h2 id="emailAddress">Email: ${user.email} </h2>
  <h2 id="strideLength">Stride Length: ${user.strideLength}</h2>
  <h2 id="stepGoal">My Step Goal: ${user.dailyStepGoal} steps</h2>
  <h2 id="comparedStepGoal"> Avg Step Goal: ${avgStep} steps</h2>`;
  updateFriendsList(user.friends);
  updateHydration(user, today);
}

function updateFriendsList(friends) {
  friendsList.innerHTML = '<h1 id="friendsHeader">Friends</h1>';
  friends.forEach((friend) => {
    friendsList.insertAdjacentHTML(
      "beforeend",
      `<aside>
        <h2>${friend.name}</h2>
        <h2>Step Goal: ${friend.dailyStepGoal}</h2>
      </aside>`
    );
  });
}

function updateHydration(user, day = 0) {
  const userHydration = (0,_hydration__WEBPACK_IMPORTED_MODULE_8__.getFluidOunceForDay)(
    user.id,
    hydration.hydrationData,
    flOzDays[day].date
  );
  userHydrationDate.innerHTML = `<h1>Water Consumption</h1><h2>${userHydration.date}</h2>`;
  createdWaterMeter.progress = userHydration.numOunces;
}

function updateHoursSlept(user, day) {
  if (!userSleepInfo[day]) {
    userSleepTitle.innerHTML = `<h1>Daily Sleep Stats</h1><h2>No Sleep Data For ${flOzDays[day].date}</h2>`;
    sleepProgressBar(0, sleepHours, sleepHoursMeter, 12);
  } else {
    const userSleepHours = (0,_sleep__WEBPACK_IMPORTED_MODULE_9__.getHoursSlept)(
      user.id,
      sleep,
      userSleepInfo[day].date
    );
    userSleepTitle.innerHTML = `<h1>Daily Sleep Stats</h1><h2>${userSleepInfo[day].date}</h2>`;
    sleepProgressBar(userSleepHours, sleepHours, sleepHoursMeter, 12);
  }
}

function updateSleepQuality(user, day) {
  if (!userSleepInfo[day]) {
    sleepProgressBar(0, sleepQuality, sleepQualityMeter, 5);
  } else {
    const userSleepQuality = (0,_sleep__WEBPACK_IMPORTED_MODULE_9__.getSleepQuality)(
      user.id,
      sleep,
      userSleepInfo[day].date
    );
    sleepProgressBar(userSleepQuality, sleepQuality, sleepQualityMeter, 5);
  }
}

function sleepProgressBar(hours, type, meter, cap) {
  type.innerText = `${hours}`;
  meter.style.background = `conic-gradient(
    #00008B ${(hours / cap) * 360}deg,
    #89CFF0 ${(hours / cap) * 360}deg
  )`;
}

function updateSleepAverages(user) {
  const userSleepAvgHours = (0,_sleep__WEBPACK_IMPORTED_MODULE_9__.getAverageHoursSleptNet)(user.id, sleep);
  const userSleepAvgQuality = (0,_sleep__WEBPACK_IMPORTED_MODULE_9__.getAverageSleepQualityNet)(user.id, sleep);
  sleepAverageTitle.innerHTML = `<h1>Average Sleep Stats</h1>`;
  sleepProgressBar(userSleepAvgHours, sleepHoursAvg, sleepHoursMeterAvg, 12);
  sleepProgressBar(
    userSleepAvgQuality,
    sleepQualityAvg,
    sleepQualityMeterAvg,
    5
  );
}

function updateButtonsDate(dates) {
  const days = document.querySelectorAll(".day-selector");
  let count = 0;
  days.forEach((day) => {
    day.innerText = dates[today - count].date;
    count++;
  });
}

function openForm() {
  popUpForm.style.display = "block";
  sleepMeters.forEach((meter) => {
    meter.style.filter = "blur(6px)";
  });
}

function closeForm() {
  sessionStorage.setItem("user", user.id);
  popUpForm.style.display = "none";
  sleepMeters.forEach((meter) => {
    meter.style.filter = "none";
  });
}

draggables.forEach((draggable) => {
  draggable.addEventListener("dragstart", () => {
    draggable.classList.add("dragging");
  });

  draggable.addEventListener("dragend", () => {
    draggable.classList.remove("dragging");

    if(sessionStorage.getItem("user")) {
      containers.forEach((container) => {
        let newPosition = Array.from(container.children).map((element) => element.id);
        containerPositions[container.id] = newPosition
      })
      sessionStorage.setItem('containerPositions', JSON.stringify(containerPositions))
    }
  });
});

containers.forEach((container) => {
  container.addEventListener("dragover", (e) => {
    e.preventDefault();
    let draggable = document.querySelector(".dragging");
    if(draggable) {
      let fromContainer = draggable.parentNode;
      if(fromContainer !== container) {
        let tgt = e.currentTarget.firstElementChild
        if(tgt) {
          fromContainer.replaceChild(tgt, draggable)
          container.appendChild(draggable)
        }
      }
    }
  });
})


})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map
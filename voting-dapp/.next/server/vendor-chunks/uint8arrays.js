"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/uint8arrays";
exports.ids = ["vendor-chunks/uint8arrays"];
exports.modules = {

/***/ "(ssr)/./node_modules/uint8arrays/esm/src/alloc.js":
/*!***************************************************!*\
  !*** ./node_modules/uint8arrays/esm/src/alloc.js ***!
  \***************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   alloc: () => (/* binding */ alloc),\n/* harmony export */   allocUnsafe: () => (/* binding */ allocUnsafe)\n/* harmony export */ });\nfunction alloc(size = 0) {\n  if (globalThis.Buffer != null && globalThis.Buffer.alloc != null) {\n    return globalThis.Buffer.alloc(size);\n  }\n  return new Uint8Array(size);\n}\nfunction allocUnsafe(size = 0) {\n  if (globalThis.Buffer != null && globalThis.Buffer.allocUnsafe != null) {\n    return globalThis.Buffer.allocUnsafe(size);\n  }\n  return new Uint8Array(size);\n}//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvdWludDhhcnJheXMvZXNtL3NyYy9hbGxvYy5qcyIsIm1hcHBpbmdzIjoiOzs7OztBQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL3ZvdGluZy1kYXBwLy4vbm9kZV9tb2R1bGVzL3VpbnQ4YXJyYXlzL2VzbS9zcmMvYWxsb2MuanM/ODlkOSJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZnVuY3Rpb24gYWxsb2Moc2l6ZSA9IDApIHtcbiAgaWYgKGdsb2JhbFRoaXMuQnVmZmVyICE9IG51bGwgJiYgZ2xvYmFsVGhpcy5CdWZmZXIuYWxsb2MgIT0gbnVsbCkge1xuICAgIHJldHVybiBnbG9iYWxUaGlzLkJ1ZmZlci5hbGxvYyhzaXplKTtcbiAgfVxuICByZXR1cm4gbmV3IFVpbnQ4QXJyYXkoc2l6ZSk7XG59XG5leHBvcnQgZnVuY3Rpb24gYWxsb2NVbnNhZmUoc2l6ZSA9IDApIHtcbiAgaWYgKGdsb2JhbFRoaXMuQnVmZmVyICE9IG51bGwgJiYgZ2xvYmFsVGhpcy5CdWZmZXIuYWxsb2NVbnNhZmUgIT0gbnVsbCkge1xuICAgIHJldHVybiBnbG9iYWxUaGlzLkJ1ZmZlci5hbGxvY1Vuc2FmZShzaXplKTtcbiAgfVxuICByZXR1cm4gbmV3IFVpbnQ4QXJyYXkoc2l6ZSk7XG59Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/uint8arrays/esm/src/alloc.js\n");

/***/ }),

/***/ "(ssr)/./node_modules/uint8arrays/esm/src/compare.js":
/*!*****************************************************!*\
  !*** ./node_modules/uint8arrays/esm/src/compare.js ***!
  \*****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   compare: () => (/* binding */ compare)\n/* harmony export */ });\nfunction compare(a, b) {\n  for (let i = 0; i < a.byteLength; i++) {\n    if (a[i] < b[i]) {\n      return -1;\n    }\n    if (a[i] > b[i]) {\n      return 1;\n    }\n  }\n  if (a.byteLength > b.byteLength) {\n    return 1;\n  }\n  if (a.byteLength < b.byteLength) {\n    return -1;\n  }\n  return 0;\n}//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvdWludDhhcnJheXMvZXNtL3NyYy9jb21wYXJlLmpzIiwibWFwcGluZ3MiOiI7Ozs7QUFBTztBQUNQLGtCQUFrQixrQkFBa0I7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdm90aW5nLWRhcHAvLi9ub2RlX21vZHVsZXMvdWludDhhcnJheXMvZXNtL3NyYy9jb21wYXJlLmpzPzBkZjIiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGZ1bmN0aW9uIGNvbXBhcmUoYSwgYikge1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGEuYnl0ZUxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKGFbaV0gPCBiW2ldKSB7XG4gICAgICByZXR1cm4gLTE7XG4gICAgfVxuICAgIGlmIChhW2ldID4gYltpXSkge1xuICAgICAgcmV0dXJuIDE7XG4gICAgfVxuICB9XG4gIGlmIChhLmJ5dGVMZW5ndGggPiBiLmJ5dGVMZW5ndGgpIHtcbiAgICByZXR1cm4gMTtcbiAgfVxuICBpZiAoYS5ieXRlTGVuZ3RoIDwgYi5ieXRlTGVuZ3RoKSB7XG4gICAgcmV0dXJuIC0xO1xuICB9XG4gIHJldHVybiAwO1xufSJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/uint8arrays/esm/src/compare.js\n");

/***/ }),

/***/ "(ssr)/./node_modules/uint8arrays/esm/src/concat.js":
/*!****************************************************!*\
  !*** ./node_modules/uint8arrays/esm/src/concat.js ***!
  \****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   concat: () => (/* binding */ concat)\n/* harmony export */ });\n/* harmony import */ var _alloc_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./alloc.js */ \"(ssr)/./node_modules/uint8arrays/esm/src/alloc.js\");\n\nfunction concat(arrays, length) {\n  if (!length) {\n    length = arrays.reduce((acc, curr) => acc + curr.length, 0);\n  }\n  const output = (0,_alloc_js__WEBPACK_IMPORTED_MODULE_0__.allocUnsafe)(length);\n  let offset = 0;\n  for (const arr of arrays) {\n    output.set(arr, offset);\n    offset += arr.length;\n  }\n  return output;\n}//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvdWludDhhcnJheXMvZXNtL3NyYy9jb25jYXQuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBeUM7QUFDbEM7QUFDUDtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsc0RBQVc7QUFDNUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly92b3RpbmctZGFwcC8uL25vZGVfbW9kdWxlcy91aW50OGFycmF5cy9lc20vc3JjL2NvbmNhdC5qcz9jMGQ1Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGFsbG9jVW5zYWZlIH0gZnJvbSAnLi9hbGxvYy5qcyc7XG5leHBvcnQgZnVuY3Rpb24gY29uY2F0KGFycmF5cywgbGVuZ3RoKSB7XG4gIGlmICghbGVuZ3RoKSB7XG4gICAgbGVuZ3RoID0gYXJyYXlzLnJlZHVjZSgoYWNjLCBjdXJyKSA9PiBhY2MgKyBjdXJyLmxlbmd0aCwgMCk7XG4gIH1cbiAgY29uc3Qgb3V0cHV0ID0gYWxsb2NVbnNhZmUobGVuZ3RoKTtcbiAgbGV0IG9mZnNldCA9IDA7XG4gIGZvciAoY29uc3QgYXJyIG9mIGFycmF5cykge1xuICAgIG91dHB1dC5zZXQoYXJyLCBvZmZzZXQpO1xuICAgIG9mZnNldCArPSBhcnIubGVuZ3RoO1xuICB9XG4gIHJldHVybiBvdXRwdXQ7XG59Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/uint8arrays/esm/src/concat.js\n");

/***/ }),

/***/ "(ssr)/./node_modules/uint8arrays/esm/src/equals.js":
/*!****************************************************!*\
  !*** ./node_modules/uint8arrays/esm/src/equals.js ***!
  \****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   equals: () => (/* binding */ equals)\n/* harmony export */ });\nfunction equals(a, b) {\n  if (a === b) {\n    return true;\n  }\n  if (a.byteLength !== b.byteLength) {\n    return false;\n  }\n  for (let i = 0; i < a.byteLength; i++) {\n    if (a[i] !== b[i]) {\n      return false;\n    }\n  }\n  return true;\n}//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvdWludDhhcnJheXMvZXNtL3NyYy9lcXVhbHMuanMiLCJtYXBwaW5ncyI6Ijs7OztBQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCLGtCQUFrQjtBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly92b3RpbmctZGFwcC8uL25vZGVfbW9kdWxlcy91aW50OGFycmF5cy9lc20vc3JjL2VxdWFscy5qcz9hNTFmIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBmdW5jdGlvbiBlcXVhbHMoYSwgYikge1xuICBpZiAoYSA9PT0gYikge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIGlmIChhLmJ5dGVMZW5ndGggIT09IGIuYnl0ZUxlbmd0aCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBmb3IgKGxldCBpID0gMDsgaSA8IGEuYnl0ZUxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKGFbaV0gIT09IGJbaV0pIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHRydWU7XG59Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/uint8arrays/esm/src/equals.js\n");

/***/ }),

/***/ "(ssr)/./node_modules/uint8arrays/esm/src/from-string.js":
/*!*********************************************************!*\
  !*** ./node_modules/uint8arrays/esm/src/from-string.js ***!
  \*********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   fromString: () => (/* binding */ fromString)\n/* harmony export */ });\n/* harmony import */ var _util_bases_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util/bases.js */ \"(ssr)/./node_modules/uint8arrays/esm/src/util/bases.js\");\n\nfunction fromString(string, encoding = 'utf8') {\n  const base = _util_bases_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"][encoding];\n  if (!base) {\n    throw new Error(`Unsupported encoding \"${ encoding }\"`);\n  }\n  if ((encoding === 'utf8' || encoding === 'utf-8') && globalThis.Buffer != null && globalThis.Buffer.from != null) {\n    return globalThis.Buffer.from(string, 'utf8');\n  }\n  return base.decoder.decode(`${ base.prefix }${ string }`);\n}//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvdWludDhhcnJheXMvZXNtL3NyYy9mcm9tLXN0cmluZy5qcyIsIm1hcHBpbmdzIjoiOzs7OztBQUFvQztBQUM3QjtBQUNQLGVBQWUsc0RBQUs7QUFDcEI7QUFDQSw4Q0FBOEMsVUFBVTtBQUN4RDtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlDQUFpQyxhQUFhLEdBQUcsUUFBUTtBQUN6RCIsInNvdXJjZXMiOlsid2VicGFjazovL3ZvdGluZy1kYXBwLy4vbm9kZV9tb2R1bGVzL3VpbnQ4YXJyYXlzL2VzbS9zcmMvZnJvbS1zdHJpbmcuanM/MmI3ZCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgYmFzZXMgZnJvbSAnLi91dGlsL2Jhc2VzLmpzJztcbmV4cG9ydCBmdW5jdGlvbiBmcm9tU3RyaW5nKHN0cmluZywgZW5jb2RpbmcgPSAndXRmOCcpIHtcbiAgY29uc3QgYmFzZSA9IGJhc2VzW2VuY29kaW5nXTtcbiAgaWYgKCFiYXNlKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBVbnN1cHBvcnRlZCBlbmNvZGluZyBcIiR7IGVuY29kaW5nIH1cImApO1xuICB9XG4gIGlmICgoZW5jb2RpbmcgPT09ICd1dGY4JyB8fCBlbmNvZGluZyA9PT0gJ3V0Zi04JykgJiYgZ2xvYmFsVGhpcy5CdWZmZXIgIT0gbnVsbCAmJiBnbG9iYWxUaGlzLkJ1ZmZlci5mcm9tICE9IG51bGwpIHtcbiAgICByZXR1cm4gZ2xvYmFsVGhpcy5CdWZmZXIuZnJvbShzdHJpbmcsICd1dGY4Jyk7XG4gIH1cbiAgcmV0dXJuIGJhc2UuZGVjb2Rlci5kZWNvZGUoYCR7IGJhc2UucHJlZml4IH0keyBzdHJpbmcgfWApO1xufSJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/uint8arrays/esm/src/from-string.js\n");

/***/ }),

/***/ "(ssr)/./node_modules/uint8arrays/esm/src/index.js":
/*!***************************************************!*\
  !*** ./node_modules/uint8arrays/esm/src/index.js ***!
  \***************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   compare: () => (/* reexport safe */ _compare_js__WEBPACK_IMPORTED_MODULE_0__.compare),\n/* harmony export */   concat: () => (/* reexport safe */ _concat_js__WEBPACK_IMPORTED_MODULE_1__.concat),\n/* harmony export */   equals: () => (/* reexport safe */ _equals_js__WEBPACK_IMPORTED_MODULE_2__.equals),\n/* harmony export */   fromString: () => (/* reexport safe */ _from_string_js__WEBPACK_IMPORTED_MODULE_3__.fromString),\n/* harmony export */   toString: () => (/* reexport safe */ _to_string_js__WEBPACK_IMPORTED_MODULE_4__.toString),\n/* harmony export */   xor: () => (/* reexport safe */ _xor_js__WEBPACK_IMPORTED_MODULE_5__.xor)\n/* harmony export */ });\n/* harmony import */ var _compare_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./compare.js */ \"(ssr)/./node_modules/uint8arrays/esm/src/compare.js\");\n/* harmony import */ var _concat_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./concat.js */ \"(ssr)/./node_modules/uint8arrays/esm/src/concat.js\");\n/* harmony import */ var _equals_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./equals.js */ \"(ssr)/./node_modules/uint8arrays/esm/src/equals.js\");\n/* harmony import */ var _from_string_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./from-string.js */ \"(ssr)/./node_modules/uint8arrays/esm/src/from-string.js\");\n/* harmony import */ var _to_string_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./to-string.js */ \"(ssr)/./node_modules/uint8arrays/esm/src/to-string.js\");\n/* harmony import */ var _xor_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./xor.js */ \"(ssr)/./node_modules/uint8arrays/esm/src/xor.js\");\n\n\n\n\n\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvdWludDhhcnJheXMvZXNtL3NyYy9pbmRleC5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBdUM7QUFDRjtBQUNBO0FBQ1M7QUFDSjtBQUNYIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdm90aW5nLWRhcHAvLi9ub2RlX21vZHVsZXMvdWludDhhcnJheXMvZXNtL3NyYy9pbmRleC5qcz8zZThkIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNvbXBhcmUgfSBmcm9tICcuL2NvbXBhcmUuanMnO1xuaW1wb3J0IHsgY29uY2F0IH0gZnJvbSAnLi9jb25jYXQuanMnO1xuaW1wb3J0IHsgZXF1YWxzIH0gZnJvbSAnLi9lcXVhbHMuanMnO1xuaW1wb3J0IHsgZnJvbVN0cmluZyB9IGZyb20gJy4vZnJvbS1zdHJpbmcuanMnO1xuaW1wb3J0IHsgdG9TdHJpbmcgfSBmcm9tICcuL3RvLXN0cmluZy5qcyc7XG5pbXBvcnQgeyB4b3IgfSBmcm9tICcuL3hvci5qcyc7XG5leHBvcnQge1xuICBjb21wYXJlLFxuICBjb25jYXQsXG4gIGVxdWFscyxcbiAgZnJvbVN0cmluZyxcbiAgdG9TdHJpbmcsXG4gIHhvclxufTsiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/uint8arrays/esm/src/index.js\n");

/***/ }),

/***/ "(ssr)/./node_modules/uint8arrays/esm/src/to-string.js":
/*!*******************************************************!*\
  !*** ./node_modules/uint8arrays/esm/src/to-string.js ***!
  \*******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   toString: () => (/* binding */ toString)\n/* harmony export */ });\n/* harmony import */ var _util_bases_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util/bases.js */ \"(ssr)/./node_modules/uint8arrays/esm/src/util/bases.js\");\n\nfunction toString(array, encoding = 'utf8') {\n  const base = _util_bases_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"][encoding];\n  if (!base) {\n    throw new Error(`Unsupported encoding \"${ encoding }\"`);\n  }\n  if ((encoding === 'utf8' || encoding === 'utf-8') && globalThis.Buffer != null && globalThis.Buffer.from != null) {\n    return globalThis.Buffer.from(array.buffer, array.byteOffset, array.byteLength).toString('utf8');\n  }\n  return base.encoder.encode(array).substring(1);\n}//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvdWludDhhcnJheXMvZXNtL3NyYy90by1zdHJpbmcuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBb0M7QUFDN0I7QUFDUCxlQUFlLHNEQUFLO0FBQ3BCO0FBQ0EsOENBQThDLFVBQVU7QUFDeEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdm90aW5nLWRhcHAvLi9ub2RlX21vZHVsZXMvdWludDhhcnJheXMvZXNtL3NyYy90by1zdHJpbmcuanM/MjhmYSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgYmFzZXMgZnJvbSAnLi91dGlsL2Jhc2VzLmpzJztcbmV4cG9ydCBmdW5jdGlvbiB0b1N0cmluZyhhcnJheSwgZW5jb2RpbmcgPSAndXRmOCcpIHtcbiAgY29uc3QgYmFzZSA9IGJhc2VzW2VuY29kaW5nXTtcbiAgaWYgKCFiYXNlKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBVbnN1cHBvcnRlZCBlbmNvZGluZyBcIiR7IGVuY29kaW5nIH1cImApO1xuICB9XG4gIGlmICgoZW5jb2RpbmcgPT09ICd1dGY4JyB8fCBlbmNvZGluZyA9PT0gJ3V0Zi04JykgJiYgZ2xvYmFsVGhpcy5CdWZmZXIgIT0gbnVsbCAmJiBnbG9iYWxUaGlzLkJ1ZmZlci5mcm9tICE9IG51bGwpIHtcbiAgICByZXR1cm4gZ2xvYmFsVGhpcy5CdWZmZXIuZnJvbShhcnJheS5idWZmZXIsIGFycmF5LmJ5dGVPZmZzZXQsIGFycmF5LmJ5dGVMZW5ndGgpLnRvU3RyaW5nKCd1dGY4Jyk7XG4gIH1cbiAgcmV0dXJuIGJhc2UuZW5jb2Rlci5lbmNvZGUoYXJyYXkpLnN1YnN0cmluZygxKTtcbn0iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/uint8arrays/esm/src/to-string.js\n");

/***/ }),

/***/ "(ssr)/./node_modules/uint8arrays/esm/src/util/bases.js":
/*!********************************************************!*\
  !*** ./node_modules/uint8arrays/esm/src/util/bases.js ***!
  \********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var multiformats_basics__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! multiformats/basics */ \"(ssr)/./node_modules/multiformats/esm/src/basics.js\");\n/* harmony import */ var _alloc_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../alloc.js */ \"(ssr)/./node_modules/uint8arrays/esm/src/alloc.js\");\n\n\nfunction createCodec(name, prefix, encode, decode) {\n  return {\n    name,\n    prefix,\n    encoder: {\n      name,\n      prefix,\n      encode\n    },\n    decoder: { decode }\n  };\n}\nconst string = createCodec('utf8', 'u', buf => {\n  const decoder = new TextDecoder('utf8');\n  return 'u' + decoder.decode(buf);\n}, str => {\n  const encoder = new TextEncoder();\n  return encoder.encode(str.substring(1));\n});\nconst ascii = createCodec('ascii', 'a', buf => {\n  let string = 'a';\n  for (let i = 0; i < buf.length; i++) {\n    string += String.fromCharCode(buf[i]);\n  }\n  return string;\n}, str => {\n  str = str.substring(1);\n  const buf = (0,_alloc_js__WEBPACK_IMPORTED_MODULE_1__.allocUnsafe)(str.length);\n  for (let i = 0; i < str.length; i++) {\n    buf[i] = str.charCodeAt(i);\n  }\n  return buf;\n});\nconst BASES = {\n  utf8: string,\n  'utf-8': string,\n  hex: multiformats_basics__WEBPACK_IMPORTED_MODULE_0__.bases.base16,\n  latin1: ascii,\n  ascii: ascii,\n  binary: ascii,\n  ...multiformats_basics__WEBPACK_IMPORTED_MODULE_0__.bases\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (BASES);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvdWludDhhcnJheXMvZXNtL3NyYy91dGlsL2Jhc2VzLmpzIiwibWFwcGluZ3MiOiI7Ozs7OztBQUE0QztBQUNGO0FBQzFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsZUFBZTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0Esa0JBQWtCLGdCQUFnQjtBQUNsQztBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQSxjQUFjLHNEQUFXO0FBQ3pCLGtCQUFrQixnQkFBZ0I7QUFDbEM7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBLE9BQU8sc0RBQUs7QUFDWjtBQUNBO0FBQ0E7QUFDQSxLQUFLLHNEQUFLO0FBQ1Y7QUFDQSxpRUFBZSxLQUFLIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdm90aW5nLWRhcHAvLi9ub2RlX21vZHVsZXMvdWludDhhcnJheXMvZXNtL3NyYy91dGlsL2Jhc2VzLmpzPzRlMDciXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgYmFzZXMgfSBmcm9tICdtdWx0aWZvcm1hdHMvYmFzaWNzJztcbmltcG9ydCB7IGFsbG9jVW5zYWZlIH0gZnJvbSAnLi4vYWxsb2MuanMnO1xuZnVuY3Rpb24gY3JlYXRlQ29kZWMobmFtZSwgcHJlZml4LCBlbmNvZGUsIGRlY29kZSkge1xuICByZXR1cm4ge1xuICAgIG5hbWUsXG4gICAgcHJlZml4LFxuICAgIGVuY29kZXI6IHtcbiAgICAgIG5hbWUsXG4gICAgICBwcmVmaXgsXG4gICAgICBlbmNvZGVcbiAgICB9LFxuICAgIGRlY29kZXI6IHsgZGVjb2RlIH1cbiAgfTtcbn1cbmNvbnN0IHN0cmluZyA9IGNyZWF0ZUNvZGVjKCd1dGY4JywgJ3UnLCBidWYgPT4ge1xuICBjb25zdCBkZWNvZGVyID0gbmV3IFRleHREZWNvZGVyKCd1dGY4Jyk7XG4gIHJldHVybiAndScgKyBkZWNvZGVyLmRlY29kZShidWYpO1xufSwgc3RyID0+IHtcbiAgY29uc3QgZW5jb2RlciA9IG5ldyBUZXh0RW5jb2RlcigpO1xuICByZXR1cm4gZW5jb2Rlci5lbmNvZGUoc3RyLnN1YnN0cmluZygxKSk7XG59KTtcbmNvbnN0IGFzY2lpID0gY3JlYXRlQ29kZWMoJ2FzY2lpJywgJ2EnLCBidWYgPT4ge1xuICBsZXQgc3RyaW5nID0gJ2EnO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGJ1Zi5sZW5ndGg7IGkrKykge1xuICAgIHN0cmluZyArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGJ1ZltpXSk7XG4gIH1cbiAgcmV0dXJuIHN0cmluZztcbn0sIHN0ciA9PiB7XG4gIHN0ciA9IHN0ci5zdWJzdHJpbmcoMSk7XG4gIGNvbnN0IGJ1ZiA9IGFsbG9jVW5zYWZlKHN0ci5sZW5ndGgpO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IHN0ci5sZW5ndGg7IGkrKykge1xuICAgIGJ1ZltpXSA9IHN0ci5jaGFyQ29kZUF0KGkpO1xuICB9XG4gIHJldHVybiBidWY7XG59KTtcbmNvbnN0IEJBU0VTID0ge1xuICB1dGY4OiBzdHJpbmcsXG4gICd1dGYtOCc6IHN0cmluZyxcbiAgaGV4OiBiYXNlcy5iYXNlMTYsXG4gIGxhdGluMTogYXNjaWksXG4gIGFzY2lpOiBhc2NpaSxcbiAgYmluYXJ5OiBhc2NpaSxcbiAgLi4uYmFzZXNcbn07XG5leHBvcnQgZGVmYXVsdCBCQVNFUzsiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/uint8arrays/esm/src/util/bases.js\n");

/***/ }),

/***/ "(ssr)/./node_modules/uint8arrays/esm/src/xor.js":
/*!*************************************************!*\
  !*** ./node_modules/uint8arrays/esm/src/xor.js ***!
  \*************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   xor: () => (/* binding */ xor)\n/* harmony export */ });\n/* harmony import */ var _alloc_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./alloc.js */ \"(ssr)/./node_modules/uint8arrays/esm/src/alloc.js\");\n\nfunction xor(a, b) {\n  if (a.length !== b.length) {\n    throw new Error('Inputs should have the same length');\n  }\n  const result = (0,_alloc_js__WEBPACK_IMPORTED_MODULE_0__.allocUnsafe)(a.length);\n  for (let i = 0; i < a.length; i++) {\n    result[i] = a[i] ^ b[i];\n  }\n  return result;\n}//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvdWludDhhcnJheXMvZXNtL3NyYy94b3IuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBeUM7QUFDbEM7QUFDUDtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsc0RBQVc7QUFDNUIsa0JBQWtCLGNBQWM7QUFDaEM7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly92b3RpbmctZGFwcC8uL25vZGVfbW9kdWxlcy91aW50OGFycmF5cy9lc20vc3JjL3hvci5qcz81ZGYzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGFsbG9jVW5zYWZlIH0gZnJvbSAnLi9hbGxvYy5qcyc7XG5leHBvcnQgZnVuY3Rpb24geG9yKGEsIGIpIHtcbiAgaWYgKGEubGVuZ3RoICE9PSBiLmxlbmd0aCkge1xuICAgIHRocm93IG5ldyBFcnJvcignSW5wdXRzIHNob3VsZCBoYXZlIHRoZSBzYW1lIGxlbmd0aCcpO1xuICB9XG4gIGNvbnN0IHJlc3VsdCA9IGFsbG9jVW5zYWZlKGEubGVuZ3RoKTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBhLmxlbmd0aDsgaSsrKSB7XG4gICAgcmVzdWx0W2ldID0gYVtpXSBeIGJbaV07XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn0iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/uint8arrays/esm/src/xor.js\n");

/***/ })

};
;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isTestEnvironment = void 0;
const isTestEnvironment = () => typeof process !== 'undefined' && process.env.NODE_ENV === 'test';
exports.isTestEnvironment = isTestEnvironment;
//# sourceMappingURL=environment.js.map
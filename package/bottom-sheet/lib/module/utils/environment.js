"use strict";

export const isTestEnvironment = () => typeof process !== 'undefined' && process.env.NODE_ENV === 'test';
//# sourceMappingURL=environment.js.map
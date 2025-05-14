const { createDefaultEsmPreset } = require('ts-jest');
/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  ...createDefaultEsmPreset({
    tsconfig: {
      // to suppress warnings
      esModuleInterop: true,
    }
  }),
  roots: [
    "<rootDir>/src/",
  ],
  resolver: "<rootDir>/jest.resolver.cjs",
};
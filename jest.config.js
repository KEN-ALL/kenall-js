module.exports = {
  preset: 'ts-jest',
  roots: [
    '<rootDir>/src/',
  ],
  globals: {
    'ts-jest': {
      compiler: 'ttypescript',
    },
  },
};
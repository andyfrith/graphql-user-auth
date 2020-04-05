module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  globalTeardown: './src/tests/globalTeardown.ts',
  testPathIgnorePatterns: ['/node_modules/', '/build/'],
};

module.exports = {
    testEnvironment: 'node',
    preset: 'ts-jest/presets/default-esm',
    transform: {
      '^.+\\.m?[tj]s?$': ['ts-jest', { useESM: true }],
      
    },
    moduleNameMapper: {
      '^(\\.{1,2}/.*)\\.(m)?js$': '$1',
    },
    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(m)?ts$',
    setupFilesAfterEnv: ['<rootDir>/src/setupFilesAfterEnv.ts'],
    modulePathIgnorePatterns: ['<rootDir>/dist/'],
    setupFiles: ["dotenv/config"],
  };
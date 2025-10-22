// jest.config.js
import nextJest from 'next/jest.js'

/** @type {import('jest').Config} */
const jestConfig = {
  setupFilesAfterEnv: ['<rootDir>/__tests__/setup/env-setup.ts'],
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {  // ← FIXED: Changed from moduleNameMapping
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
  transform: {},
}

const createJestConfig = nextJest({
  dir: './',
})(jestConfig)

export default createJestConfig
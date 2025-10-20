// jest.config.js
import nextJest from 'next/jest.js'

/** @type {import('jest').Config} */
const jestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
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
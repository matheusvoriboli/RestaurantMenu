const nextJest = require('next/jest')

const createJestConfig = nextJest({
   dir: './',
})

/** @type {import('@jest/types').Config.InitialOptions} */
const config = {
   setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
   testEnvironment: 'jest-environment-jsdom',
   preset: 'ts-jest',
   testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/.next/', '/__tests__/mocks', '/__tests__/helpers'],
}

module.exports = createJestConfig(config)
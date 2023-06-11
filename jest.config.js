/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'jsdom',
	transform: {
		'^.+\\[.ts|.tsx]$': 'ts-jest',
	},
	testRegex: '(/__tests__/.*|(\\.|/)test)\\.tsx?$',
	moduleFileExtensions: ['ts', 'tsx', 'js', 'json'],
};

module.exports = {
	moduleFileExtensions: ['ts', 'tsx', 'js'],
	setupFilesAfterEnv: ['<rootDir>/jest-setup.js'],
	moduleNameMapper: {
		'\\.(css|less|scss|sass)$': 'identity-obj-proxy',
	},
	setupFiles: [
		'fake-indexeddb/auto',
	],
	testEnvironment: 'jest-environment-jsdom',
	coverageThreshold: {
		global: {
			branches: 80,
			functions: 80,
			lines: 80,
		},
	},
};

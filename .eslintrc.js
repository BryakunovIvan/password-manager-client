module.exports = {
	env: {
		browser: true,
		es2021: true,
		'jest/globals': true,
	},
	extends: [
		'plugin:react/recommended',
		'airbnb',
		'eslint:recommended',
	],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: 'latest',
		sourceType: 'module',
	},
	plugins: [
		'react',
		'@typescript-eslint',
		'jest',
	],
	rules: {
		indent: [2, 'tab'],
		'react/jsx-indent': [2, 'tab'],
		'import/extensions': 0,
		'react/button-has-type': 0,
		'no-tabs': 0,
		'no-console': ['error', { allow: ['error'] }],
		'react/jsx-filename-extension': [1, { extensions: ['.tsx', '.js'] }],
		'import/no-unresolved': 0,
		'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
		'import/prefer-default-export': 0,
		'class-methods-use-this': 0,
		'react/function-component-definition': [2, { namedComponents: 'arrow-function' }],
		'no-underscore-dangle': 0,
	},
};

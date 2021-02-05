module.exports = {
	env: {
		browser: true,
		es6: true
	},
	extends: [
		'eslint:recommended',
		'plugin:react/recommended',
		'airbnb',
		'plugin:prettier/recommended',
		'plugin:import/errors',
		'plugin:import/warnings',
		'plugin:import/typescript',
		'prettier',
		'prettier/react',
		'prettier/@typescript-eslint'
	],
	globals: {
		Atomics: 'readonly',
		SharedArrayBuffer: 'readonly'
	},
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaFeatures: {
			jsx: true
		},
		ecmaVersion: 11,
		sourceType: 'module'
	},
	plugins: ['react', '@typescript-eslint', 'eslint-plugin-babel', 'eslint-plugin-import'],
	rules: {
		'import/extensions': ['error', 'never', { tsx: 'never', ts: 'never', js: 'never', jsx: 'never' }],
		'react/jsx-filename-extension': [1, { extensions: ['.tsx', '.ts', '.jsx'] }],
		'react/destructuring-assignment': [0],
		'no-unused-vars': 0,
		'no-unused-expressions': 0,
		'react/prop-types': [0],
		'no-use-before-define': [0],
		'react/jsx-props-no-spreading': [1],
		'jsx-a11y/label-has-associated-control': 0,
		'jsx-a11y/click-events-have-key-events': 0,
		'jsx-a11y/no-static-element-interactions': 0,
		'eslint-no-plusplus': 0,
		'no-nested-ternary': 1,
		'no-shadow': 0,
		'no-return-assign': ['error', 'except-parens'],
		'no-param-reassign': [1],
		'class-methods-use-this': 1,
		'no-restricted-globals': ['off', 'location', 'isNAN'],
		'consistent-return': ['warn', { treatUndefinedAsUnspecified: true }],
		'no-useless-constructor': 1,
		'array-callback-return': 1,
		'react/no-unused-prop-types': 1,
		'react/no-access-state-in-setstate': 1,
		'react/require-default-props': 1,
		'react/no-unused-state': 1,
		'jsx-a11y/no-noninteractive-element-interactions': 0,
		'jsx-a11y/control-has-associated-label': 0,
		'jsx-a11y/anchor-is-valid': 0,
		'jsx-a11y/no-autofocus': 1,
		'no-return-await': 1,
		'import/no-cycle': 1,
		'react/no-array-index-key': 1,
		'react/no-did-update-set-state': 1,
		'prefer-destructuring': 1,
		'prettier/prettier': ['error', { endOfLine: 'auto' }]
	}
};

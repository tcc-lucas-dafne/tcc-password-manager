const reactRecommended = require('eslint-plugin-react/configs/recommended');
const tsParser = require('@typescript-eslint/parser');

module.exports = [
  {
    files: ["**/*.ts", "**/*.tsx"],
    ignores: ["node_modules/", "build/", "dist/"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        requireConfigFile: false,
        babelOptions: {
          presets: ["@babel/preset-react"],
        },
      },
    },
    plugins: {
      react: require("eslint-plugin-react"),
      "react-hooks": require("eslint-plugin-react-hooks"),
      "jsx-a11y": require("eslint-plugin-jsx-a11y"),
      prettier: require("eslint-plugin-prettier"),
      "unused-imports": require("eslint-plugin-unused-imports"),
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      ...reactRecommended.rules,
      "prettier/prettier": "error",
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
      "jsx-a11y/no-autofocus": "off",
      "unused-imports/no-unused-imports": "error",
      "unused-imports/no-unused-vars": ["error", {
        vars: "all",
        varsIgnorePattern: "^_",
        args: "after-used",
        argsIgnorePattern: "^_"
      }],
    },
  }
];

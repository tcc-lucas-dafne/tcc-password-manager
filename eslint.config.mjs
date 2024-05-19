import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReactConfig from "eslint-plugin-react/configs/recommended.js";


export default [
  {
    parser: tsparser,
    plugins: ["@typescript-eslint", "react"],
    extends: [
      "eslint:recommended",
      "plugin:@typescript-eslint/recommended",
      "plugin:react/recommended"
    ],
    files: ["src/**/*.ts", "src/**/*.tsx"],
    rules: {
      "react/jsx-filename-extension": [1, { "extensions": [".ts", ".tsx"] }],
      "react/prop-types": "off",
      "react/button-has-type": "off",
      "react/react-in-tsx-scope": "off",
      "no-underscore-dangle": "off",
      "react/no-array-index-key": "off"
    },
    settings: {
      react: {
        version: "detect"
      }
    }
  }
];
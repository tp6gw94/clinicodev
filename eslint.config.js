import pluginJs from "@eslint/js";
import pluginReactConfig from "eslint-plugin-react/configs/recommended.js";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import globals from "globals";
import tseslint from "typescript-eslint";

export default [
  { languageOptions: { globals: globals.browser } },
  {
    plugins: {
      "simple-import-sort": simpleImportSort,
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReactConfig,
  {
    rules: {
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",
      "react/react-in-jsx-scope": "off",
      "react/jsx-uses-react": "off",
    },
  },
];

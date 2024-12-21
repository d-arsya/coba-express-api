import globals from "globals"
import pluginJs from "@eslint/js"
import tseslint from "typescript-eslint"

/** @type {import("eslint").Linter.Config[]} */
export default [
  { files: ["**/*.{js,mjs,cjs,ts}"] },
  { languageOptions: { globals: { ...globals.browser, ...globals.node } } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  { plugins: ["@typescript-eslint"] },
  { ignores: ["**/build/*", "**/node_modules/*", "**/public/*","**/tsconfig.json"] },
  {
    rules: {
    "@typescript-eslint/restrict-template-expressions": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/strict-boolean-expressions": "off",
    "no-return-assign": "off",
    "array-callback-return": "off",
    "@typescript-eslint/no-misused-promises": "off"
    }
  }
]

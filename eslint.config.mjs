import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Non-Next.js files
    "scripts/**",
    "php/**",
    "deploy/**",
  ]),
  // Relax rules for auto-generated shadcn/MagicUI components
  {
    files: ["components/ui/**"],
    rules: {
      "react-hooks/exhaustive-deps": "warn",
      "react-hooks/static-components": "off",
    },
  },
]);

export default eslintConfig;

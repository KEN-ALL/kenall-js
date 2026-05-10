import fs from 'node:fs';
import license from 'rollup-plugin-license';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';

const readPackageMetadata = () => JSON.parse(
  fs.readFileSync(
    `${import.meta.dirname}/package.json`
  ).toString('utf-8')
);

/**
 * @type {import('rollup').RollupOptions}
 */
export default [
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/bundle.js',
      format: 'iife',
      name: "kenall",
      sourcemap: true,
    },
    plugins: [
      typescript(),
      resolve({
        browser: true,
      }),
      json(),
      commonjs(),
      terser(),
      license({
        sourcemap: true,
        banner: {
          content: `@license <%= pkg.license %>\n@version v<%= pkg.version %>\nBuild time: <%= new Date() %>\nby <%= pkg.author %>`,
        },
      }),
    ],
  },
];
import fs from 'node:fs';
import banner from 'rollup-plugin-banner2';
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
      banner(
        () => {
          const pkg = readPackageMetadata();
          return `/* @license ${pkg.license}\nv${pkg.version}\nBuild time: ${new Date()}\nby ${pkg.author} */\n`;
        }
      ),
    ]
  }
]
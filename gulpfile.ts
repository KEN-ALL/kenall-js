import { src, dest } from 'gulp';
import typescript from 'gulp-typescript';
const rollup = require('gulp-better-rollup');
import sourcemaps from 'gulp-sourcemaps';
import terser from 'gulp-terser';
import rollupNodeResolve from '@rollup/plugin-node-resolve';
import rollupCommonJS from '@rollup/plugin-commonjs';
import rollupBabel from '@rollup/plugin-babel';
import rollupReplace from '@rollup/plugin-replace';


export default () =>
  src(['src/**/*.ts', '!src/**/__tests__/*.ts'])
    .pipe(typescript.createProject('tsconfig.json', {
      typescript: require('ttypescript'),
    })())
    .pipe(dest('built/'))
    .pipe(
      rollup({
        input: './built/index.js',
        plugins: [
          rollupNodeResolve({
            browser: true,
            extensions: ['.js'],
          }),
          rollupCommonJS(),
          // for Superstruct!
          rollupReplace({
            'process.env.NODE_ENV': JSON.stringify('production'),
          }),
          rollupBabel({
            babelHelpers: 'bundled',
            exclude: /node_modules/,
            presets: [
              [
                '@babel/preset-env',
                {
                  useBuiltIns: 'usage',
                  corejs: 3,
                  targets: {
                    ie: "11",
                  },
                },
              ],
            ],
          }),
        ],
      }, {
        file: 'kenall.bundle.js',
        name: 'kenall',
        format: 'umd',
      }),
    )
    .pipe(sourcemaps.init())
    .pipe(terser())
    .pipe(sourcemaps.write('./'))
    .pipe(dest('dist/'));

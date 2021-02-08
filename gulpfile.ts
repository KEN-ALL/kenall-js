//import fs from 'fs';
import { src, dest } from 'gulp';
import typescript from 'gulp-typescript';
const rollup = require('gulp-better-rollup');
import sourcemaps from 'gulp-sourcemaps';
import terser from 'gulp-terser';
import rollupNodeResolve from '@rollup/plugin-node-resolve';
import rollupCommonJS from '@rollup/plugin-commonjs';
import rollupBabel from '@rollup/plugin-babel';
import rollupReplace from '@rollup/plugin-replace';
//const banner2 = require('rollup-plugin-banner2');

export default () =>
  src(['src/**/*.ts', '!src/**/__tests__/*.ts'])
    .pipe(
      typescript.createProject('tsconfig.json', {
        typescript: require('ttypescript'),
      })()
    )
    .pipe(dest('built/'))
    .pipe(sourcemaps.init())
    .pipe(
      rollup(
        {
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
                      ie: '11',
                    },
                  },
                ],
              ],
            }),
            // banner2(
            //   () => {
            //     const pkg = JSON.parse(fs.readFileSync(__dirname + '/package.json').toString('utf-8'));
            //     return `kenall.js\nv${pkg.version}\nby ${pkg.author}`;
            //   }
            // ),
          ],
        },
      )
    )
    .pipe(terser())
    .pipe(sourcemaps.write('./'))
    .pipe(dest('dist/'));

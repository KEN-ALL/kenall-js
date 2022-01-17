import fs from 'fs';
import rollupBabel from '@rollup/plugin-babel';
import rollupCommonJS from '@rollup/plugin-commonjs';
import rollupNodeResolve from '@rollup/plugin-node-resolve';
import rollupReplace from '@rollup/plugin-replace';
import sourcemaps from 'gulp-sourcemaps';
import terser from 'gulp-terser';
import typescript from 'gulp-typescript';
import Vinyl from 'vinyl';
import zip from 'gulp-zip';
import { src, dest, task, series } from 'gulp';
const exec = require('gulp-exec'); // eslint-disable-line @typescript-eslint/no-var-requires
const clean = require('gulp-clean'); // eslint-disable-line @typescript-eslint/no-var-requires
const rollup = require('gulp-better-rollup'); // eslint-disable-line @typescript-eslint/no-var-requires
const banner2 = require('rollup-plugin-banner2'); // eslint-disable-line @typescript-eslint/no-var-requires

const readPackageMetadata = (): {
  name: string;
  version: string;
  license: string;
  author: string;
} => JSON.parse(fs.readFileSync(__dirname + '/package.json').toString('utf-8'));

const bundle = () =>
  src(['src/**/*.ts', '!src/**/__tests__/*.ts'])
    .pipe(
      typescript.createProject('tsconfig.json', {
        typescript: require('ttypescript'),
      })()
    )
    .pipe(dest('built/'))
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
              exclude: /node_modules\/core-js/,
              presets: [
                [
                  '@babel/preset-env',
                  {
                    useBuiltIns: 'usage',
                    corejs: '3',
                    targets: {
                      ie: '11',
                    },
                  },
                ],
              ],
            }),
            banner2(() => {
              const pkg = readPackageMetadata();
              return `/* @license ${pkg.license}\nv${
                pkg.version
              }\nBuild time: ${new Date()}\nby ${pkg.author} */`;
            }),
          ],
        },
        {
          file: 'kenall.bundle.js',
          name: 'kenall',
          format: 'umd',
        }
      )
    )
    .pipe(sourcemaps.init())
    .pipe(terser())
    .pipe(sourcemaps.write('./'))
    .pipe(dest('dist/'));

task('bundle', () => bundle());

task('release', (done) => {
  const pkg = readPackageMetadata();
  const tag = `v${pkg.version}`;
  const baseName = `kenall-bundle-${pkg.version}`;
  return series(
    () =>
      bundle()
        .pipe(dest(baseName, { cwd: 'dist' }))
        .pipe(zip(`${baseName}.zip`))
        .pipe(dest('dist'))
        .pipe(exec((f: Vinyl) => `gh release create --draft ${tag} ${f.path}`)),
    () => src([`dist/${baseName}`]).pipe(clean())
  )(done);
});

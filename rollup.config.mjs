import { execFileSync } from 'node:child_process';
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

/*
 * The build time is derived from the commit being built rather than the wall
 * clock, so that `npm ci && npm run bundle` at a given tag yields a
 * byte-for-byte identical bundle for anyone.  That lets a third party verify a
 * published bundle against its tag without having to trust whoever built it.
 *
 * Honours SOURCE_DATE_EPOCH (https://reproducible-builds.org/docs/source-date-epoch/)
 * so the value can be pinned when git metadata isn't available.
 */
const determineBuildTime = () => {
  const sourceDateEpoch = process.env.SOURCE_DATE_EPOCH;
  if (sourceDateEpoch) {
    return new Date(Number(sourceDateEpoch) * 1000).toUTCString();
  }
  let commitDate;
  try {
    commitDate = execFileSync(
      'git',
      ['log', '-1', '--format=%cI'],
      { cwd: import.meta.dirname, stdio: ['ignore', 'pipe', 'ignore'] }
    ).toString('utf-8').trim();
  } catch {
    throw new Error(
      'Could not determine the commit date from git.  Set SOURCE_DATE_EPOCH to ' +
      'build outside a git working tree.'
    );
  }
  return new Date(commitDate).toUTCString();
};

const buildTime = determineBuildTime();

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
          content: `@license <%= pkg.license %>\n@version v<%= pkg.version %>\nBuild time: ${buildTime}\nby <%= pkg.author %>`,
        },
      }),
    ],
  },
];
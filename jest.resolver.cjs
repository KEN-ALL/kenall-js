const { join, relative } = require('node:path');
const { lstatSync } = require('node:fs');

module.exports = (path, options) => {
  if (options.rootDir !== undefined
      && !relative(options.rootDir, options.basedir).startsWith('node_modules/')
      && path.endsWith('.js')
      && !!lstatSync(join(options.basedir, path.replace(/\.js$/, '.ts')), { throwIfNoEntry: false })) {
    const rewrittenPath = path.replace(/\.js$/, '');
    return options.defaultResolver(rewrittenPath, options);
  }
  return options.defaultResolver(path, options);
};

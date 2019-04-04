module.exports = {
  use: [
    '@neutrinojs/standardjs',
    '@neutrinojs/node',
    '@neutrinojs/jest'
  ],
  options:{
    mains: {
      // If not specified, defaults to options.source + index
      index: 'bin/index'
    }
  }
};

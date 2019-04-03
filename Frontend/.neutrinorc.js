module.exports = {
  use: [
    '@neutrinojs/standardjs',
    [
      '@neutrinojs/react',
      {
        html: {
          title: 'Frontend'
        }
      }
    ],
    '@neutrinojs/jest'
  ]
};

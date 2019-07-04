const standard = require('@neutrinojs/standardjs');
const react = require('@neutrinojs/react');
const jest = require('@neutrinojs/jest');
const style = require('@neutrinojs/style-loader');
const htmlTemplate = require('@neutrinojs/html-template');
const path = require('path')

module.exports = {
  options: {
    root: __dirname,
    output: path.join(__dirname, '..', '/Backend/build_frontend')
  },
  use: [
    (neutrino) => {
      neutrino.config.merge({amd: false})
    },
    standard({
      eslint: {
        baseConfig: {
          extends: ['plugin:flowtype/recommended'],
          plugins: ['babel', 'flowtype'],
        }
      }
    }),
    react({
      publicPath: '/',
      babel: {
        // Override options for @babel/preset-env:
        presets: [
          [
            '@babel/preset-env',
            {
              useBuiltIns: 'entry',
            },
          ],
          '@babel/preset-flow',
        ],
      }
    }),
    jest(),
    style({
      test: /\.(css|sass|scss)$/,
      ruleId: 'sass',
      loaders: [
        {
          loader: 'sass-loader',
          useId: 'sass',
          options: {
            includePaths: ['./node_modules']
          }
        }
      ]
    }),
    htmlTemplate({
      // @neutrinojs/html-template includes a custom template that has more features
      // (eg appMountId and lang support) than the default html-webpack-plugin template:
      // https://github.com/jantimon/html-webpack-plugin/blob/master/default_index.ejs
      template: require.resolve('./resources/html-template.ejs'),
      appMountId: 'root',
      title: 'Delorean Up',
      lang: 'en',
      meta: {
        viewport: 'width=device-width, initial-scale=1',
      },
      favicon: './resources/favicon.ico',
      // Override pluginId to add an additional html-template plugin instance
      pluginId: 'html',
    })
  ],
};

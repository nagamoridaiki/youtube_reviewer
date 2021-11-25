const path = require('path');

module.exports = {
  stories: ['../src/**/*.stories.jsx'],
  addons: ['@storybook/addon-actions', '@storybook/addon-links'],
  webpackFinal: (config) => {
    config.resolve.alias['~'] = path.join(__dirname, '../src/');
    return config;
  },
};

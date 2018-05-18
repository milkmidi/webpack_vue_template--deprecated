const { VueLoaderPlugin } = require('vue-loader');
const webpackConfig = require('../../webpack.config');

const remove = require('lodash/remove');

module.exports = (storybookBaseConfig) => {
  storybookBaseConfig.resolve.alias = {
    ...storybookBaseConfig.resolve.alias,
    ...webpackConfig.resolve.alias,
  };

  const { rules } = storybookBaseConfig.module;

  const ruleJSX = rules.find(rule => rule.test.test('.jsx'));
  ruleJSX.options = ruleJSX.query;
  ruleJSX.options = {
    babelrc: false,
  };
  delete ruleJSX.query;

  remove(rules, rule => rule.test.test('.vue'));

  storybookBaseConfig.module.rules = [
    ...rules,
    ...webpackConfig.module.rules,
  ];

  storybookBaseConfig.plugins.push(new VueLoaderPlugin());

  webpackConfig.resolve.modules.forEach((modulePath) => {
    if (modulePath.indexOf('node_modules') === -1) {
      storybookBaseConfig.resolve.modules.push(modulePath);
    }
  });

  return storybookBaseConfig;
};

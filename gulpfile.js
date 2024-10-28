'use strict';

const build = require('@microsoft/sp-build-web');
const { merge } = require('webpack-merge');
const webpack = require('webpack');

build.configureWebpack.mergeConfig({
  additionalConfiguration: function (config) {
    let azureFunctionBaseUrl = process.env.AzureFunctionBaseUrl;
    let aadClientId = process.env.aadClientId;
    let defineOptions = {};
    if (azureFunctionBaseUrl && aadClientId) {
      console.log('*****************  Applying production settings to webpack   ****************');
      defineOptions = {
        'azureFunctionBaseUrl': JSON.stringify(azureFunctionBaseUrl),
        'aadClientId': JSON.stringify(aadClientId),
      }
    }
    else {
      // specify dev settings here
      defineOptions = {
        'azureFunctionBaseUrl': JSON.stringify('https://func-ud-hanyu-dev.azurewebsites.net'),
        'aadClientId': JSON.stringify('265e00af-ca5d-4248-9a2c-10da0f408f78'),
      }
    }
    var gsitsConfig = {
      plugins: [
        new webpack.DefinePlugin({ ...defineOptions })
      ],
    };
    return merge(config, gsitsConfig);
  }
});

build.addSuppression(`Warning - [sass] The local CSS class 'ms-Grid' is not camelCase and will not be type-safe.`);

var getTasks = build.rig.getTasks;
build.rig.getTasks = function () {
  var result = getTasks.call(build.rig);

  result.set('serve', result.get('serve-deprecated'));

  return result;
};

/* fast-serve */
const { addFastServe } = require("spfx-fast-serve-helpers");
const plugin = require('@microsoft/eslint-plugin-spfx');
addFastServe(build);
/* end of fast-serve */

build.initialize(require('gulp'));


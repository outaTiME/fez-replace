
/*
 * fez-replace
 *
 * Copyright (c) 2014 outaTiME
 * Licensed under the MIT license.
 * https://github.com/outaTiME/fez-replace/blob/master/LICENSE-MIT
 */

// dependencies

var Promise = require("bluebird");
var Applause = require('applause');

module.exports = function (options) {
  return function replace (inputs) {
    var ps = [];
    inputs.forEach(function (input) {
      ps.push(input.asBuffer());
    });
    return Promise.all(ps).then(function (buffers) {
      var applause = Applause.create(options);
      return buffers.map(function (buf) {
        var content = buf.toString();
        var result = applause.replace(content);
        if (result === false) {
          // no replacements
          return content;
        }
        return result;
      }).join("");
    });
  };
};


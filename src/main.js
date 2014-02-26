
/*
 * fez-replace
 * http://gruntjs.com/
 *
 * Copyright (c) 2014 outaTiME
 * Licensed under the MIT license.
 * https://github.com/outaTiME/fez-replace/blob/master/LICENSE-MIT
 */

// dependencies

var Promise = require("bluebird");
var Replacer = require('pattern-replace');

module.exports = function (options) {
  return function replace (inputs) {
    var ps = [];
    inputs.forEach(function (input) {
      ps.push(input.asBuffer());
    });
    return Promise.all(ps).then(function (buffers) {
      var replacer = new Replacer(options);
      return buffers.map(function (buf) {
        var content = buf.toString();
        var result = replacer.replace(content);
        if (result === false) {
          // no replacements
          return content;
        }
        return result;
      }).join("");
    });
  };
};


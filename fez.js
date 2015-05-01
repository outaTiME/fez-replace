
/*
 * fez-replace
 *
 * Copyright (c) 2015 outaTiME
 * Licensed under the MIT license.
 * https://github.com/outaTiME/fez-replace/blob/master/LICENSE-MIT
 */

'use strict';

// dependencies

var fez = require('fez');
var replace = require('./index');

exports.default = function (spec) {

  spec.with('test/fixtures/simple.txt').one(function (file) {
    spec.rule(file, 'temp/simple.txt', replace({
      variables: {
        key: 'value'
      }
    }));
  });

};

fez(module);

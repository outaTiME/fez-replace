
/*
 * fez-replace
 *
 * Copyright (c) 2014 outaTiME
 * Licensed under the MIT license.
 * https://github.com/outaTiME/fez-replace/blob/master/LICENSE-MIT
 */

var fez = require('fez');
var replace = require('./src');

exports.default = function (spec) {

  'use strict';

  spec.with('test/fixtures/simple.txt').one(function (file) {
    spec.rule(file, 'temp/simple.txt', replace({
      variables: {
        'key': 'value'
      }
    }));
  });

};

fez(module);

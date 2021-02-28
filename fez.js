'use strict';

var fez = require('fez');
var replace = require('.');

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

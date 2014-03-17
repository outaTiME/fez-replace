var fez = require('../../src/main'),
    jshint = require('fez-jshint'),
    x = 1;

function imperative (rule) {
  console.log(x++);
}

exports.a = function (spec) {
  spec.do(imperative);
};

exports.b = function (spec) {
  spec.do(imperative);

  var stage = spec.with("*.js").each(function (file) {
    spec.rule(file, jshint({ node: true }));
  });

  spec.after(stage).do(imperative);
};

exports.c = function (spec) {
  spec.do(imperative);
  spec.do(imperative);
};

fez(module);

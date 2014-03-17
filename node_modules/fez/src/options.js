var nopt = require("nopt");

function getOptions() {
  var options = nopt({
    "verbose": Boolean,
    "quiet": Boolean,
    "clean": Boolean,
    "dot": Boolean
  }, {
    "v": "--verbose",
    "q": "--quiet",
    "c": "--clean"
  });

  if(options.dot) options.quiet = true;

  return options;
}

module.exports = getOptions;

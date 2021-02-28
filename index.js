var Applause = require('applause');

module.exports = function (options) {
  return function (inputs) {
    var ps = [];
    inputs.forEach(function (input) {
      ps.push(input.asBuffer());
    });
    var applause = Applause.create(options);
    return Promise.all(ps).then(function (buffers) {
      return buffers.map(function (buf) {
        var content = buf.toString();
        var result = applause.replace(content).content;
        if (result === false) {
          // No replacements
          return content;
        }

        return result;
      }).join('');
    });
  };
};


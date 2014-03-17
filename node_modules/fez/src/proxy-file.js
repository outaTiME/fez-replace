function ProxyFile() { }

ProxyFile.prototype._setFile = function(lazy) {
  this._lazy = lazy;
};

ProxyFile.prototype._inspect = function() {
  if(this._lazy === undefined) throw new Error("Can't call inspect_() outside of a lazy function");
  return this._lazy;
};

ProxyFile.prototype.map = function(fn) {
  return function() {
    return fn(this._inspect());
  }.bind(this);
};

ProxyFile.prototype.mapName = function(fn) {
  return function() {
    return fn(this._inspect().getFilename());
  }.bind(this);
};

ProxyFile.prototype.patsubst = function(pattern, replacement) {
  return this.mapName(patsubst.bind(this, pattern, replacement));
};

function ProxyFileList() { }

ProxyFileList.prototype.names = function() {
  return this._lazies.getFilenames();
};

exports.ProxyFile = ProxyFile;
exports.ProxyFileList = ProxyFileList;

function patsubst(pattern, replacement, string) {
  var regex = new RegExp(pattern.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1").replace("%", "(.+)")),
      result = regex.exec(string),
      sub = result[1],
      out = replacement.replace("%", sub);

  return out;
}

var Promise = require("bluebird"),
    fs = require("fs");

function LazyFileList(context) {
  this._filenames = Promise.defer();
}

LazyFileList.prototype.getFilenames = function() {
  return this._filenames.promise;
};

LazyFileList.prototype._setFilenames = function(filenames) {
  this._filenames.resolve(filenames);
};

function LazyFile(context, filename) {
  this._filename = filename;
  this._asBuffer = Promise.defer();
}

LazyFile.prototype._loadFile = function(filename) {
  if(filename)
    this._setFilename(filename);

  fs.readFile(this.getFilename(), function(err, data) {
    if(err) this._asBuffer.reject(err);
    else this._asBuffer.resolve(data);
  }.bind(this));
};

LazyFile.prototype.getFilename = function() {
  return this._filename;
};

LazyFile.prototype.asBuffer = function() {
  return this._asBuffer.promise;
};

exports.LazyFile = LazyFile;
exports.LazyFileList = LazyFileList;

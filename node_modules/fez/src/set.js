//A very simple set. Fix this pretty quickly, as it will be a performance hit.
function Set(id) {
  if(id === undefined)
    id = function(el) {
      return el.id;
    };

  this._id = id;
  this._set = {};

  Object.defineProperty(this._set, "length", {value : 0,
                                             writable : true,
                                             configurable : false,
                                             enumerable : false});

  
}

Set.prototype.insert = function(el) {
  if (this._id(el) === undefined) return false;
  if(!this.exists(el)) {
    this._set[this._id(el)] = el;
    this._set.length += 1;
    return true;
  }
  return false;
};

Set.prototype.remove = function(el) {
  if(this.exists(el)) {
    delete this._set[this._id(el)];
    this._set.length -= 1;
    return true;
  }

  return false;
};

Set.prototype.exists = function(el) {
  // This works even if the value is explicitly undefined like {name: undefined}
  return (this._id(el) in this._set);
};

Set.prototype.array = function() {
  var array = [];
  for (var key in this._set) {
    array.push(this._set[key]);
  }
  return array;
};

Set.prototype.clone = function() {
  var other = new Set(this._id);
  for (var key in this._set)
    other._set[key] = this._set[key];
  
  return other;
};

Set.prototype.length = function () {
  return this._set.length;
}

module.exports = Set;

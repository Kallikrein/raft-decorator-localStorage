# Raft localStorage Methods
```javascript

```

**WARNING**
These methods are not production ready, most behaviour in error-prone situation are either undefined or clearly app-breaking.

Instance methods :

- [load](#load)
- [save](#save)

Collections instance expose :

- [load](#load-1)
- [save](#save-1)

##Default instance methods

###load
```javascript
Class.prototype.load = function () {
	var _key = (this.id)
		? [model.prefix, '/', this.id()].join('')
		: model.prefix;
	console.log(_key);
	var _str = localStorage.getItem(_key);
	var _obj = {};
	if (_str != null)
		_obj = JSON.parse(_str);
	console.log(_obj);
	this.update(_obj);
	return this;
};
```

The object to load must either have an id attributes or aliasing id with another. (see [here](https://github.com/Kallikrein/raft/blob/master/docs/MODEL.md#id)).

If not, the key PREFIX/undefined will be loaded, or the app might break. Or it might not.

If the key doesn't exist in the localStorage, the object should not be modified.

###save
```javascript
Class.prototype.save = function () {
	var _str = this.toJSON();
	var _key = (this.id)
		? [model.prefix, '/', this.id()].join('')
		: model.prefix;
	localStorage.setItem(_key, _str);
	return this;
};
```
The object to save must either have an id attributes or aliasing id with another. (see [here](https://github.com/Kallikrein/raft/blob/master/docs/MODEL.md#id))

##Default collection methods

###load
```javascript
Collection.prototype.load = function () {
	this._objects.map(function (item) {
		item.load();
	});
	return this;
};
```
Iteratively loads every entry in the object array.

###save
```javascript
Collection.prototype.save = function () {
	this._objects.map(function (item) {
		item.save();
	});
	return this;
};
```
Iteratively saves every entry in the object array.
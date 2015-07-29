!function(env) {
	'use strict';
	if (typeof module != "undefined" && module !== null && module.exports) module.exports = raftLocal();
	else if (typeof define === "function" && define.amd) define(raftLocal);
	else env.raftLocal = raftLocal();

	function raftLocal(){
		/*  LIB  */
		/*! LIB !*/
		return {
			collection: function (inherits, constructor) {
				/*  COLLECTION INHERITAGE  */
				function Collection(constructor, value) {
					inherits.call(this, constructor, value);
				}
				//Collection.prototype = new inherits ();
				for (var element in inherits.prototype) {
					if ({}.toString.call(inherits.prototype[element]).slice(8, -1) == 'Function' )
						Collection.prototype[element] = inherits.prototype[element];
				}
				for (var element in inherits) {
					if ({}.toString.call(inherits[element]).slice(8, -1) == 'Function' )
						Collection[element] = inherits[element];
				}
				/*! COLLECTION INHERITAGE !*/
				/*  COLLECTION METHODS  */
				Collection.prototype.load = function () {
					this._objects.map(function (item) {
						item.load();
					});
					return this;
				};
				Collection.prototype.save = function () {
					this._objects.map(function (item) {
						item.save();
					});
					return this;
				};
				/*! COLLECTION METHODS !*/
				return Collection;
			},
			class: function (inherits, model) {
				/*  CLASS INHERITAGE  */
				function Class(value) {
					inherits.call(this, value);
				}
				//Class.prototype = new inherits ();
				for (var element in inherits.prototype) {
					if ({}.toString.call(inherits.prototype[element]).slice(8, -1) == 'Function' )
						Class.prototype[element] = inherits.prototype[element];
				}
				for (var element in inherits) {
					if ({}.toString.call(inherits[element]).slice(8, -1) == 'Function' )
						Class[element] = inherits[element];
				}
				/*! CLASS INHERITAGE !*/
				/*  CLASS METHODS  */
				Class.prototype.load = function () {
					var _key = (this.id) ? [model.prefix, '/', this.id()].join('') : model.prefix;
					console.log(_key);
					var _str = localStorage.getItem(_key);
					var _obj = {};
					if (_str != null)
						_obj = JSON.parse(_str);
					console.log(_obj);
					this.update(_obj);
					return this;
				};
				Class.prototype.save = function () {
					var _str = this.toJSON();
					var _key = (this.id) ? [model.prefix, '/', this.id()].join('') : model.prefix;
					localStorage.setItem(_key, _str);
					return this;
				};
				/*! CLASS METHODS !*/
				return Class;
			}
		};
	}
}(this);

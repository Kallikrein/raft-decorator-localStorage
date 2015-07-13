!function(env) {
	'use strict';
	if (typeof module != "undefined" && module !== null && module.exports) module.exports = raftLocal;
	else if (typeof define === "function" && define.amd) define(raftLocal);
	else env.raftLocal = raftLocal();

	function raftLocal(){

		return localStorageDecorator;

		function localStorageDecorator(model, Class) {
			Class.prototype.test = function () {
				console.log('test');
			};

			//class methods
			
			Class.get = function (id) {
				//returns a promise or an object ?

				//if the object is a singleton (id is not defined)
				var _key = (model.id && id) ? model.prefix + '/' + id : model.prefix;
				var _str = localStorage.getItem(_key);
				if (_str == null)
					return ;
				var _obj = JSON.parse(_str);
				return Class.create(_obj);
			};

			//instance methods
			Class.prototype.get = function (id) {

				var _key = id ? model.prefix + '/' + id :
					(model.id) ? model.prefix + '/' + this.id() : model.prefix;
				var _str = localStorage.getItem(_key);
				if (_str == null)
					return ;
				var _obj = JSON.parse(_str);
				this.update(obj);
			};

			Class.prototype.save = function () {
				var _str = this.toJSON();
				var _key = model.id ? model.prefix + '/' + this.id() : model.prefix;
				localStorage.setItem(_key, _str);
			}


			return Class;
		}
	}

}(this);
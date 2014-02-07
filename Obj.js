// Subscribe to changes on an object:
var Obj = (function() {
	var map = [],
		has = {}.hasOwnProperty;

	function Init(obj) {
		for (var key in obj) {
			if (has.call(obj, key)) this[key] = obj[key];
		}
	}

	function Obj(obj) {
		return new Init(obj);
	}

	Obj.fn = Init.prototype = {
		subscribe: function(fn, callNow) {
			for (var i = 0, l = map.length; i < l; i++) {
				if (map[i][0] === this) {
					map[i][1].push(fn);
					return;
				}
			}
			map.push([this, [fn]]);
			
			if (callNow) fn(this);
		},

		set: function(key, value) {
			this[key] = value;
			this.changed();
		},

		remove: function(key) {
			delete this[key];
			this.changed();
		},

		changed: function() {
			for (var i = 0, l = map.length; i < l; i++) {
				if (map[i][0] === this) {
					var subscribers = map[i][1],
						numSubscribers = subscribers.length;
					for (var j = 0; j < numSubscribers; j++) {
						subscribers[j](this);
					}
					return;
				}
			}
		}
	};

	return Obj;
})();

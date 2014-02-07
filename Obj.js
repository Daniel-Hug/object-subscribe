// Subscribe to changes on an object:
var Obj = (function(map) {
	var Obj = {
		getSubscribers: function(obj) {
			for (var i = 0, l = map.length; i < l; i++) {
				if (map[i][0] === obj) {
					return map[i][1];
				}
			}
		},

		subscribe: function(obj, fn, callNow) {
			var subscribers = Obj.getSubscribers(obj);
			if (subscribers) subscribers.push(fn);
			else map.push([obj, [fn]]);
			if (callNow) fn(obj);
		},

		set: function(obj, key, value) {
			obj[key] = value;
			Obj.changed(obj);
		},

		remove: function(obj, key) {
			delete obj[key];
			Obj.changed(obj);
		},

		changed: function(obj) {
			var subscribers = Obj.getSubscribers(obj),
				numSubscribers = subscribers.length;
			for (var j = 0; j < numSubscribers; j++) {
				subscribers[j](obj);
			}
		}
	};
	return Obj;
})([]);

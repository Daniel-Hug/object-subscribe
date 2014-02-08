// Subscribe to changes on an object:
var Obj = (function(map) {
	function getIndex(obj) {
		for (var i = 0, l = map.length; i < l; i++) {
			if (map[i][0] === obj) return i;
		}
		return -1;
	}

	return {
		subscribe: function(obj, fn, callNow) {
			var index = getIndex(obj);
			if (index === -1)  map.push([obj, [fn]]);
			else map[index][1].push(fn);
			if (callNow) fn(obj);
		},

		unsubscribe: function(obj, arr) {
			if (arr) {
				var subscribers = map[getIndex(obj)][1];
				for (var l = arr.length; l--;) subscribers.splice(subscribers.indexOf(arr[l]), 1);
			}
			else map.splice(getIndex(obj), 1);
		},

		set: function(obj, key, value) {
			obj[key] = value;
			Obj.changed(obj);
		},

		unset: function(obj, key) {
			delete obj[key];
			Obj.changed(obj);
		},

		changed: function(obj) {
			var index = getIndex(obj);
			if (index === -1) return;
			var subscribers = map[index][1],
				numSubscribers = subscribers.length;
			for (var j = 0; j < numSubscribers; j++) {
				subscribers[j](obj);
			}
		}
	};
})([]);

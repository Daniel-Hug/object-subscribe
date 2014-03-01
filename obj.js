// obj.js | Unobtrusive object subscribe
// https://github.com/Daniel-Hug/object-subscribe

(function (root, factory) {
	if (typeof define === 'function' && define.amd)
		define([], factory);
	else if (typeof exports === 'object')
		module.exports = factory();
	else root.Obj = factory();
})(this, function () {
	var map = [];

	// requires: map
	function getIndex(obj) {
		for (var i = 0, l = map.length; i < l; i++) {
			if (map[i][0] === obj) return i;
		}
		return -1;
	}

	return {
		has: function(obj, key) {
			return {}.hasOwnProperty.call(obj, key);
		},

		// requires: has
		keys: Object.keys || function(obj) {
			var keys = [];
			for (var key in obj) if (Obj.has(obj, key)) keys.push(key);
			return keys;
		},

		// requires: getIndex, map
		subscribe: function(obj, fn, callNow) {
			var mapIndex = getIndex(obj);
			if (mapIndex >= 0) map[mapIndex][1].push(fn);
			else map.push([obj, [fn]]);
			if (callNow) fn(obj);
		},

		// requires: getIndex, map
		unsubscribe: function(obj, arr) {
			var mapIndex = getIndex(obj), s, i;
			if (mapIndex >= 0) {
				if (arr) {
					s = map[mapIndex][1];
					if (s && s.length) for (i = arr.length; i--;) s.splice(s.indexOf(arr[i]), 1);
				}
				else map.splice(mapIndex, 1);
			}
		},

		// requires: has, changed
		set: function(obj, pairs) {
			for (var key in pairs) if (Obj.has(pairs, key)) obj[key] = pairs[key];
			Obj.changed(obj);
		},

		// requires: changed
		unset: function(obj, keys) {
			for (var i = keys.length; i--;) delete obj[keys[i]];
			Obj.changed(obj);
		},

		// requires: has, set, changed
		reset: function(obj, pairs) {
			for (var key in obj) if (Obj.has(obj, key)) delete obj[key];
			Obj.set(obj, pairs);
		},

		// requires: getIndex, map
		changed: function(obj) {
			var mapIndex = getIndex(obj), i;
			if (mapIndex >= 0) {
				var subscribers = map[mapIndex][1],
				numSubscribers = subscribers.length;
				for (i = 0; i < numSubscribers; i++) {
					subscribers[i](obj);
				}
			}
		}
	};
});

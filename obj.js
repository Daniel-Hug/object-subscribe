// obj.js | Unobtrusive object subscribe
// https://github.com/Daniel-Hug/object-subscribe

(function (root, factory) {
	if (typeof define === 'function' && define.amd)
		define([], factory);
	else if (typeof exports === 'object')
		module.exports = factory();
	else root.Obj = factory();
})(this, function () {
	var map = [],
	Obj = {};

	// requires: map
	function getIndex(obj) {
		for (var i = 0, l = map.length; i < l; i++) {
			if (map[i][0] === obj) return i;
		}
		return -1;
	}

	Obj.has = function(obj, key) {
		return Obj.hasOwnProperty.call(obj, key);
	};

	// requires: has
	Obj.keys = Object.keys || function(obj) {
		var keys = [];
		for (var key in obj) if (Obj.has(obj, key)) keys.push(key);
		return keys;
	};

	Obj.type = function(obj) {
		return Obj.toString.call(obj).slice(8,-1).toLowerCase();
	};

	// requires: has, type, extend
	Obj.extend = function(obj, newObj) {
		if (typeof obj === 'object') {
			if (Obj.type(obj) === 'array') {
				newObj = newObj || [];
				for (var i = 0, l = obj.length; i < l; i++) newObj.push(Obj.extend(obj[i]));
			} else {
				newObj = newObj || {};
				for (var key in obj) if (Obj.has(obj, key))
					newObj[key] = Obj.extend(obj[key]);
			}
		} else return obj;
		return newObj;
	};

	// requires: getIndex, map
	Obj.subscribe = function(obj, fn, callNow) {
		var mapIndex = getIndex(obj);
		if (mapIndex >= 0) map[mapIndex][1].push(fn);
		else map.push([obj, [fn]]);
		if (callNow) fn(obj);
	};

	// requires: getIndex, map
	Obj.unsubscribe = function(obj, arr) {
		var mapIndex = getIndex(obj), s, i;
		if (mapIndex >= 0) {
			if (arr) {
				s = map[mapIndex][1];
				if (s && s.length) for (i = arr.length; i--;) s.splice(s.indexOf(arr[i]), 1);
			}
			else map.splice(mapIndex, 1);
		}
	};

	// requires: has, changed
	Obj.set = function(obj, pairs, notify) {
		for (var key in pairs) if (Obj.has(pairs, key)) obj[key] = pairs[key];
		if (notify !== false) Obj.changed(obj, {set: pairs});
	};

	// requires: changed
	Obj.unset = function(obj, keys, notify) {
		for (var i = keys.length; i--;) delete obj[keys[i]];
		if (notify !== false) Obj.changed(obj, {unset: keys});
	};

	// requires: has, set, changed
	Obj.reset = function(obj, pairs, notify) {
		for (var key in obj) if (Obj.has(obj, key)) delete obj[key];
		Obj.set(obj, pairs, false);
		if (notify !== false) Obj.changed(obj, {reset: pairs || {}});
	};

	// requires: getIndex, map
	Obj.changed = function(obj, whatChanged) {
		var mapIndex = getIndex(obj);
		if (mapIndex >= 0) {
			var subscribers = map[mapIndex][1],
			numSubscribers = subscribers.length;
			for (var i = 0; i < numSubscribers; i++) {
				subscribers[i](obj, whatChanged);
			}
		}
	};

	return Obj;
});

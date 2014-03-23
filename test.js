var Obj = require('./obj.js');

var ObjProps = [
	'has',
	'keys',
	'type',
	'extend',
	'subscribe',
	'unsubscribe',
	'set',
	'unset',
	'reset',
	'changed'
];

var testObj = {
	name: 'Daniel',
	age: 17
};


// has
console.assert(
	Obj.has(Obj, 'has'),
	'Obj.has is not working'
);


// keys
console.assert(
	JSON.stringify(Obj.keys(Obj)) === JSON.stringify(ObjProps),
	'Obj.keys(Obj) returns unexpected value'
);


// type
console.assert(
	Obj.type([]) === 'array',
	'Obj.type([]) is not "array"'
);


// extend
console.assert(
	Obj.extend(testObj) !== testObj,
	'Obj.extend is not working'
);


// subscribe & unsubscribe
var i = 0;
Obj.subscribe(testObj, function(newObj) {
	console.assert(
		++i === 1 && newObj === testObj,
	'Obj.subscribe and/or Obj.unsubscribe is not working'
	);
}, true);

Obj.unsubscribe(testObj);


// set
Obj.set(testObj, {
	height: 5
});
console.assert(testObj.height === 5, 'Obj.set is not working');


// unset
Obj.unset(testObj, ['height']);
console.assert(testObj.height === undefined, 'Obj.unset is not working');


// reset
Obj.reset(testObj, {color: 'red'});
console.assert(
	JSON.stringify(testObj) === JSON.stringify({color: 'red'}),
	'Obj.reset is not working'
);


// changed
Obj.subscribe(testObj, function(newObj) {
	console.assert(
		newObj.color === 'green',
		'Obj.changed is not working'
	);
});

testObj.color = 'green';
Obj.changed(testObj);
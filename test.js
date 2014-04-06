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

var numPassed = 0;
var numFailed = 0;
function assert(bool, msg) {
	console.log((bool ? 'Pass' : 'Fail') + ': ' + msg);
	if (bool) numPassed++;
	else numFailed++;
}


// has
assert(
	Obj.has(Obj, 'has'),
	'Obj.has works'
);


// keys
assert(
	JSON.stringify(Obj.keys(Obj)) === JSON.stringify(ObjProps),
	'Obj.keys(Obj) returns expected value'
);


// type
assert(
	Obj.type([]) === 'array',
	'Obj.type([]) is "array"'
);


// extend
assert(
	Obj.extend(testObj) !== testObj,
	'Obj.extend works'
);


// subscribe & unsubscribe
var i = 0;
Obj.subscribe(testObj, function(newObj) {
	assert(
		++i === 1 && newObj === testObj,
	'Obj.subscribe and Obj.unsubscribe work'
	);
}, true);

Obj.unsubscribe(testObj);


// set
Obj.set(testObj, {
	height: 5
});
assert(testObj.height === 5, 'Obj.set works');


// unset
Obj.unset(testObj, ['height']);
assert(testObj.height === undefined, 'Obj.unset works');


// reset
Obj.reset(testObj, {color: 'red'});
assert(
	JSON.stringify(testObj) === JSON.stringify({color: 'red'}),
	'Obj.reset works'
);


// changed
Obj.subscribe(testObj, function(newObj) {
	assert(
		newObj.color === 'green',
		'Obj.changed works'
	);
});

testObj.color = 'green';
Obj.changed(testObj);


// Closing message:
var numCompleted = numPassed + numFailed;
console.log('%d assertions completed. %d passed, and %d failed.', numCompleted, numPassed, numFailed);
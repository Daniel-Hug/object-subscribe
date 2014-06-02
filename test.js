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

var test = {};


// has
test['Obj.has'] = !!Obj.has(Obj, 'has');

// keys
test['Obj.keys'] = JSON.stringify(Obj.keys(Obj)) === JSON.stringify(ObjProps);

// type
test['Obj.type([]) is "array"'] = Obj.type([]) === 'array';

// extend
test['Obj.extend'] = Obj.extend(testObj) !== testObj;

// subscribe & unsubscribe
var sub = 'Obj.subscribe';
var i = 0;
Obj.subscribe(testObj, function(newObj) {
	test[sub] = !!(++i === 1 && newObj === testObj);
}, true);
test[sub] = test[sub] || false;

Obj.unsubscribe(testObj);
Obj.changed(testObj);
test['Obj.unsubscribe'] = i === 1;

// set
var set = 'Obj.set listening';
Obj.subscribe(testObj, function(newObj, oldObj) {
	test[set] = newObj !== oldObj;
});
Obj.set(testObj, { height: 5 });
test[set] = test[set] || false;
Obj.unsubscribe(testObj);
test['Obj.set assignment'] = testObj.height === 5;
test[sub] = test[sub] || false;

// unset
var unset = 'Obj.unset listening';
Obj.subscribe(testObj, function(newObj, oldObj) {
	test[unset] = newObj !== oldObj;
});
Obj.unset(testObj, ['height']);
test[unset] = test[unset] || false;
Obj.unsubscribe(testObj);
test['Obj.unset assignment'] = testObj.height === undefined;

// reset
var reset = 'Obj.reset listening';
Obj.subscribe(testObj, function(newObj, oldObj) {
	test[reset] = newObj !== oldObj;
});
Obj.reset(testObj, {color: 'red'});
test[reset] = test[reset] || false;
Obj.unsubscribe(testObj);
test['Obj.reset assignment'] = JSON.stringify(testObj) === JSON.stringify({color: 'red'});

// changed
var cha = 'Obj.changed';
Obj.subscribe(testObj, function(newObj) {
	test[cha] = newObj.color === 'green';
});

testObj.color = 'green';
Obj.changed(testObj);
test[cha] = test[cha] || false;


// Closing message:
var stat = {
	complete: 0,
	pass: 0,
	fail: 0
};
for (var testName in test) {
	stat.complete++;
	stat[test[testName] ? 'pass' : 'fail']++;
	if (!test[testName]) console.log('test "%s" failed.', testName);
}
console.log('%d assertions completed. %d passed, and %d failed.', stat.complete, stat.pass, stat.fail);
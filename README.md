Obj.js
======

Subscribe to changes on an object

464 bytes minified, 278 bytes minified and gzipped


## Usage

Create an object:
```
var person = {
	name: 'Joey',
	age: 3
};
```

Subscribe to changes made to the object:
```
Obj.subscribe(person, function(newPersonObject) {
	console.log(newPersonObject);
}, true); // Pass true to execute callback now.
```

The callback passed to `Obj.subscribe` is called every time one of the following is called:

 - `Obj.set` e.g. `Obj.set(person, 'name', 'Bob')`
 - `Obj.remove` e.g. `Obj.remove(person, 'age')`
 - `Obj.changed` e.g. `person.age++; Obj.changed(person)`

You can also unsubscribe with `Obj.cutTies`:
```
Obj.cutTies(person); // Unsubscribe all
Obj.cutTies(person, [fn1, fn2]); // Unsubscribe one or more functions
```


## Add your own methods:

```
Obj.increment = function(obj, key) {
	obj[key]++;
	Obj.changed(obj); // Notify subscribers of change
};
Obj.increment(person, 'age');
```
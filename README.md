Obj.js
======

Subscribe to changes on an object


## Usage

Create an object:
```
var person = new Obj({
	name: 'Joey',
	age: 3
});
```

Subscribe to changes made to the object through the `set` and `remove` methods:
```
person.subscribe(function(newPersonObject) {
	console.log(newPersonObject);
}, true); // Pass true to execute callback now.
```

The callback passed to the `subscribe` method is called every time one of the following methods is called:

 - `set`
 - `remove`
 - `changed`

So you can call `person.set('name', 'Bob')`, and the callback will be called with the new object.


## Add your own methods:

```
Obj.fn.increment = function(key) {
	this[key]++;
	this.changed(); // notify subscribers of new change
};
person.increment('age');
```

Obj.js
======

Subscribe to changes on an object

800 bytes minified, 401 bytes minified and gzipped


## Create & subscribe to an object

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


## Modify the object

The callback passed to `Obj.subscribe` is called every time one of the following is called:

 - `Obj.set`
 - `Obj.unset`
 - `Obj.reset`
 - `Obj.changed`

Use those functions like this:
```
Obj.set(person, {age: 11, height: 50, favoriteColor: 'rainbow'});
	//=> {name: 'Joey', age: 11, height: 50, favoriteColor: 'rainbow'}

Obj.unset(person, ['favoriteColor']);
	//=> {name: 'Joey', age: 11, height: 50}

Obj.reset(person, {name: 'Bob', age: 6});
	//=> {name: 'Bob', age: 6}

person.age++;
Obj.changed(person);
	//=> {name: 'Bob', age: 7}
```


## Unsubscribe

```
Obj.unsubscribe(person); // Unsubscribe all
Obj.unsubscribe(person, [fn1, fn2]); // Unsubscribe one or more functions
```


## Helper functions

You also get two bonus helper functions. `Obj.has` for safe `hasOwnProperty` checks and `Obj.keys` which returns an array of an object's keys. `Obj.keys` uses the native `Object.keys` if available:
```
Obj.has(person, 'name');
Obj.keys(person);
```


## Customize

All the code is very modular, so you can easily delete the parts you don't use.

You can also add your own methods:
```
Obj.increment = function(obj, key) {
	obj[key]++;
	Obj.changed(obj); // Notify subscribers of change
};
Obj.increment(person, 'age');
```

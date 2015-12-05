# Evt

Evt is a small PubSub implementation in ES6.

Evt implements the following features: 

* Pass a 'this' context and arguments to subscribing functions
* Unsubscribe callbacks and evts
* Purge all registered events and callbacks
* ES6 compatible

## Usage 


```js
import Evt from './Evt.js'

let evt = new Evt();

/* Subscribe to 'MYEVT' - providing a callback to be called when the MYEVT event is published  */
evt.subscribe('MYEVT', function() {
    console.log('hello'); 
});

/* You can add as many subscribers as you need */
evt.subscribe('MYEVT', function() {
    console.log('hello again'); 
});

/* Publish 'MYEVT' */
evt.publish('MYEVT');

/* 
logs: 
hello 
hello again
*/

```

#### Subscribing with context

```js
import Evt from './Evt.js'

/* Create some object to be passed along as context */
let myClass = function () {}
myClass.prototype.aMethod = function() { console.log('hey') };
let myObj = new myClass();

let evt = new Evt();

/* Pass myObj along as the third argument. 
   The callback will get called, applied with myObj as a context */
evt.subscribe('MYEVT', function() {
    this.aMethod(); 
}, myObj);

/* Publish 'MYEVT' */
evt.publish('MYEVT');
/* logs: 'hey' */
```

#### Unsubscribing callbacks

```js
import Evt from './Evt.js'

let evt = new Evt();

/* Subscribe returns a unique id that points to the subscription */
let pointer = evt.subscribe('MYEVT', function() {});

/* Pass unsubscribe the pointer to unsubscribe the callback */
evt.unsubscribe(pointer);
```

#### Unsubscribing Events

```js
import Evt from './Evt.js'

let evt = new Evt();

evt.subscribe('MYEVT', function() {});

/* Provide name of event to unsubscribe all callbacks and reference to event */
evt.unsubscribe('MYEVT');
```

#### Purge

```js
import Evt from './Evt.js'

let evt = new Evt();

evt.subscribe('MYEVT', function() {});

/* Calling purge completely empties the evt instance of all callbacks and events */
evt.purge();
```

#### Logging
```js

/* Log out the evts object to see all registered events and callbacks */
console.log(evt.evts);
```

##Test

To run tests, first clone the repo and then run:

```
npm i
```

Followed by:

```
npm test
```


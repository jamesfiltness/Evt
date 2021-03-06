# Evt

Evt is a small PubSub implementation in ES6.

Evt implements the following features: 

* Pass a 'this' context when making subscriptions
* Pass arguments to subscribing functions when publishing
* Unsubscribe callbacks and evts
* Purge all registered events and callbacks
* ES6 compatible

## Usage 


```js
import Evt from './Evt.js'

const evt = new Evt();

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
class myClass() {
  aMethod() {
    console.log('hey');
  }
}

const myObj = new myClass();

const evt = new Evt();

/* Pass myObj along as the third argument. 
   The callback will get called, applied with myObj as a context */
evt.subscribe('MYEVT', function() {
    this.aMethod(); 
}, myObj);

/* Publish 'MYEVT' */
evt.publish('MYEVT');
/* logs: 'hey' */
```

#### Passing arguments to subscribing functions
```js
import Evt from './Evt.js'

const evt = new Evt();

/* Subscribe to 'MYEVT' - notice the function param */
evt.subscribe('MYEVT', function(myArg) {
    console.log(myArg); 
});

/* Publish 'MYEVT' - passing along an additional argument */
evt.publish('MYEVT', 'hey'); 
/* Logs 'hey' */
```


#### Unsubscribing callbacks

```js
import Evt from './Evt.js'

const evt = new Evt();

/* Subscribe returns a unique id that points to the subscription */
const pointer = evt.subscribe('MYEVT', function() {});

/* Pass unsubscribe the pointer to unsubscribe the callback */
evt.unsubscribe(pointer);
```

#### Unsubscribing Events

```js
import Evt from './Evt.js'

const evt = new Evt();

evt.subscribe('MYEVT', function() {});

/* Provide name of event to unsubscribe all callbacks and reference to event */
evt.unsubscribe('MYEVT');
```

#### Purge

```js
import Evt from './Evt.js'

const evt = new Evt();

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


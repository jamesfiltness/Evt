# Evt

Evt is a small PubSub implementation in ES6.

Evt implements the following features: 

* Pass a 'this' context and arguments to subscribing functions
* Unsubscribe callbacks and unsubscribe events plus all callbacks
* Purge all registered events and callbacks
* ES6 compatible

## Usage 

```js
import Evt from './Evt.js'

var evt = new Evt();

/* Subscribe to 'MYEVT' - providing a callback to be called when the MYEVT event is published  */
evt.subscribe('MYEVT', function() {
    console.log('hello'); 
});

/* You can add as many subscribers as you need */
evt.subscribe('MYEVT', function() {
    console.log('hello again'); 
});

/* publish 'MYEVT' */
evt.publish('MYEVT');

/* 
hello 
hello again
*/

```

#### Subscribing with context

```js
import Evt from './Evt.js'

var myClass = function () {}
myClass.prototype.aMethod = function() { console.log('hey') };
let myObj = new myClass();

var evt = new Evt();

/* Pass myObj along as the third argument.The callback will get called, applied with myObj as a context
evt.subscribe('MYEVT', function() {
    console.log(this.aMethod()); 
}, myObj);

/* publish 'MYEVT' */
evt.publish('MYEVT');
/* logs: 'hey' */
```

#### Unsubscribing callbacks

```js
import Evt from './Evt.js'

var evt = new Evt();

/* subscribe returns a unique id that points to the subscription
var pointer = evt.subscribe('MYEVT', function() {});

/* Pass unsubscribe the pointer */
evt.unsubscribe(pointer);
```

#### Unsubscribing Evts

```js
import Evt from './Evt.js'

var evt = new Evt();

evt.subscribe('MYEVT', function() {});

/* Provide name of event to unsubscribe all callbacks and reference to event */
evt.unsubscribe('MYEVT');
```

#### Purge

```js
import Evt from './Evt.js'

var evt = new Evt();

evt.subscribe('MYEVT', function() {});

/* calling purge completely empties the evt instance of all callbacks and events */
evt.purge();
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


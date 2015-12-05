# Evt

Evt is a small PubSub implementation in ES6.

Evt implements the following features: 

* Compatible with ES6 modules
* Pass a 'this' context and additional arguments to subscribing functions
* Unsubscribe callbacks and unsubscribe events + all callbacks
* Purge and Evt instance of all registered events and callbacks

## Usage 

```
import Evt from './Evt.js'

var evt = new Evt();
```

Documentation and examples to follow...

##Test

To run tests, first clone the repo and then run:

```
npm i
```

Followed by:

```
npm test
```


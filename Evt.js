/*
 Evt.js - Publish/Subscribe for Javascript
 http://evt.github.com
 Author: James Filtness 2015 (github: jamesfiltness)
*/

/**
 *
 * @Evt
 * Should be instantiated - i.e. let evts = new Evt()
 * Allows for context and arguments to be passed to the subscribing functions
*/
export default class Evt {
    /**
     *
     * @Evt - Creates a new instance of Ok
     * @constructor
     * @this {Evt}
     * Creates an empty evts object where all subscriptions will be held
     * Creats a uid which each subscription will be stored with - provides mechanism to unsubscribe
     *
    */
    constructor() {
        this.evts = {};
        this.uid = -1;  
    }
    
    /**
     *
     * @subscribe - subscribe a callback to an event - return a uid for unsubscribing
     * @method
     * @this {Evt}
     * @evt {string} the event that the callback is subscribing to - if the event does not exist the method defines it
     * @fn {function} the callback - to be called when the corresponding event is published
     * ctx {object} - an optional 'this' context can be supplied
     *
    */
    subscribe(evt, fn, ctx) {
        if (!this.evts.hasOwnProperty(evt)) {
              this.evts[evt] = {};
        }
        ctx ? this.evts[evt][++this.uid] = { fn: fn, ctx: ctx } : this.evts[evt][++this.uid] = fn;
        //return uid for unsubscribing
        return this.uid;
    }
    
    /**
     *
     * @unsubscribe - unsubscribe a callback
     * @method
     * @this {Evt}
     * @uid {number | string} if a number the subscribing callback is unsubscribed
     * If a string is provided then the corresponding evt itself is removed
     *
    */
    unsubscribe(uid) {
        let key;
        if('number' === typeof uid) {
            for(key in this.evts) {
                if(this.evts[key][uid]) {
                    this.evts[key][uid] = {};
                    delete this.evts[key][uid];
                }
            }
        } else if('string' === typeof uid) {
            this.evts[uid] = {};   
        }
    }

    /**
     *
     * @publish - call all subscribing callbacks, applying their context if defined and passing along additional params
     * @method
     * @this {Evt}
     * @params - first argument must be the event to be published, additional arguments are fed to the subscribing function as arguments
     *
    */
    publish() {
        let args = Array.from(arguments),
            evt = args[0],
            key;

        //remove the evt argument from the array of supplied args
        args.shift();
          
        if (this.evts.hasOwnProperty(evt)) {
            for (key in this.evts[evt]) {
                'object' === typeof this.evts[evt][key] 
                ? this.evts[evt][key].fn.apply(this.evts[evt][key].ctx, args) 
                : this.evts[evt][key].apply(null,args);
            }
        }
    }

    /**
     *
     * @purge - reset the Evt instance - remove all events and subscribing functions
     * @method
     * @this {Evt}
     *
    */
    purge() {
        this.evts = {};
    }
}
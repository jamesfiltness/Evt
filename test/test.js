require("babel-polyfill");
var chai = require('chai');
var sinon = require("sinon");
var sinonChai = require("sinon-chai");
var expect = chai.expect;
var assert = chai.assert;

import Evt from '../Evt.js';

describe('The Evt library', function() {
    let evt;
    
    beforeEach(function() {
        evt = new Evt();
    });
    
    describe('Constructor', function () {
        it('should create an empty evts object', function () {
            expect(evt.evts).to.be.an('object');
            expect(evt.evts).to.be.empty;
        });

        it('should create a uid variable set to 0', function () {
            expect(evt.uid).to.exist;
            expect(evt.uid).to.equal(-1);
        });
    });

    describe('The Subscribe method', function () {
         it('should create evt obj if it doesn\'t already exist', function () {
             evt.subscribe('MYEVT', function() {})
             expect(evt.evts.MYEVT).to.exist;
             expect(evt.evts.MYEVT).to.be.an('object');
         });

         it('should increment the uid when a new subscription is made', function () {
             evt.subscribe('MYEVT', function() {})
             expect(evt.uid).to.equal(0);
         });

         it('should register the callback function provided when a subscription is made', function () {
             evt.subscribe('MYEVT', function() {})
             expect(evt.evts.MYEVT[0]).to.be.an('function');
         });

          it('should register the callback provided when a subscription is made along with a ctx', function () {
             var someClass = function() {}
             someClass.prototype.myMethod = function() {}
             var myCtx = new someClass();

             evt.subscribe('MYEVT', function() {}, myCtx);
             expect(evt.evts.MYEVT[0].fn).to.be.defined;
             expect(evt.evts.MYEVT[0].fn).to.be.an('function');
             
         });

         it('should register the ctx provided when a subscription is made', function () {
             var someClass = function() {}
             someClass.prototype.myMethod = function() {}
             var myCtx = new someClass();

             evt.subscribe('MYEVT', function() {}, myCtx);
             expect(evt.evts.MYEVT[0].ctx.someClass).to.be.defined;
             expect(evt.evts.MYEVT[0].ctx).to.be.an('object');
             
         });

          it('should return the uid for unsubscribing', function () {
             var mysub = evt.subscribe('MYEVT', function() {});
             var mysub1 = evt.subscribe('MYEVT', function() {});
             expect(mysub).to.equal(0);
             expect(mysub1).to.equal(1);
          });
     });

     describe('The Unsubscribe method', function () {
         it('should unsubscribe the callback when a uid integer is supplied', function () {
             var mysub = evt.subscribe('MYEVT', function() {})
             expect(evt.evts.MYEVT[0]).to.be.defined;
             expect(evt.evts.MYEVT[0]).to.be.an('function');
             evt.unsubscribe(mysub)
             expect(evt.evts.MYEVT[0]).to.be.undefined;
         });

          it('should unsubscribe all subscribing callbacks if a string representing the event name is supplied', function () {
             evt.subscribe('MYEVT', function() {})
             evt.subscribe('MYEVT', function() {})
             expect(evt.evts.MYEVT[0]).to.be.defined;
             evt.unsubscribe('MYEVT')
             expect(evt.evts.MYEVT[0]).to.be.undefined;
             expect(evt.evts.MYEVT).to.be.empty;
         });
     });

      describe('The Publish method', function () {
          it('should call all subscribing callbacks when triggered', function () {
              var subscriber = sinon.spy()
              evt.subscribe('MYEVT', subscriber);
              evt.publish('MYEVT');
              expect(subscriber.called).to.be.true;
          });

          it('should only call callbacks registered with the published event', function () {
              var subscriber = sinon.spy()
              var subscriber1 = sinon.spy()
              evt.subscribe('MYEVT', subscriber);
              evt.subscribe('MYEVT1', subscriber1);

              evt.publish('MYEVT');
              expect(subscriber1.called).to.be.false;
          });

         it('should pass on all provided arguments to subscribing functions', function () {
             var subscriber = sinon.spy()
             evt.subscribe('MYEVT', subscriber);
             evt.publish('MYEVT', 1,2,3);
             expect(subscriber.calledWith(1,2,3)).to.be.true;
         });

          it('should apply subscribing functions with a context - if provided', function () {
             var subscriber = sinon.spy()
             var someClass = function() {}
             someClass.prototype.myMethod = function() {}
             var myCtx = new someClass();

             evt.subscribe('MYEVT', subscriber, myCtx);
             evt.publish('MYEVT');
             expect(subscriber.someClass).to.be.defined;
          }); 
     });

     describe('The Purge method', function () {

         it('should empty the evts object', function () {
             evt.subscribe('MYEVT', function() {})
             evt.purge();
             expect(evt.evts.MYEVT).to.be.undefined;
             expect(evt.evts).to.be.empty;
         });

         it('previously registered callbacks should now not be called', function () {
             var subscriber = sinon.spy()
             evt.subscribe('MYEVT', subscriber)
             evt.purge();
             var i = evt.publish('MYEVT');
             expect(subscriber.called).to.be.false;
         }); 
     });



});

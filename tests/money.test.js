import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import { assert } from 'chai';
import { Money } from '../imports/api/moneym';

 
if (Meteor.isServer) {

    describe('Money', () => {

        describe('methods', () => {

            const userId = Random.id();
            let moneyId;
            beforeEach(() => {

                Money.remove({});
        
                 moneyId = Money.insert({
        
                  text: 'test money',
        
                  createdAt: new Date(),
        
                  owner: userId,
        
                  username: 'tmeasday',
        
                });
        
              });
            it('can delete owned money', () => {
                const deleteTask = Meteor.server.method_handlers['money.remove'];
                const invocation = { userId };
                deleteTask.apply(invocation, [moneyId]);        
                assert.equal(Money.find({}).count(), 0);

            });

        });

    });

} 
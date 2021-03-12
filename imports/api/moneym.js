import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Money = new Mongo.Collection('money');

if (Meteor.isServer) {

    Meteor.publish('money', function moneyPublication() {
      return Money.find({},{ owner: this.userId });
    });

  }

Meteor.methods({

    'money.insert'(text1,text2,text3,text4,ltype,text5,text6,ad) {
  
      check(text1, String);
      check(text2, String);
      check(text3, String);
      check(text4, String);
      check(ltype, String);  
      check(text5, String);
      check(text6, String);
      check(ad, String);
      if (! this.userId) {
        throw new Meteor.Error('not-authorized');
      }
  
      Money.insert({
        text1,
        text2,
        text3,
        text4,
        ltype,
        text5,
        text6,
        ad,
        createdAt: new Date(),
        owner: this.userId,
        email: Meteor.users.findOne(this.userId).email,
  
      });
  
    },
  
    // 'money.remove'(moneyId) {
  
    //   check(moneyId, String);  
    //   Money.remove(moneyId);
  
    // },
  
  });
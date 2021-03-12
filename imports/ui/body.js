import { Template } from 'meteor/templating';
import { Money } from '../api/moneym.js';
import './body.html';

var temp ;
var flag = 0;
Template.body.onCreated(function bodyOnCreated() {
  Meteor.subscribe('money');
});
Template.body.helpers({
    showBorrower() {
      return Session.get('showBorrower');
    },
    showLender() {
      return Session.get('showLender');
    },
    showAdmin() {
      return Session.get('showAdmin');
    },
  });
  Template.adm.helpers({
    admin()
      {
        return Money.find({},{ sort: { createdAt: -1} });
      },
  });
  Template.lending.helpers({
    isOwner() {
     // console.log(Meteor.userId());
      return this.owner === Meteor.userId();
    },
    lend()
      {
        return temp;
      },
      t1()
      {
        return flag===0;
      },
    pastpayments()
    {
      return Money.find({},{ sort: { createdAt: -1} });
    }
  });
  Template.borrowing.helpers({
    isOwner() {
      return this.owner === Meteor.userId();
    },
    pastloans()
    {
      return Money.find({},{ sort: { createdAt: -1} });
    }
  });
  Template.borrowing.events({
    'click .b'() {
      alert('Details for Borrowing the loan Submitted Successfully');
      Session.set('showBorrower', false);
    },
    'submit .Borr'(event)
    {
      event.preventDefault();
      flag = 1;
      const target = event.target;
      const text1 = target.t1.value;
      const text2 = target.t2.value;
      const text3 = target.t3.value;
      const text4 = "Borrower";
      const ltype = target.drp.value;
      temp =
        {
          text1 : text1,
         text2 : text2,
           text3 : text3,
           text4 : text4,
          ltype : ltype,
         
        }
  
    },
  });
 
  Template.lending.events({
    'click .c'() {
      alert('Details for Lending the loan Submitted Successfully');
      Session.set('showLender', false);
    },
    'click .a'() {
      alert('OK Clicked');
      Session.set('showLender', false);
    },
    'submit .Len'(event)
    {
      event.preventDefault();
      const text5 = event.target.t5.value;
      const text6 = "Lender";
      const ad = event.target.ddown.value;
      if(ad=="Accept")
      {
        flag = 0;
        Meteor.call('money.insert', temp.text1,temp.text2,temp.text3,temp.text4,temp.ltype,text5,text6,ad);
        // Money.insert({
        //   text1 : temp.text1,
        //   text2 : temp.text2,
        //   text3 : temp.text3,
        //   text4 : temp.text4,
        //   ltype : temp.ltype,
        //   text5 : text5,
        //   text6 : text6,
        //   ad : ad,
        //   createdAt: new Date(), 
        // });
      }
  }

  });
  Template.adm.events({
    'click .e'() {
      alert('You Clicked OK');
      Session.set('showAdmin', false);
    },
  });
  Template.form.events({
    'click .Borrower'() {
      alert('You Logged in as Borrower');
      Session.set('showBorrower', true);
    },
    'click .Lender'() {
      alert('You Logged in as Lender');
      // Session.set('showField',false);
      Session.set('showLender', true);
    },
    'click .Admin'() {
      alert('You Logged in as Admin');
      Session.set('showAdmin', true);
    },
  });
  

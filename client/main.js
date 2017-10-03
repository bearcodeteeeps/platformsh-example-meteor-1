import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import { Users } from '../imports/api/users.js';

import './main.html';

Template.users.helpers({
  users() {
    return Users.find({});
  }
});

Template.userForm.events({
  'submit .new-user'(event) {
    // Prevent default browser form submit
    event.preventDefault();

    // Get value from form element
    const target = event.target;
    const name = target.name.value;
    const email = target.email.value;

    // Insert a task into the collection
    Users.insert({
      name,
      email,
      createdAt: new Date(), // current time
    });

    // Clear form
    target.name.value = '';
    target.email.value = '';
  }
});

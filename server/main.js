import { Meteor } from 'meteor/meteor';
import shortid from 'shortid';
import SimpleSchema from 'simpl-schema';
import { Accounts } from 'meteor/accounts-base';

import { Dashboards } from '../imports/collections/dashboards';

import '../imports/startup/simple-schema-configuration.js';

Meteor.startup(() => {
  Accounts.validateNewUser((user) => {
  const email = user.emails[0].address;

    new SimpleSchema({
      email: {
        type: String,
        regEx: SimpleSchema.RegEx.Email
      }
    }).validate({ email });

    return true;
  });

  Meteor.publish('dashboards', function () {
    return Dashboards.find({ userId: this.userId }, { sort: { createdAt: 1 } });
  });
  Meteor.publish('singleDashboard', function (_id) {
    return Dashboards.find({ userId: this.userId, _id });
  });

  Meteor.methods({
    'dashboard.add_new'(name) {
      if (!this.userId) {
        throw new Meteor.Error('not-authorized');
      }
      if(!name || typeof name !== 'string') {
        return;
      }
      Dashboards.insert({
        name,
        userId: this.userId,
        createdAt: new Date().getTime()
      });
    },
    'dashboard.delete'(_id) {
      if (!this.userId) {
        throw new Meteor.Error('not-authorized');
      }
      Dashboards.remove({
        _id,
        userId: this.userId
      });
    },
    'dashboard.add_item'(newItem, listId, _id) {
      if (!this.userId) {
        throw new Meteor.Error('not-authorized');
      }
      if(!newItem.content || typeof newItem.content !== 'string') {
        return;
      }
      Dashboards.update({ userId: this.userId, _id },
        {
          $push: {
            items: {
              id: shortid.generate(),
              ...newItem,
              status: listId
            }
          }
        }
      );
    },
    'dashboard.remove_item'(itemId, _id) {
      if (!this.userId) {
        throw new Meteor.Error('not-authorized');
      }
      Dashboards.update({ userId: this.userId, _id },
        {
          $pull: {
            items: {
              id: itemId
            }
          }
        }
      );
    },
    'dashboard.update_items'(items, _id) {
      if (!this.userId) {
        throw new Meteor.Error('not-authorized');
      }
      Dashboards.update({ userId: this.userId, _id },
        {
          $set: {
            items
          }
        }
      );
    },
    'dashboard.edit_item'(id, content, _id) {
      if (!this.userId) {
        throw new Meteor.Error('not-authorized');
      }
      if(!content || typeof content !== 'string') {
        return;
      }
      Dashboards.update({ userId: this.userId, _id, 'items.id': id},
        {
          $set: {
            'items.$.content': content
          }
        }
      );
    }
  });
});

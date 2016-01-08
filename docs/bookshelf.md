# Bookshelf

More information regarding the use of Bookshelf.

[Back to home page](../README.md)


## Define model

`models/<model>.js`

    var services = require('../services');
    var checkit = require('checkit');

    module.exports = services.bookshelf.Model.extend({
      tableName: 'ninecms_node',
      hasTimestamps: ['created_at', 'updated_at']
    });


## Validations

Add in `extend`:

      initialize: function(attrs, opts) {
        this.on('saving', this.validateSave);
      },
      validateSave: function() {
        return new checkit({
          title: 'required'
          // etc
        }).run(this.attributes);
      }

More on [available validators](https://github.com/tgriesser/checkit#advanced--custom-validators)


## Define relationships


### One to One

Given two models `user`, `profile`, with the latter having a FK `profile.user_id` to the former:

`models/profile.js`:

    var user = require('./user');

      // ..
      user: function() {
        return this.belongsTo(user, 'user_id');
      },

`models/user.js`:

    var profile = require('./profile');

      // ..
      profile: function() {
        return this.hasOne(profile, 'user_id');
      },

### One to Many

Given two models `profile`, `email` with the latter having a FK `email.profile_id` to the former:

`models/email.js`:

    var profile = require('./profile');

      // ..
      profile: function() {
        return this.belongsTo(profile, 'profile_id');
      },

`models/profile.js`:

    var email = require('./email');

      // ..
      emails: function() {
        return this.hasMany(email, 'profile_id');
      },


### Many to Many

Given two models `profile`, `tag` and an intermediate model `profile_tags` having 2 FKs,
`profile_tags.profile_id` and `profile_tags.tag_id`:

`models/profile_tags.js`:

    var profile = require('./profile');
    var tag = require('./tag');

      // ..
      profile: function() {
        return this.belongsTo(profile, 'profile_id');
      },
      tag: function() {
        return this.belongsTo(tag, 'tag_id');
      },

`models/profile.js`:

    var tag = require('./tag');
    var profileTags = require('./profile_tags');

      // ..
      profileTags: function() {
        return this.belongsToMany(tag).through(profileTags, 'tag_id', 'profile_id');
      },

`models/tag.js`:

    var profile = require('./profile');
    var profileTags = require('./profile_tags');

      // ..
      profileTags: function() {
        return this.belongsToMany(profile).through(profileTags, 'profile_id', 'tag_id');
      },


## Querying

Given a model `node`:

    var models  = require('../models');

    models.node
      .where('alias', '/')
      .fetch({require: true})
      .then(function(node) {
        console.log(node);
        res.render('index', { node: node });
      }).catch(function(err) {
        console.error(err);
      });

Oddly enough, Bookshelf does not support `order by`.
A knex query needs to be used directly.
Therefore the above would become:

    models.node
      .query({
        where: {alias: '/'},
        orderBy: 'language'
      })
      .fetch({require: true})
      // ..

But the above supports only a single (!) `orderBy`. For more:

    models.node
      .query(function(q) {
        q.where('alias', '/')
          .orderBy('language', 'desc')
          .orderBy('id');
      })
      .fetch({require: true})
      // ..

The object's attributes are available under `node.attributes`.


## Querying relationships

For two given models `node` and `nodeType`.


### Using `withRelated`

The standard way is to use `withRelated`, **but this adds an extra query upon fetching**,
like `prefetch_related` of Django. **It does not perform a join**.

    models.node
      .where('alias', '/')
      .fetch({require: true, withRelated: 'nodeType'})
      .then(function(node) {
        console.log(node.relations.pageType.attributes.type_name);
        res.render('index', { node: node });
      });


### Using knex joins

Apparently there is no other way to have bookshelf automatically build a join,
such as Django's `select_related` provides. Rather provide a join manually.

    models.node
      .query(function(q) {
        q
          .select('*', 'node_type.type_name')
          .innerJoin('node_type')
          .where('alias', '/');
      })
      .fetch()
      .then(function(node) {
        console.log(node.attributes.type_name);
        res.render('index', { node: node });
      });

Since this is more complicated and in larger projects may lead to much more complexity,
use where the number of queries matter.

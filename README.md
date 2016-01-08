# express-experiment


Learning express.js for people coming from Django or Rails background.


## Summary

I am a Django dev. I highly value Django for many of its features. But there are some things that really feel old.
One of my recent despairs was with wsgi. So I thought to take a look once more on node.js fresh.
Aside from the fact that another tech which I really love, angular, must really benefit from node.
Some early [conclusions at the end of the document](#conclusions).

### Desired technologies

I have decided to use the following technologies in order to cover existing Django functionality.
The remaining document is structured on this, where it is covered why the particular technology has
been selected.

- [Nodejs](#node)
- [Express](#express)
- [Bookshelf](#bookshelf) (ORM)
- [Jade](#jade) (templates)
- [Bower](#bower) (asset management)
- [Angular](#angular)
- [Less](#less) (css preprocessor)
- [Passport](#passport) (user auth)

Other topics:

- [Deployment](#deployment)
- [IDE](#ide)


## Node

[Install on Ubuntu](http://stackoverflow.com/questions/25823131/node-http-server-not-working):

    sudo apt-get install nodejs npm

Or use nvm as described in [deployment section](#deployment).

Useful links

- [Node.js](https://nodejs.org/en/)
- [Loading modules](https://nodejs.org/dist/latest-v4.x/docs/api/modules.html#modules_modules)
- [Style guide](http://nodeguide.com/style.html)


## Express

Nodejs favorite unopinionated framework

Useful links

- [Express.js](http://expressjs.com/)
- [Tutorial](http://expressjs.com/en/starter/installing.html)
- [Promises](http://bluebirdjs.com/docs/api-reference.html)
- [What does `./bin/www` do](http://stackoverflow.com/questions/23169941/what-does-bin-www-do-in-express-4-x)


## Bookshelf

[Bookshelf](http://bookshelfjs.org/) is the preferred ORM with many features
that resemble the functionality of Django or Rails.
Migrations is a very important feature for well-maintained apps and Bookshelf is thriving in that.

Other ORM possibilities include Sequelize, ORM2 and Waterline.
Sequelize is the most common. Unfortunately, there are major shortages in documentation and many features
including migrations are just not natural enough, at least for someone coming from Django or Rails.
ORM2 does not offer migrations at all. Waterline offers some migration functionality but
it seems like it is trying to do too much magic with many different db possibilities and
it ends up using the lowest common denominator.
Some critique [here](https://kev.inburke.com/kevin/dont-use-sails-or-waterline/).

### Guide

    npm install -S bookshelf knex sqlite3 checkit moment
    node_modules/.bin/knex init

The last one creates a `knexfile.js`, which needs to be updated with connection settings.
Then add a directory `services\` and files `index.js` and `bookshelf.js`.
Initialisation happens in bookshelf.

Then create a subdirectory `migrations` and run

    node_modules/.bin/knex migrate:make user

Edit the newly created file in migrations and then:

    node_modules/.bin/knex migrate:latest

Then create the routes and views in `routes/index.js` and `views/`.

Notice: Bookshelf should be initialised once, if console logs more than one init then move require to app.js.

### Migrations

Chaining schema definition functions [should be ok](https://github.com/tgriesser/knex/issues/245#issuecomment-40743838).
However [another issue](https://github.com/tgriesser/knex/issues/993) suggests to use promises instead;
use this if simple migrations do not work.
Also, [another post](http://stackoverflow.com/questions/22624879/how-to-do-knex-js-migrations) suggests to
reduce the pool size.

Useful links

- [Bookshelf](http://bookshelfjs.org/)
- [Tutorial](http://davidhunt.io/making-a-new-node-js-app-feel-more-like-rails-part-1)
- [CRUD examples](http://blog.ragingflame.co.za/2014/12/16/building-a-simple-api-with-express-and-bookshelfjs)
- **[More on bookshelf](docs/bookshelf.md)**


## Jade

Express uses [Jade](http://jade-lang.com/reference/). Other possibilities:

- [Nunjucks](https://mozilla.github.io/nunjucks/templating.html) (Jinja2 in node)
- [Handlebars](http://handlebarsjs.com/)
- [Underscore](http://documentcloud.github.io/underscore/)
- [More...](https://www.quora.com/What-is-the-best-Node-js-template-engine)


## Bower

Great utility that manages assets.

    npm install bower
    node_modules/.bin/bower init
    node_modules/.bin/bower install

Scripts can be used as:

    <script src="bower_components/jquery/dist/jquery.min.js"></script>

The first main advantage of bower is asset version management. This is worth against possible cdn speed gains
(see [this thread](https://laracasts.com/forum/?p=2238-bower-or-cdn-for-production/0),
[this post by Steve Souders](http://www.stevesouders.com/blog/2013/03/18/http-archive-jquery/) and
[this post](http://statichtml.com/2011/google-ajax-libraries-caching.html)).

Besides, `grunt-cdnify` could be used to change all bower references to cdn, but it has got issues as
[this one](http://stackoverflow.com/questions/21661289/grunt-cdnify-does-not-cndify-the-files).

Furthermore, utilities such as [`grunt-bower-requirejs`](https://github.com/yeoman/grunt-bower-requirejs)
can be used to combine bower with [RequireJS](http://requirejs.org/docs/start.html), which is great
for async loading of scripts.
Additionally, RequireJS has an [optimisation feature](http://requirejs.org/docs/optimization.html) available.

Useful links

- http://bower.io/
- http://stackoverflow.com/questions/21821773/configure-node-express-to-serve-static-bower-components


## Angular

Replaced `views/index.jade` records and form with angular directives and added `javascripts/controller.js`.
Modified `routes/user.js` to return json.

Useful links

- [Angular tutorial](https://code.angularjs.org/1.4.8/docs/tutorial/step_00)
- [Tutorial repo](https://github.com/angular/angular-phonecat)
- [Angular in express](http://briantford.com/blog/angular-express)


## Less

Using the [Less](http://lesscss.org/) css preprocessor is very easy with node,
and helps deal with css maintenance a lot.

    npm install -S less-middleware

Then in `app.js` add:

    app.use(require('less-middleware')(path.join(__dirname, 'public')));


## Other important modules (not yet implemented)

### Csurf

:warning: CSRF protection module.

Useful links

- https://www.npmjs.com/package/csurf
- http://expressjs.com/en/advanced/best-practice-security.html

### Passport

Authentication middleware. Express does not have anything like Django or
Rails have, but Passport adds great capabilities such as easy OpenID and OAuth (FB, Twitter, Google etc).

Passport can be used along with any ORM or db. It provides callbacks to obtain the user object.
It requires [`express-session`](#express-session) for session management.

    npm install -S passport passport-local

Useful links

- [Documentation](http://passportjs.org/docs)

- [Tutorial](http://code.tutsplus.com/tutorials/authenticating-nodejs-applications-with-passport--cms-21619)

- [Using sequelize with passport]
  (http://www.hamiltonchapman.com/blog/2014/3/25/user-accounts-using-sequelize-and-passport-in-nodejs)

- [Other tutorial]
  (https://orchestrate.io/blog/2014/06/26/build-user-authentication-with-node-js-express-passport-and-orchestrate/)

- [Permissions middleware](https://www.npmjs.com/package/permission)

### Express-session

[This module](https://github.com/expressjs/session) is the standard for express session management.

By default it uses a memory store for cookies, but this is supposed to work only for dev environments
(gives mem leaks too).
Therefore [a different store](https://github.com/expressjs/session#compatible-session-stores) is required.
Django uses [db storage by default]
(https://docs.djangoproject.com/en/1.9/topics/http/sessions/#configuring-the-session-engine),
but since a choice is necessary, the best option seems to be [redis](https://www.npmjs.com/package/connect-redis)
(no memcached option).

Other configuration

- [`name`](https://github.com/expressjs/session#name): cookie name, if on shared host

- [`secret`](https://github.com/expressjs/session#secret): a secret string to sign the cookie, use something
  [like this](https://docs.djangoproject.com/en/1.9/ref/settings/#secret-key), required

### Caching

Combining with `connect-redis` for `express-session`, redis can be used for route caching too with
[express-redis-cache](https://www.npmjs.com/package/express-redis-cache).

Useful links

- [Configuring redis](http://redis.io/topics/config)
- [Redis INFO command](http://redis.io/commands/INFO)
- [Sending commands to redis](https://github.com/NodeRedis/node_redis#sending-commands)
- [Using memcached](https://github.com/addisonj/node-cacher)

### Other interesting modules

- [i18n](https://github.com/mashpie/i18n-node)
- [multer](https://github.com/expressjs/multer)
- [express-debug](http://stackoverflow.com/a/34574680/940098)


## Deployment

### Create user

As a security consideration, it is better to run node as a user with limited permissions.
Assign the user a home directory (for nvm below) and shell access.
This can happen one-time for all node apps, or for more tightened security create a user for each app.

### Where to deploy

Obviously create a location on the server on which to deploy the project.
The location can be anywhere, as long as the above user has access to it.

In case of shared hosting, optionally create an appropriate domain or subdomain for the app.

Upload/rsync files.

### Install node

Do not rely on OS repo node, chances are that is massively outdated.
Express requires node >v0.8 and eg Ubuntu 12.04 has got node v0.6 (see also [this]
(http://stackoverflow.com/questions/25874666/express-app-throws-500-typeerror-object-eventemitter-has-no-method-hrtime)).
One-time installation of node is easy, but to allow multiple versions (as python virtualenv), nvm can be used easily.
Also, v4.0 and above (after the merge with io.js) has compilation issues with older LTS releases such as Ubuntu 12.04
Therefore v0.12.x is recommended for general availability, which is maintained, unless particular features
are required.

Prerequisites:

    sudo apt-get update
    sudo apt-get install build-essential libssl-dev

Install nvm:

    curl https://raw.githubusercontent.com/creationix/nvm/v0.16.1/install.sh | sh
    source ~/.profile

This creates an `~/.nvm` directory and also executes the appended lines in bash profile.

Install a node version:

    nvm ls-remote
    nvm install 0.12.9

And use it with:

    nvm ls
    nvm use 0.12.9

Alias:

    nvm alias default 0.12.9
    nvm use default

Npm starts from the particular node version, eg in `~/.nvm/v0.12.0/lib/node_modules/npm`.

[Further reading](https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-an-ubuntu-14-04-server)

To [auto start nvm upon login]
(http://stackoverflow.com/questions/14948179/how-to-make-nvm-automatically-sourced-upon-login),
create a `default` alias and then append on `~/.bash_profile`:

    [[ -s $HOME/.nvm/nvm.sh ]] && . $HOME/.nvm/nvm.sh

Check with `which node`.

### Serving the application

This covers Apache.

Make sure that mod_proxy is
[enabled](http://superuser.com/questions/284898/how-to-check-which-apache-modules-are-enabled-installed)
or [enable](http://askubuntu.com/questions/58179/install-mod-proxy-to-get-proxypass-to-work) (Ubuntu):

    sudo apache2ctl -M
    sudo a2enmod proxy_http

Then add in site configuration file [deploy/vhost.conf](./deploy/vhost.conf).

If using Plesk 11, add the above in `/var/www/vhosts/<domain or subdomain>/conf/vhost.conf` (please note that
is the path, even if the subdomain is under eg `/var/www/vhosts/<domain>/<subdomain>/`) and then execute
`sudo /usr/local/psa/admin/sbin/httpdmng --reconfigure-domain <subdomain>`.

If using Plesk 12, [there is](https://www.conetix.com.au/blog/installing-nodejs-plesk-12)
a link 'Web Server Settings' under 'Websites and Domains' that allows to place additional directives in there.

If `socket.io` is required, then probably Apache v2.4 is required. It might be possible to proxy sockets as
recommended [here](http://stackoverflow.com/a/30500430/940098). Then configure `mod_proxy_wstunnel` as recommended
[here](http://serverfault.com/questions/290121/configuring-apache2-to-proxy-websocket). To upgrade Apache to 2.4
see [here](http://www.ivankrizsan.se/2014/07/17/upgrading-apache-http-server-2-2-to-2-4-on-ubuntu-12-04/).
This [should be ok](http://kb.odin.com/en/762) with Plesk as well.

For load balancing, consider [PM2](https://github.com/Unitech/pm2).
Also excellent article [here](http://blog.keithcirkel.co.uk/load-balancing-node-js/).

### Running as a service

To make certain that node is spawned if for some reason crashes, add [deploy/service.conf](./deploy/service.conf)
as `/etc/init/yourapp.conf` for each app. Make sure to edit the user and paths in the script.

Then start with (Ubuntu):

    sudo service yourapp start

[Further reading](http://kvz.io/blog/2009/12/15/run-nodejs-as-a-service-on-ubuntu-karmic/)

Regarding the [respawn limits](http://upstart.ubuntu.com/cookbook/#respawn), in the above script
the script will be respawned every 5sec for 99 retries. Notice that, if the user hits Apache when
node is down, a 503 error will be issueed and then Apache will retry after 60 seconds by default
or whatever specified in [retry setting]
(http://serverfault.com/questions/58707/how-to-avoid-restarting-apache-proxy-when-you-restart-couchdb)
([reference](http://httpd.apache.org/docs/2.2/mod/mod_proxy.html#proxypass)).


## IDE

I chose to use Jetbrains [WebStorm](https://www.jetbrains.com/webstorm/). It offers several neat features
that help development.

- Specify a `.editorconfig` file for the code styling.
- Specify the appropriate nvm node version in *Settings: Language and frameworks: Node and NPM*.
- Add express code completion in *Settings: Language and...: Javascript: Libraries: Download: express*.

See also [this post](http://blog.jetbrains.com/webstorm/2014/01/getting-started-with-node-js-in-webstorm/).


## Conclusions

Node.js has always been fascinating. There are many posts regarding the benefits of it, but I am going
to describe what I found to be important from the aspect of development time cost. So in essence I am comparing
my express-based experiment to Django (as much as this is possible).

- Deployment: Node thrives. It is a modern solution that allows far easier scaling and management.

- Async: Node's async nature is incredible. Nothing compared to other similar technologies in Python. Maybe it is not
  the "silver bullet" as many claim, but it definitely brings new possibilities design-wise. The use of
  bluebird promises greatly reduces the complication of code maintenance. Disclaimer: haven't debugged
  a large app yet in node.

- Modules: many available modules but with less quality in documentation.

- ORM: many mediocre solutions (see above about modules). I liked Bookshelf, but it reminds
  what Django has been 3 or 4 years earlier: basic functionality, even more basic migrations (south).

- Forms, formsets, serializers: important stuff in Django, which are almost totally irrelevant to node.

- Views, routes: pretty much the same functionality. I really do not understand why all router urls are
  hard-coded in express.

- Templates: In first glance Jade looks alien. But after spending some time with it, I found it to be
  the "Python" of templates. Lean small code, simply fantastic. Here I will also add the easiness to
  include angular in it.

- Contrib: auth requires some model work in node. Apart from that, passport takes auth possibilities to another level.
  Regarding admin, this is something totally missing. But it shouldn't be that hard to implement CRUD in node.

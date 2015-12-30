# express-experiment


Learning express.js with Angular, Sequelize, Passport.
For people coming from Django background.


## Desired technologies

- Nodejs
- Express
- Waterline
- Passport
- Angular


## Node

[Install on Ubuntu](http://stackoverflow.com/questions/25823131/node-http-server-not-working):

    sudo apt-get install nodejs npm

Or use nvm as described in [deployment section](#deployment).

Useful links
- [Style guide](http://nodeguide.com/style.html)


## Express

Nodejs favorite unopinionated framework

Useful links

- [Tutorial](http://expressjs.com/en/starter/installing.html)

- [What does `./bin/www` do](http://stackoverflow.com/questions/23169941/what-does-bin-www-do-in-express-4-x)


## Waterline

Use sails' [waterline](https://github.com/balderdashy/waterline) individually as ORM.
It only offers automatic migrations, so for manual use possibly tools as [apgdiff](http://apgdiff.com/index.php)
or [SchemaSync](https://github.com/mmatuson/SchemaSync).


## Passport

Authentication middleware. Express does not have anything like Django or
Rails have, but Passport adds great capabilities.

    npm install --save passport passport-local

Useful links

- [Documentation](http://passportjs.org/docs)

- [Tutorial](http://code.tutsplus.com/tutorials/authenticating-nodejs-applications-with-passport--cms-21619)

- [Using sequelize with passport](http://www.hamiltonchapman.com/blog/2014/3/25/user-accounts-using-sequelize-and-passport-in-nodejs)

- [Other tutorial](https://orchestrate.io/blog/2014/06/26/build-user-authentication-with-node-js-express-passport-and-orchestrate/)


## Angular

Useful links
- [Tutorial](https://code.angularjs.org/1.4.8/docs/tutorial/step_00)
- [Repo](https://github.com/angular/angular-phonecat)


## Template engines

Express uses Jade. Other possibilities:

- [Nunjucks](https://mozilla.github.io/nunjucks/templating.html) (Jinja2 in node)
- [Handlebars](http://handlebarsjs.com/)
- [Underscore](http://documentcloud.github.io/underscore/)
- [More...](https://www.quora.com/What-is-the-best-Node-js-template-engine)


## Other modules

- http://stackoverflow.com/questions/21821773/configure-node-express-to-serve-static-bower-components
- https://github.com/mashpie/i18n-node
- https://github.com/expressjs/multer


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

Prerequisites:

    sudo apt-get update
    sudo apt-get install build-essential libssl-dev

Install nvm:

    curl https://raw.githubusercontent.com/creationix/nvm/v0.16.1/install.sh | sh
    source ~/.profile

This creates an `~/.nvm` directory and also executes the appended lines in bash profile.

Install a node version:

    nvm ls-remote
    nvm install 0.12.0

And use it with:

    nvm ls
    nvm use 0.12.0

Alias:

    nvm alias default 0.12.0
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

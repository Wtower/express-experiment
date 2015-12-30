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

http://stackoverflow.com/questions/21821773/configure-node-express-to-serve-static-bower-components
https://github.com/mashpie/i18n-node

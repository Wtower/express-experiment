# express-experiment


Learning express.js with Angular, Sequelize, Passport.
For people coming from Django background.


## Desired technologies

- Nodejs
- Express
- Sequelize
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


## Sequelize

SQL ORM support.

    mkdir express-app
    cd express-app
    npm install express express-generator
    node_modules/.bin/express . -f
    npm install
    npm start
    npm install --save sequelize sequelize-cli sqlite3  # or mysql or whatever
    node_modules/.bin/sequelize init

Then edit the following files as in tutorial
[Using with express.js](http://docs.sequelizejs.com/en/1.7.0/articles/express/)

- bin/www
- models/(mymodels).js
- routes/index.js
- views/index.jade

Useful links

- [Getting Started](http://docs.sequelizejs.com/en/latest/docs/getting-started/)

- [Express example](https://github.com/sequelize/express-example)

### Migrations

Create models with

    node_modules/.bin/sequelize help:model:create
    node_modules/.bin/sequelize model:create --name User --attributes 'first_name:string, last_name:string, bio:text'

Run migrations with

    node_modules/.bin/sequelize db:migrate

Notes:

- No need to keep extensive migrations as with Django makemigrations,
  all migrations pre release can be in the same file.

- Sequelize sync (`.bin/www`) appears to create two tables per model (eg user and users) with common fields.
  Therefore migrations without sync is not working. Have not tested what happens with both.
  This behaviour is undesirable and undocumented.


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

Template engines
- Jade
- [Handlebars](http://handlebarsjs.com/)
- [Swig](http://paularmstrong.github.io/swig/)
- [Underscore](http://documentcloud.github.io/underscore/)
- [More...](https://www.quora.com/What-is-the-best-Node-js-template-engine)

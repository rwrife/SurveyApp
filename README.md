To run (assuming you have latest LTS Node.JS):

Uses Node.JS as primary runtime, along with Express as the HTTP endpoint host and static file hosting, a variation of the Handlebars engine for template rendering and injecting data in an MVC fashion, Sequelize is used as an ORM to connect to a SQLite database, normally you'd want MySQL or Mongo, Mocha/Chai for unit testing.  Front-end is plain ole' javascript, a little jQuery, HTML5...nothing fancy.

```
npm install
npm start
```
or
```
npm test
```

Notes: It won't run in a server farm due to the passport storing the session in local memory, so this is a single instance only app.  Ideally you could use cookies or redis cache to share the session across server clusters.  Needs more unit tests as well, controller and model exports need to be broken out into functions for visibility to Mocha.  Hindsite, it should have also been more mobile-first UI.
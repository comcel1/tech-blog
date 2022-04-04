const express = require('express');
const app = express();

const path = require('path');

const sequelize = require('./config/connection');

// set up handlebars.js
const exphbs = require('express-handlebars');
const helpers = require('./utils/helpers');
// this gives handlebars access to the helpers functions in the utils folder
const hbs = exphbs.create({ helpers });
app.set('view engine', 'handlebars');
app.engine('handlebars', hbs.engine);

// session cookies
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const sess = {
  secret: process.env.SESSION_SECRET,
  cookie: {},
  resave: false,
  saveUnitialized: true,
  store: new SequelizeStore({ db: sequelize }),
};

// insert middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// session middleware
app.use(session(sess));

// routes
app.use(require('./controllers/index'));

const PORT = process.env.PORT || 3001;

// form connection to sequelize database BEFORE starting server.
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`listening on port ${PORT}!`);
  });
});

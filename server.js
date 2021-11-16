const path = require('path');
const express = require('express');
const routes = require('./controllers/');
const sequelize = require('./config/connection');

//const helpers = require('./utils/helpers');

const exphbs = require('express-handlebars');
const hbs = exphbs.create({});

const session = require('express-session');

const app = express();
const PORT = process.env.PORT || 3001;
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sess = {
  secret: 'Finley2021',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session(sess));

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(require('./controllers/'));

// turn on routes
app.use(routes);

// turn on connection to db and server


sequelize.sync({ force: true }).then(() => {

  //database connection must sync with the model definitions and associations
  app.listen(PORT, () => console.log('Now listening'));
});
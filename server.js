const path = require('path');
const express = require('express');
const routes = require('./controllers/');
const sequelize = require('./config/connection');

const exphbs = require('express-handlebars');
const hbs = exphbs.create({});

const session = require('express-session');

const app = express();
//server PORT declaration
const PORT = process.env.PORT || 3001;
//creating session and initializing cookies
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
//handlebars middleware
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));
app.use(require('./controllers/home-routes'));

app.use(session(sess));
//requiring controllers
app.use(require('./controllers/'));
// turn on routes
app.use(routes);
// turn on connection to db and server
sequelize.sync({ force: false }).then(() => {
  //database connection must sync with the model definitions and associations
  app.listen(PORT, () => console.log('Now listening'));
});


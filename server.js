const path = require('path');
const express = require('express');
const routes = require('./controllers/home-routes');


//const helpers = require('./utils/helpers');

const exphbs = require('express-handlebars');
const hbs = exphbs.create({});

const session = require('express-session');

const app = express();
const PORT = process.env.PORT || 3001;




app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));


app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));
app.use(require('./controllers/home-routes'));

// turn on routes
app.use(routes);

  app.listen(PORT, () => console.log('Now listening'));

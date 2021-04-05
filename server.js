const express = require('express');
const routes = require('./controllers');
const sequelize = require('./config/connection');
const path = require('path')

const app = express();
const PORT = process.env.PORT || 3001;
//set views folder??
app.set('views', path.join(__dirname, 'views'));

// make public assets available for server
app.use(express.static(path.join(__dirname, 'public')))

// initialize express session
const session = require('express-session');

const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sess = {
  secret: 'Super secret secret',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// setup handlebars
const exphbs = require('express-handlebars');
const hbs = exphbs.create({});

app.engine('handlebars', hbs.engine);
// set up view engine
app.set('view engine', 'handlebars');

// turn on routes
app.use(routes);
//get routes??? render homepage view
app.get('/', function(req, res){ res.render('homepage');

});
//app set port??
app.set('port', (process.env.PORT));
// app.listen(app.get('port'), function(){
//   console.log('server started on port');
// });

// turn on connection to db and server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Now listening on port ${PORT}`));
});

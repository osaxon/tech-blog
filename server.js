const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const routes = require('./controllers');
const sequelize = require('./config/connection');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store)


const app = express();
const PORT = process.env.PORT || 3300;

const sess = {
    secret: 'super secret secret',
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize,
        expiration: 24 * 60 * 60 * 1000, // 24hrs
    })
}

const hbs = exphbs.create({});
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(session(sess))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

sequelize.sync({ force: false}).then(() => {
    app.listen(process.env.PORT || PORT, () => console.log(`Now listening on port ${PORT}...`))
});
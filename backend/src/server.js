const { PORT = 5000 } = process.env;

const app = require('./app');
const knex = require('./db/connection');
const passport = require('./auth/auth');

knex.migrate
  .latest()
  .then((migrations) => {
    console.log('migrations', migrations);
    app.listen(PORT, listener);
  })
  .catch((error) => {
    console.error(error);
    knex.destroy();
  });

function listener() {
  console.log(`Listening on Port ${PORT}!`);
}

app.use(passport.initialize());

app.post('/login', passport.authenticate('2fa'), (req, res) => {
  // User is authenticated
  res.send('Success');
});


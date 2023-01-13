const { PORT = 5000 } = process.env;

const app = require('./app');
const knex = require('./db/connection');

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

<<<<<<< HEAD
  function listener() {
    console.log(`Listening on Port ${PORT}!`);
  }
=======
function listener() {
  console.log(`Listening on Port ${PORT}!`);
}
>>>>>>> 21e56e145374ed0a4bb3920f213c4673abb4bf42

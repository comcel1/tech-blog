const express = require('express');
const app = express();

const path = require('path');

const sequelize = require('./config/connection');

// insert middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(require('./controllers/index'));

const PORT = process.env.PORT || 3001;

// form connection to sequelize database BEFORE starting server.
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`listening on port ${PORT}!`);
  });
});

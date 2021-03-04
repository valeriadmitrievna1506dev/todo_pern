require('dotenv').config();
const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./database');
const path = require('path')
const models = require('./server/models/index')
const PORT = process.env.PORT || 8000;
const errorHandler = require('./server/middleware/ErrorHandler')

const app = express();

const static = __dirname + '/views/'

app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(static))
app.set('views', path.join(__dirname, '/views/'));
app.set('view engine', 'html');

app.get('/', function (req, res) {
  res.sendFile(static + "index.html");
});

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    require('./server/routes')(app);

    app.use(errorHandler)
    
    app.listen(PORT, () => console.log(`server running on ${PORT}`));
  } catch (e) {
    console.log(e.message);
  }
};
start()

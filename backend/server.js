let express = require('express'),
  path = require('path'),
  mongoose = require('mongoose'),
  cors = require('cors'),
  bodyParser = require('body-parser'),
  dbConfig = require('./database/db');

let now = new Date();

// Connecting with mongo db
mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: true
}).then(() => {
  console.log('Database sucessfully connected')
},
  error => {
    console.log('Database could not connected: ' + error)
  }
)

// Setting up port with express js
const employeeRoute = require('../backend/routes/product.route')
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cors());
app.use(express.static(path.join(__dirname, 'dist/mymat-design')));
app.use('/', express.static(path.join(__dirname, 'dist/mymat-design')));
app.use('/api', employeeRoute)

// Create port
const port = process.env.PORT || 420;
const server = app.listen(port, '192.168.1.7', () => {
  console.log('Listening on port: ' + port + " Time: " + now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds())
});

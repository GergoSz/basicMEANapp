let express = require("express");
(path = require("path")),
	(mongoose = require("mongoose")),
	(cors = require("cors")),
	(bodyParser = require("body-parser"));
/*favicon = require('favicon'), 
  logger = require('morgan'),
  cookieParser = require('cookie-parser'),
  passport = require('passport');*/

let dbConfig = require("./database/db");
let rentableRoute = require("./routes/rentable.routes");
let rentRoute = require("./routes/rent.routes");
let clientRoute = require("./routes/client.routes");

let now = new Date();
const port = process.env.PORT || 3003;

// Connecting with mongo db
mongoose.Promise = global.Promise;
mongoose
	.connect(dbConfig.db, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: true,
	})
	.then(
		() => {
			console.log("Database successfully connected");
		},
		(error) => {
			console.log("Database could not connected: " + error);
		}
	);

// Setup with express js
const app = express();
app.use(bodyParser.json());
app.use(
	bodyParser.urlencoded({
		extended: false,
	})
);
app.use(cors());
//app.use(passport.initialize());
app.use(express.static(path.join(__dirname, "dist/videotk")));
app.use("/", express.static(path.join(__dirname, "dist/videotk")));
app.use("/serv", rentableRoute);
app.use("/serv", rentRoute);
app.use("/serv", clientRoute);

// Start app on port
const server = app.listen(port, () => {
	console.log(
		"Listening on port: " +
			port +
			" Time: " +
			now.getHours() +
			":" +
			now.getMinutes() +
			":" +
			now.getSeconds()
	);
});

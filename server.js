const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

require('dotenv').config();

var corsOptions = {
  origin: "http://localhost:8081"
};

const db = require("./app/models/index.js");
// db.sequelize.sync();

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// Drop the tables and resync
db.sequelize.sync({ force: true }).then(() => {
    console.log("Drop and re-sync db.");
});

app.get("/", (req, res) => {
  res.json({ message: "Url not supported" });
});

require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);
require("./app/routes/task.routes")(app);
require("./app/routes/seeder.routes")(app);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

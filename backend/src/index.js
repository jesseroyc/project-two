const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

// var usersRouter = require('./Routes/users.routes');
// var adminRouter = require('./Routes/admin.routes');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(morgan('common'));

const knexSQLDatabase = require('./configs/db.configs');

// Test call data from db and display it
app.get('/', function(req, res, next) {
    knexSQLDatabase.raw('select VERSION() version')
        .then(([rows, columns]) => rows[0])
        .then((row) => res.json({ message: `Hello from MySQL ${row.version}` }))
        .catch(next);
});

// app.use('/users', usersRouter);
// app.use('/admin', adminRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.status(404).json({
    message: "No such route exists"
  })
});

// error handler
app.use(function(err, req, res, next) {
  res.status(err.status || 500).json({
    message: "Error Message"
  })
});

// Health Checker
app.get("/healthz", function(req, res) {
    // Can add app logic here to determine if app is OK(200)
    // Can restrict this to localhost (include ipv4 and ipv6)
    res.send("I am happy and healthy\n");
});

const server = app.listen(process.env.DATABASE_PORT, function() {
  console.log("Webserver is ready");
});

// Docker Interfaces
// Allows Graceful Docker Stop on Terminal `ctrl-c`
process.on("SIGINT", function onSigint() {
    console.info("Got SIGINT (aka ctrl-c in docker). Graceful shutdown ", new Date().toISOString());
    shutdown();
});

// Allows Graceful Docker Stop on Quit
process.on("SIGTERM", function onSigterm() {
    console.info("Got SIGTERM (docker container stop). Graceful shutdown ", new Date().toISOString());
    shutdown();
});

// Shutdown Signals For Docker
function shutdown() {
    server.close(function onServerClosed(err) {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        process.exit(0);
    });
}
  
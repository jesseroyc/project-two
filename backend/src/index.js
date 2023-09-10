const app = require("./server");
const { port } = require("./config");


const server = app.listen(port, function() {
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
  
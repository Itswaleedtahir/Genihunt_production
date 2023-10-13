const express = require("express");
const expressLogger = require("express-bunyan-logger");
const cors = require("cors");
const path = require("path");
const app = express();
const morgan = require("morgan");
const winston = require("winston");
const logger = require("winston");
const { Server } = require("socket.io");
const { createServer } = require("http");
const server = createServer(app);
const io = new Server(server);

// Middleware function to log requests and responses
app.use((req, res, next) => {
  const startTime = Date.now();

  res.on("finish", () => {
    const endTime = Date.now();
    const responseTime = endTime - startTime;
    const logMessage = `${req.method} ${req.originalUrl} ${res.statusCode} ${responseTime}ms`;

    logger.info(logMessage, {
      request: {
        headers: req.headers,
        body: req.body,
      },
      response: {
        headers: res.getHeaders(),
        body: res.locals.data,
      },
    });
  });

  next();
});

// Create a Winston logger
const log = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [new winston.transports.Console()],
});

// Use Morgan middleware to log requests and responses
app.use(
  morgan("combined", {
    stream: {
      write: (message) => {
        log.info(message.trim());
      },
    },
  })
);
require("./models");

process.on("uncaughtException", (e) => {
  console.log(e);
});

// Hello

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb" }));
app.use(
  expressLogger({
    excludes: [
      "headers",
      "req",
      "user-agent",
      "short-body",
      "http-version",
      "req-headers",
      "res-headers",
      "body",
      "res",
    ], // remove extra details from log
  })
);
// app.use(expressLogger.errorLogger());
app.use(cors("*"));

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

const router = require("./routes")(io);

// routes
app.use("/api", router);
// Serve Default route
app.get("*", (req, res) => {
  return res.sendFile(path.resolve(__dirname, "./public/", "index.html"));
});

// catch 404 later
app.use((req, res) => {
  return res.status(404).send("Error 404, Route not found");
});

// error handling
app.use((err, req, res, next) => {
  // for now log the error and return 500; need to handle it differently in future
  if (res.headersSent) {
    return next(err);
  }
  req.log.error(err);
  return res.status(500).send(err.message);
});
app.use((err, req, res, next) => {
  logger.error(
    `${err.status || 500} - ${err.message} - ${req.originalUrl} - ${
      req.method
    } - ${req.ip}`
  );
  next(err);
});

module.exports = { server, io };

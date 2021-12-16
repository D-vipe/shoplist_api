import fs from "fs";
import tee from "pino-tee";
import path from "path";

const stream = tee(process.stdin);

// create a logging target for HTTP logs
stream.tee(
  fs.createWriteStream(path.join(__dirname, "../logs/http.log"), {flags: "a"}),
  line => line.level === 30
);

// create a logging target for logs of different levels
stream.tee(
  fs.createWriteStream(path.join(__dirname, "../logs/combined.log"), {flags: "a"}),
  line => line.level === 40
);

// create a logging target for errors and fatals
stream.tee(
  fs.createWriteStream(path.join(__dirname, "../logs/error.log"), {flags: "a"}),
  line => line.level === 50
);

// redirect the stream to stdout
stream.pipe(process.stdout);

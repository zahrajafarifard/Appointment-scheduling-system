const app = require("express")();
const express = require("express");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const Customer = require("./models/customer");
const Queue = require("./models/queue");
const DaysOfYear = require("./models/daysOfYear");
const TimeSlot = require("./models/timeSlot");
const ArchiveQueue = require("./models/archiveQueue");
const RequestType = require("./models/requestType");
const Request = require("./models/request");

const daysOfYearRoute = require("./routes/daysOfYearRoute");
const customerRoute = require("./routes/customerRoute");
const timeSlotRoute = require("./routes/timeSlotRoute");
const queueRoute = require("./routes/queueRoute");
const adminRoute = require("./routes/adminRout");
const requestTypeRoute = require("./routes/requestTypeRoute");
const requestRoute = require("./routes/requestRoute");

const sequelize = require("./db.js");

app.use(
  cors({
    origin: "*",
    optionsSuccessStatus: 200,
  }),
);

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST,OPTIONS, PUT, PATCH, DELETE",
  );
  res.setHeader("Access-Control-Allow-Headers", "content-type , Authorization");
  res.setHeader("Access-Control-Allow-Credentials", true);
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));
app.use("/upload", express.static(path.join("upload")));

app.use("/daysOfYear", daysOfYearRoute);
app.use("/customer", customerRoute);
app.use("/queue", queueRoute);
app.use("/timeSlot", timeSlotRoute);
app.use("/admin", adminRoute);
app.use("/requestType", requestTypeRoute);
app.use("/request", requestRoute);

TimeSlot.belongsTo(DaysOfYear, {
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
  allowNull: false,
});

Queue.belongsTo(TimeSlot, {
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
  allowNull: false,
});
// TimeSlot.hasOne(Queue);

Queue.belongsTo(Customer, {
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
  allowNull: false,
});
ArchiveQueue.belongsTo(Queue, {
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
  allowNull: false,
});
Queue.belongsTo(RequestType, {
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
  allowNull: false,
});

RequestType.belongsTo(Request, {
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
  allowNull: false,
});
// RequestType.belongsTo(Request, {
//   constraints: false,
// });

app.use((error, req, res, next) => {
  fs.appendFile(
    "err.txt",
    error.message + " " + error.code + "\r\n",
    function (err) {
      if (err) return next(err);
    },
  );

  if (req.file) {
    fs.unlink(req.file.path, (err) => {
      return next(err);
    });
  }
  if (res.headerSent) {
    return next(error);
  }
  // return res.status(500).send('Something broke!')
});

sequelize
  .sync()
  // .sync({ force: true })
  .then((result) => {
    const server = app.listen(4000, () => {
      console.log("Server is up on port " + 4000);
    });
  })
  .catch((err) => {
    console.log(err);
  });

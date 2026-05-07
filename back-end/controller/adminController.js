const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");
const fs = require("fs");
const moment = require("moment");
const momentJalaali = require("moment-jalaali");

const DaysOfYear = require("../models/daysOfYear");
const TimeSlot = require("../models/timeSlot");
const Customer = require("../models/customer");
const Admin = require("../models/admin");
const Queue = require("../models/queue");
const ArchiveQueue = require("../models/archiveQueue");

exports.configDaysOfYear = async (req, res, next) => {
  const {
    startHour,
    startMinute,
    endHour,
    endMinute,
    persons,
    slotDuration,
    day,
    month,
    year,
  } = req.body;

  let startDate = moment(
    momentJalaali(`${year}/${month}/${day}`, "jYYYY/jMM/jDD").format(
      "YYYY-MM-DD"
    )
  );

  const now = moment(new Date());
  if (startDate.diff(now, "days") < 0) {
    return res.status(422).json({
      msg: "  روز نوبت دهی به درستی تنظیم نشده است .",
    });
  }
  startDate.set({ hour: Number(startHour), minute: Number(startMinute) });

  let endDate = moment(
    momentJalaali(`${year}/${month}/${day}`, "jYYYY/jMM/jDD").format(
      "YYYY-MM-DD"
    )
  );
  endDate.set({ hour: Number(endHour), minute: Number(endMinute) });
  let difHours = endDate.diff(startDate, "minute");

  if (difHours < 0 || difHours === 0) {
    return res.status(422).json({
      msg: "ساعت شروع و پایان نوبت دهی به درستی تنظیم نشده است .",
    });
  }

  const _dateString = momentJalaali(
    `${year}/${month}/${day}`,
    "jYYYY/jMM/jDD"
  ).format("YYYY/MM/DD");

  try {
    const initialDatsOfYear = await DaysOfYear.create({
      date: startDate,
      dateString: _dateString, // It's unique and cann't be repeated and month has 2 digits
      isActive: 1,
      startOfDay: startDate,
      endOfDay: endDate,
      slotDuration: slotDuration,
    });

    for (let i = 0; i < difHours; i = i + Number(slotDuration)) {
      await TimeSlot.create({
        active: 1,
        remainingPerson: persons,
        DaysOfYearId: initialDatsOfYear.id,
        startTime: moment(startDate).add(i, "minutes"),
      });
    }
  } catch (error) {
    if (error.errors[0].message == "dateString must be unique") {
      return res.status(422).json({
        msg: "تنظیمات مورد نظر برای سیستم نوبت دهی تکراری می باشد ...",
      });
    }
  }

  return res
    .status(200)
    .json({ msg: "تنظیمات مورد نظر برای سیستم نوبت دهی اعمال شد..." });
};

exports.advancedConfigDaysOfYear = async (req, res, next) => {
  // daysOfWeek = ["0", "0", "0", "0", "0", "0", "0"];
  // every day has a number -> mon=1 thur=2 .. sat=6 sun=0  and  daysOfWeek[0] is for sun , daysOfWeek[1]=mon,...

  const {
    daysOfWeek,
    startHour,
    startMinute,
    endHour,
    endMinute,
    persons,
    slotDuration,
    startDay,
    startMonth,
    startYear,
    endDay,
    endMonth,
    endYear,
  } = req.body;

  let startDate = moment(
    momentJalaali(
      `${startYear}/${startMonth}/${startDay}`,
      "jYYYY/jMM/jDD"
    ).format("YYYY-MM-DD")
  );
  let endDate = moment(
    momentJalaali(`${endYear}/${endMonth}/${endDay}`, "jYYYY/jMM/jDD").format(
      "YYYY-MM-DD"
    )
  );
  if (endDate.diff(startDate) < 0 || endDate.diff(startDate) === 0) {
    return res.status(422).json({
      msg: " بازه ی زمانی به درستی انتخاب نشده است .",
    });
  }

  const now = moment(new Date());
  if (startDate.diff(now, "days") < 0) {
    return res.status(422).json({
      msg: "  تاریخ شروع و پایان نوبت دهی به درستی تنظیم نشده است .",
    });
  }

  startDate.set({ hour: Number(startHour), minute: Number(startMinute) });
  endDate.set({ hour: Number(endHour), minute: Number(endMinute) });
  let difDays = endDate.diff(startDate, "days") + 1;

  for (let index = 0; index < difDays; index++) {
    let tempDate = moment(startDate).add(index, "d");
    let tempDate2 = moment(startDate).add(index, "d");
    tempDate2.set({ hour: Number(endHour), minute: Number(endMinute) });
    let difHours = tempDate2.diff(tempDate, "minute");
    // console.log(difHours);

    if (difHours < 0 || difHours === 0) {
      return res.status(422).json({
        msg: "ساعت شروع و پایان نوبت دهی به درستی تنظیم نشده است .",
      });
    }

    let tempDateNumber = new Date(tempDate).getDay();

    let stringDateOfTempDate = moment(tempDate, "jYYYY/jMM/jDD").format(
      "YYYY/MM/DD"
    );

    if (daysOfWeek[tempDateNumber] === "1") {
      try {
        initialDatsOfYear = await DaysOfYear.create({
          date: tempDate,
          dateString: stringDateOfTempDate,
          isActive: 1,
          startOfDay: startDate,
          endOfDay: endDate,
          slotDuration: slotDuration,
        });

        for (let i = 0; i < difHours; i = i + Number(slotDuration)) {
          await TimeSlot.create({
            active: 1,
            remainingPerson: persons,
            DaysOfYearId: initialDatsOfYear.id,
            startTime: moment(tempDate).add(i, "minutes"),
          });
        }
      } catch (error) {
        if (error.errors[0].message == "dateString must be unique") {
          return res.status(422).json({
            msg: "تنظیمات مورد نظر برای سیستم نوبت دهی تکراری می باشد .",
          });
        }
      }
    }
  }

  return res
    .status(200)
    .json({ msg: " تنظیمات مورد نظر برای سیستم نوبت دهی اعمال شد ." });
};

exports.signUp = async (req, res, next) => {
  const { mobile, password } = req.body;

  let existingAdmin;
  try {
    existingAdmin = await Admin.findOne({ where: { mobile: mobile } });
  } catch (err) {
    return next(err);
  }
  if (existingAdmin) {
    return res.status(422).json({
      msg: "کاربر گرامی شماره موبایل وارد شده تکراری است .",
    });
  }

  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (err) {
    return next(err);
  }
  // console.log("hashedPassword", hashedPassword);
  const createdAdmin = new Admin({
    mobile,
    password: hashedPassword,
  });

  try {
    await createdAdmin.save();
  } catch (err) {
    return next(err);
  }
  let token;
  try {
    token = jwt.sign(
      { AdminId: createdAdmin.id, mobile: createdAdmin.mobile },
      "mySecretKey",
      { expiresIn: "1h" }
    );
  } catch (err) {
    return next(err);
  }
  res.status(200).json({
    adminId: createdAdmin.id,
    mobile: createdAdmin.mobile,
    token: token,
  });
};

exports.signIn = async (req, res, next) => {
  const { mobile, password } = req.body;

  let existingAdmin;
  try {
    existingAdmin = await Admin.findOne({ where: { mobile: mobile } });
  } catch (err) {
    return next(err);
  }

  if (!existingAdmin) {
    return res.status(403).json({
      msg: "برای ورود ابتدا باید در سامانه ثبت نام کنید .",
    });
  }

  let unhashedPassword;
  try {
    unhashedPassword = await bcrypt.compare(password, existingAdmin.password);
  } catch (err) {
    return next(err);
  }
  if (!unhashedPassword) {
    return res.status(422).json({
      msg: "نام کاربری  یا کلمه ی عبور صحیح نمی باشد .",
    });
  }
  let token;
  try {
    token = jwt.sign(
      { AdminId: existingAdmin.id, mobile: existingAdmin.mobile },
      "mySecretKey",
      { expiresIn: "1h" }
    );
  } catch (err) {
    return next(err);
  }

  return res.status(200).json({
    adminId: existingAdmin.id,
    mobile: existingAdmin.mobile,
    token: token,
  });
};

exports.getNationalCard = async (req, res, next) => {
  let fpath = req.body.path;
  fs.readFile(fpath, function (err, data) {
    if (err) res.status(500).send("خطا در دانلود فایل ");

    res.send(data);
  });
};

exports.getDaysOfyear = async (req, res, next) => {
  // console.log(new Date().toLocaleDateString());
  try {
    const _days = await DaysOfYear.findAll({
      where: {
        date: {
          [Op.gte]: new Date().toLocaleDateString(),
        },
      },
      order: [["date", "ASC"]],
    });
    return res.status(200).json({
      days: _days,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.getAllQueus = async (req, res, next) => {
  try {
    const queues = await Queue.findAll({
      where: { active: true },
      order: [["TimeSlotId", "ASC"]],
      include: [{ model: TimeSlot }, { model: Customer }],
    });

    let _queues = [];
    queues.forEach((element) => {
      if (
        moment(element.TimeSlot.dataValues.startTime).isSame(new Date(), "day")
      ) {
        _queues.push(element);
      }
    });
    // console.log("wwwww", queues);

    return res.status(200).json({
      data: _queues,
      allQueues: queues,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.archiveQueue = async (req, res, next) => {
  try {
    const {
      queueId,
      firstName,
      lastName,
      mobile,
      nationalCard,
      nationalCode,
      // time,
      date,
    } = req.body;

    await Queue.update({ active: false }, { where: { id: queueId } });

    const createdArchiveQueue = new ArchiveQueue({
      firstName,
      lastName,
      mobile,
      nationalCard,
      nationalCode,
      // time,
      date,
      QueueId: queueId,
    });

    await createdArchiveQueue.save();
  } catch (error) {
    console.log(error);
  }
};

exports.getArchiveQueue = async (req, res, next) => {
  try {
    const ArchivedQueue = await ArchiveQueue.findAll({});

    return res.status(200).json({
      data: ArchivedQueue,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.unarchiveQueue = async (req, res) => {
  try {
    const _archiveId = req.body.archiveId;
    const fetchedArchive = await ArchiveQueue.findOne({
      where: {
        id: _archiveId,
      },
    });

    // console.log('_archiveId', fetchedArchive);
    if (fetchedArchive) {
      await fetchedArchive.destroy();
      await Queue.update(
        { active: true },
        { where: { id: fetchedArchive.QueueId } }
      );
    }
  } catch (error) {
    console.log(error);
  }
};

const TimeSlot = require("../models/timeSlot");
const Queue = require("../models/queue");
const Customer = require("../models/customer");
const RequestType = require("../models/requestType");
// const { Op } = require("sequelize");
const moment = require("moment");

exports.getAll = async (req, res, next) => {
  try {
    const date = req.params.date;
    const _slots = await TimeSlot.findAll({});

    let slotsArr = [];
    _slots.forEach((element) => {
      if (moment(element.dataValues.startTime).isSame(date, "day")) {
        slotsArr.push(element);
      }
    });
    return res.status(200).json({ slots: slotsArr });
  } catch (error) {
    console.log("errrr", error);
  }
};

exports.reserve = async (req, res, next) => {
  try {
    const { request, requestType, quantity } = req.body;

    const _id = req.params.id;
    const _slots = await TimeSlot.findOne({
      where: { id: _id },
    });
    // let _newDay;
    // if (_slots) {
    //   _newDay = await _slots.dataValues.DaysOfYearId;
    // }
    // // console.log("_newDay", _newDay);

    // const existQueue = await Queue.findAll({
    //   where: { CustomerId: req.customerId },
    //   include: [{ model: TimeSlot }],
    // });

    // // console.log("existQueue", existQueue, existQueue.length);
    // let _days = [];

    // if (existQueue.length !== 0) {
    //   existQueue.forEach(async (element) => {
    //     _days.push(element.TimeSlot.dataValues.DaysOfYearId);
    //   });
    //   // console.log("=daaays", _days);
    //   let temp = 0;
    //   _days.forEach(async (element) => {
    //     if (_newDay === element) {
    //       temp = temp + 1;
    //       return res
    //         .status(403)
    //         .json({ msg: "برای این تاریخ نوبت رزرو کرده اید" });
    //     }
    //   });
    //   if (temp === 0) {
    //     await Queue.create({
    //       CustomerId: req.customerId,
    //       TimeSlotId: _slots.id,
    //       RequestTypeId: requestType,
    //       request,
    //       quantity,
    //     });
    //     _slots.remainingPerson = (await _slots.remainingPerson) - 1;
    //     if (_slots.remainingPerson === 0) {
    //       _slots.active = 0;
    //     }
    //     await _slots.save();
    //     return res.status(200).json({ slots: _slots });
    //   }
    // } else {
    await Queue.create({
      CustomerId: req.customerId,
      TimeSlotId: _slots.id,
      RequestTypeId: requestType,
      request,
      quantity,
    });
    _slots.remainingPerson = (await _slots.remainingPerson) - 1;
    if (_slots.remainingPerson === 0) {
      _slots.active = 0;
    }
    await _slots.save();
    return res.status(200).json({ slots: _slots });
    // }
  } catch (error) {
    // console.log(error.name);
    if (error.name === "SequelizeForeignKeyConstraintError") {
      return res
        .status(403)
        .json({ msg: "SequelizeForeignKeyConstraintError" });
    }
  }
};

exports.getAllTurnsForCustomer = async (req, res, next) => {
  try {
    const _customerId = req.params.id;
    // const _timeSlot = req.body.timeSlot;
    const _date = req.body.date;

    const fetchedQueue = await Queue.findAll({
      where: { CustomerId: _customerId },
      include: [
        { model: TimeSlot },
        { model: Customer },
        { model: RequestType },
      ],
    });

    const _queues = fetchedQueue.filter((element) => {
      if (
        moment(element.dataValues.TimeSlot.dataValues.startTime).isSame(
          _date,
          "day"
        )
      ) {
        return element;
      }
    });

    res.status(200).json({ fetchData: _queues });
  } catch (error) {
    console.log(error);
  }
};

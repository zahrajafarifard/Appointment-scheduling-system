const Customer = require("../models/customer");
const Queue = require("../models/queue");
const TimeSlot = require("../models/timeSlot");
const moment = require("moment");
const { Op } = require("sequelize");

exports.getCustomer = async (req, res, next) => {
  try {
    const _customerId = req.params.id;
    let _timeSlot = req.body.timeSlot.split(",");

    // console.log("tttttt", _timeSlot);

    const fetchedQueue = await Queue.findAll({
      where: {
        CustomerId: _customerId,
        // TimeSlotId: { [Op.in]: _timeSlot },
      },
      include: [{ model: TimeSlot }, { model: Customer }],
    });

    // console.log("fffffffff", fetchedQueue.length);
    let detailArray = [];
    let _customer = [];
    fetchedQueue.map((queue) => {
      // console.log("qqqqqqq", queue);
      if (
        moment(queue.TimeSlot.dataValues.startTime).format(
          "YYYY-MM-DD HH:mm"
        ) >= moment().format("YYYY-MM-DD HH:mm")
      ) {
        detailArray.push(queue.TimeSlot.dataValues.startTime);
        _customer.push({
          firstName: queue.Customer.dataValues.firstName,
          lastName: queue.Customer.dataValues.lastName,
        });
      }
    });

    return res.status(200).json({ _customer, detailArray });
  } catch (error) {
    console.log(error);
  }
};

exports.getQueue = async (req, res, next) => {
  try {
    const _queueId = req.params.queueId;
    const _timeSlotId = req.params.timeSlotId;

    const fetchedQueue = await Queue.findOne({
      where: { id: _queueId, TimeSlotId: _timeSlotId },
      include: [{ model: TimeSlot }],
    });

    const fetchedTimeSlot = await TimeSlot.findOne({
      where: { id: fetchedQueue.TimeSlot.dataValues.id },
    });
    fetchedTimeSlot.remainingPerson =
      (await fetchedTimeSlot.remainingPerson) + 1;
    fetchedTimeSlot.active = 1;
    await fetchedTimeSlot.save();

    await fetchedQueue.destroy({});

    res.status(200).json({ msg: "record is deleted.." });
  } catch (error) {
    console.log(error);
  }
};

exports.deleteQueue = async (req, res, next) => {
  const _customerId = await req.params.customerId;
  const _reservedId = await req.params.reservedId;
  const _requestTypeId = await req.body.requestTypeId;

  const fetchedQueue = await Queue.findAll({
    where: {
      CustomerId: _customerId,
      TimeSlotId: _reservedId,
      RequestTypeId: _requestTypeId,
    },
    include: [{ model: TimeSlot }],
  });

  let tempTimeSlotId;
  if (fetchedQueue.length !== 0) {
    // fetchedQueue.forEach((element) => {
    //   if (
    //     String(moment(element.TimeSlot.dataValues.startTime).format("l")).split(
    //       "T"
    //     )[0] === String(moment(new Date()).format("l")).split("T")[0]
    //   ) {
    //     return (tempTimeSlotId = element.TimeSlot.dataValues.id);
    //   }
    // });

    // if (tempTimeSlotId !== undefined) {
    const fetchedTimeSlot = await TimeSlot.findOne({
      where: { id: _reservedId },
    });

    try {
      fetchedTimeSlot.remainingPerson =
        (await fetchedTimeSlot.remainingPerson) + 1;
      fetchedTimeSlot.active = 1;
      await fetchedTimeSlot.save();
    } catch (error) {
      console.log(error);
    }

    try {
      await Queue.destroy({
        where: { TimeSlotId: _reservedId, RequestTypeId: _requestTypeId },
      });
    } catch (error) {
      console.log(error);
    }
    return res.status(200).json({ data: fetchedTimeSlot });
  }

  // return res.status(403).json({ data: "برای امروز نوبت رزرو نکرده اید" });
};

exports.getTimeSlot = async (req, res, next) => {
  try {
    const _customerId = req.params.customerId;
    const _date = req.params.dateField;

    const fetchedQueue = await Queue.findAll({
      where: { CustomerId: _customerId },
      include: [{ model: TimeSlot }],
    });

    let tempTimeSlotIds = [];
    if (fetchedQueue.length !== 0) {
      fetchedQueue.forEach((element) => {
        if (
          moment(element.TimeSlot.dataValues.startTime).isSame(_date, "day")
        ) {
          return tempTimeSlotIds.push(element.TimeSlot.dataValues.id);
        }
      });
    }

    res.status(200).json({ timeSlotIds: tempTimeSlotIds });
  } catch (error) {
    console.log(error);
  }
};

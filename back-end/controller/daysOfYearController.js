const DaysOfYear = require("../models/daysOfYear");

exports.getAll = async (req, res, next) => {
  try {
    const days = await DaysOfYear.findAll({});

    res.status(200).json({ tomorrow: days[0].date });
  } catch (error) {
    console.log(error);
  }
};

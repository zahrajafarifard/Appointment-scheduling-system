const Request = require("../models/request");

exports.get = async (req, res) => {
  try {
    const fetchedData = await Request.findAll({});
    res.status(200).json({ data: fetchedData });
  } catch (error) {
    console.log(error);
  }
};

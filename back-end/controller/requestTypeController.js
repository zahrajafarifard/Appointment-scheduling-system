const RequestType = require("../models/requestType");
const Request = require("../models/request");

exports.get = async (req, res) => {
  try {
    const fetchedRequests = await RequestType.findAll({
      order: [["RequestId", "ASC"]],
      include: [{ model: Request }],
    });

    // console.log("ggggggg", fetchedRequests);

    res.status(200).json({ data: fetchedRequests });
  } catch (error) {
    console.log(error);
  }
};

exports.fetchedRequest = async (req, res) => {
  try {
    const { demand } = req.body;
    const fetchedRequests = await RequestType.findAll({
      include: [{ model: Request }],
    });

    const _demandType = [];
    fetchedRequests.forEach((element) => {
      if (element.dataValues.RequestId == demand) {
        return _demandType.push(element);
      }
    });

    res.status(200).json({ data: _demandType });
  } catch (error) {
    console.log(error);
  }
};

exports.getForUpdate = async (req, res) => {
  try {
    const { id } = req.params;

    const fetchedRequest = await RequestType.findOne({ where: { id: id } });
    res.status(200).json({ data: fetchedRequest });
  } catch (error) {
    console.log(error);
  }
};

exports.insert = async (req, res) => {
  const { requestNameId, type } = req.body;
  try {
    const created = new RequestType({
      name: type,
      RequestId: requestNameId,
    });

    await created.save();
  } catch (error) {
    console.log(error);
  }

  try {
    const fetchData = await RequestType.findAll({
      include: [{ model: Request }],
    });
    res.status(200).json({ data: fetchData });
  } catch (error) {
    console.log(error);
  }
};

exports.delete = async (req, res) => {
  const { id } = req.params;
  try {
    await RequestType.destroy({ where: { id: id } });
  } catch (error) {
    console.log(error);
  }
  res.status(200).json({ data: "done..." });
};

exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const name = req.body.updatedName;

    await RequestType.update({ name: name }, { where: { id: id } });

    const fetchData = await RequestType.findAll({
      include: [{ model: Request }],
    });

    res.status(200).json({ data: fetchData });
  } catch (error) {
    console.log(error);
  }
};

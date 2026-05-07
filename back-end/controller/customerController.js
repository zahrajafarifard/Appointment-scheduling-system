const jwt = require("jsonwebtoken");
const momentJalaali = require("moment-jalaali");
const sharp = require("sharp");
const fs = require("fs");
const https = require("http");
const axios = require("axios");
const { promisify } = require("util");
// const request = promisify(require("request"));

const Customer = require("../models/customer");
// const { DATE } = require("sequelize");

exports.insertMobile = async (req, res, next) => {
  const { mobile, nationalCode } = req.body;
  // const capchaToken = req.params.capchaToken;

  // try {
  //   const arcaptcha_api = "https://api.arcaptcha.co/arcaptcha/api/verify";

  //   const result = await axios.post(arcaptcha_api, {
  //     challenge_id: capchaToken,
  //     site_key: "axu657avme",
  //     secret_key: "o1byh452dbbbjkpe2u7q",
  //   });

  //   if (result.data.success !== true && result.status !== 200) {
  //     return res.status(403).json({ msg: " خطا در اعتبار سنجی" });
  //   }
  // } catch (error) {
  //   // console.log("eeeeee", error);
  //   return res.status(403).json({ msg: error });
  // }

  var randomTicket = Math.floor(Math.random() * 90000) + 10000;
  let today = new Date();
  let oneHour = new Date(today.getTime() + 60 * 60 * 1000);

  const _customer = await Customer.findOne({ where: { mobile: mobile } });

  if (_customer) {
    if (
      _customer.mobile !== mobile ||
      _customer.nationalCode !== nationalCode
    ) {
      return res.status(422).json({ msg: "عدم تطابق شماره موبایل و کد ملی" });
    }
    _customer.ticket = randomTicket;
    _customer.ticketExpireDate = oneHour;

    await _customer.save();

    // password is hot#128 but code for # is %23
    // let sms;
    // try {
    //   sms = await axios.get(
    //     `https://login.niazpardaz.ir/SMSInOutBox/SendSms?username=d.momeni&password=hot%23128&from=10009611&to=${mobile}&text=کد اعتبار سنجی شما: ${_customer.ticket}`
    //   );
    //   console.log("smmmmmmms", sms);
    // } catch (error) {
    //   console.log(error);
    // }

    return res.status(200).json({ customer: _customer });
  }
  let newCustomer;
  try {
    newCustomer = await Customer.create({
      mobile,
      nationalCode,
      ticket: randomTicket,
    });
  } catch (error) {
    return res.status(403).json({ msg: "عدم تطابق شماره موبایل و کد ملی" });
  }

  // try {
  //   sms = await axios.get(
  //     `https://login.niazpardaz.ir/SMSInOutBox/SendSms?username=d.momeni&password=hot%23128&from=10009611&to=${newCustomer.mobile}&text=کد اعتبار سنجی شما: ${newCustomer.ticket}`
  //   );
  //   console.log("smmmmmmms", sms);
  // } catch (error) {
  //   console.log(error);
  // }
  return res.status(200).json({ customer: newCustomer });
};

exports.logIn = async (req, res, next) => {
  const { mobile } = req.body;
  const _customer = await Customer.findOne({ where: { mobile: mobile } });

  if (!_customer) {
    return res.status(404).json({ message: "User dosn't exist..." });
  }
  let token;
  try {
    token = jwt.sign(
      { customerId: _customer.id, mobile: _customer.mobile },
      "mySecretKey",
      { expiresIn: "1h" }
    );
  } catch (err) {
    return next(err);
  }
  res
    .status(200)
    .json({ customerId: _customer.id, mobile: _customer.mobile, token: token });
};

exports.add = async (req, res, next) => {
  try {
    const { firstName, lastName, birthDate, mobile, shShenasname } = req.body;

    // await sharp(`${req.file.path}`)
    //   .resize(500)
    //   .jpeg({ quality: 70 })
    //   .toBuffer()
    //   .then(async (data) => {
    //     fs.writeFileSync(`upload/${req.file.filename}`, data);
    //   })
    //   .catch((err) => {
    //     console.error("errrr", err);
    //   });
    try {
      let data = await sharp(req.file.path)
        .resize(800)
        .jpeg({ quality: 80 })
        .png({ compressionLevel: 9, progressive: true, force: false })
        .toBuffer();

      fs.writeFileSync(`upload/${req.file.filename}`, data);
    } catch (error) {
      console.log(error);
    }

    let today = new Date();
    let oneHour = new Date(today.getTime() + 60 * 60 * 1000);

    const _customer = await Customer.findOne({ where: { mobile: mobile } });
    if (!_customer) {
      return res.status(404).json({ msg: "User dosn't exist..." });
    }
    if (req.customerId == _customer.id) {
      _customer.firstName = firstName;
      _customer.lastName = lastName;
      // _customer.birthDate = gregorianTojalali;
      _customer.birthDate = momentJalaali(birthDate).format("jYYYY-jMM-jDD");
      _customer.shShenasname = shShenasname;
      _customer.nationalCard = req.file.path;
      _customer.ticketExpireDate = oneHour;
      await _customer.save();
    }
    return res.status(200).json({ customer: _customer });
  } catch (error) {
    console.log("errrrrr", error);
  }
};

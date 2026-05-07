const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  if (req.method === "OPTION") {
    return next();
  }

  try {
    let decodedToken;
    let token = req.header("Authorization").split(" ")[1];
    decodedToken = jwt.verify(token, "mySecretKey");

    if (!decodedToken) {
      return res.status(401).json({ msg: "توکن وجود ندارد" });
    }
    req.customerId = decodedToken.customerId;
    req.customerMobile = decodedToken.mobile;
    next();
  } catch (err) {
    console.log("err Auth client::::", err);
    return res.status(401).json({
      error: err.message,
    });
  }

  //   return next(new Error(err.errors[0].message));
};

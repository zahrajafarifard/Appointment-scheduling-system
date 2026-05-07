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

    req.adminId = decodedToken.adminId;
    req.adminMobile = decodedToken.mobile;

    next();
  } catch {
    console.log("error Auth admin...");
    return res.status(401).json({
      error: "Invalid request!",
    });
  }
};

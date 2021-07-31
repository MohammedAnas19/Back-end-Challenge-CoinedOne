const jwt=require('jsonwebtoken');
// const { header } = require('express-validator');

exports.requireSignIn=(req, res,next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];
    console.log(token);
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
  } else {
    return res.status(400).json({ message: "Authorization required" });
  }
  next();
}
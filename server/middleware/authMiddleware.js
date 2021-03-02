const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  try {
    const token = req.headers.authorization.split(' ')[1];
    if (!token)
      return res.status(401).send({
        message: 'Not Auth',
      });
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.decoded = decoded;
    next();
  } catch (error) {
    res.status(401).send({
      message: 'Not Auth',
    });
  }
};

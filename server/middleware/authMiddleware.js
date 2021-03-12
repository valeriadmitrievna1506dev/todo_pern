const jwt = require('jsonwebtoken');
const util = require('util');

module.exports = async function (req, res, next) {
  try {
    const verifyPromise = util.promisify(jwt.verify);
    if (req.method === 'OPTIONS') next();
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      return res.status(401).send({
        message: 'Not Auth',
      });
    }
    const decoded = await verifyPromise(token, process.env.SECRET_KEY);
    req.decoded = decoded;
    next();
  } catch (error) {
    return res.status(401).send({
      message: 'Not Auth',
    });
  }
};

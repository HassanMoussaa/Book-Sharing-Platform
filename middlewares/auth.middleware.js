const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  console.log(req.headers)
  const token = req.headers.authorization?.split(" ")[1]
console.log(token)
  if (!token) return res.status(401).send({ message: 'Unauthorized' })

  try {
    jwt.verify(token, process.env.SECRET_KEY);
    next();

  } catch (error) {
    return res.status(401).send({ message: 'Unauthorized' })
  }

}

module.exports = authMiddleware
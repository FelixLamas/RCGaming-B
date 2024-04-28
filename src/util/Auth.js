const jwt = require("jsonwebtoken");

function isAuth(req, res, next) {
  const Auth = req.get("Authorization");
  if (!Auth) {
    return res.status(404).json({ message: "No autorizado" });
  }

  try {
    const token = Auth.split(" ")[1];
    const decodeToken = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decodeToken;
    next();
  } catch (error) {
    return res.status(404).json({ message: "Token invalido y/o vencido" });
  }
}

function isAdmin(req, res, next) {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Acceso denegado" });
  }
  next();
}

module.exports = { isAuth, isAdmin };

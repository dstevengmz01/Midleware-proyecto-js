const jwt = require("jsonwebtoken");

const authorization = async (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.json({ mensaje: "Acceso denegado, token no proporcionado" });
  } else {
    try {
      const tokenBearer = token.replace("Bearer", "");
      const respuestaJwT = await jwt.verify(tokenBearer, "secreto");
      req.user = respuestaJwT;
      next();
    } catch (error) {
      return res.json({ mensaje: "Token inválido" });
    }
  }
};

module.exports = authorization;

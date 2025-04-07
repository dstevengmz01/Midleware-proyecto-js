const { User } = require("../models");
const jwt = require("jsonwebtoken");
class UsuarioService {
  async Register(name, email, password) {
    const respuesta = await User.create({
      name,
      email,
      password,
    });
    return respuesta;
    // return await User.create(data);
  }

  async login(email) {
    try {
      const usuario = await User.findOne({ where: { email } });
      return usuario;
    } catch (e) {
      console.log({ mensaje: "error", e });
    }
  }
}

module.exports = new UsuarioService();

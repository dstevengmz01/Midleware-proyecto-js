const { json } = require("sequelize");
const userServices = require("../services/userServices");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

class UsuarioController {
  async login(req, res) {
    try {
      const { email, password } = req.body;
      const respuestap = await userServices.login(email);

      if (!respuestap) {
        return res.status(404).json({ mensaje: "Usuario no encontrado" });
      }

      const resp = await bcrypt.compare(password, respuestap.password);

      if (resp) {
        const token = jwt.sign(
          { id: respuestap.id, email: respuestap.email },
          "secreto",
          { expiresIn: "1h" }
        );
        console.log(token);
        return res.json({ mensaje: "Login exitoso", token: token });
      } else {
        console.log("Contraseña incorrecta");
        return res.status(400).json({ mensaje: "Contraseña incorrecta" });
      }
    } catch (e) {
      console.error(e);
      return res.status(500).json({ mensaje: "Error en el login", e });
    }
  }

  async createUsuario(req, res) {
    try {
      const { name, email, password } = req.body;
      const hashpassword = await bcrypt.hash(password, 10);
      const respuestaUser = await userServices.Register(
        name,
        email,
        hashpassword
      );

      console.log("Respuesta de creación de usuario:", respuestaUser);
      return res.json(respuestaUser);
    } catch (e) {
      console.error(e);
      return res.status(500).json({ mensaje: "Error en el servicio", e });
    }
  }
}

module.exports = new UsuarioController();

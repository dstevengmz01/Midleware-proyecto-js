const { json } = require("sequelize");
const userServices = require("../services/userServices");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
class UsuarioController {
  async login(req, res) {
    try {
      const { email, password } = req.body;
      const respuestap = await userServices.login(email);
      const resp = await bcrypt.compare(password, respuestap.password);
      if (resp) {
        const token = jwt.sign(
          { id: respuestap.id, email: respuestap.email },
          "secreto",
          { expiresIn: "1h" }
        );
        console.log(token);
        res.json({ mensaje: "Login exitoso", token: token });
      } else {
        console.log("contraseña incorrecta");
      }
      res.json({ respuesta: resp });
    } catch (e) {
      res.json({ mensaje: "error en el login", e });
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
      console.log(
        "asssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss",
        respuestaUser
      );
      res.json(respuestaUser);
    } catch (e) {
      res.json({ mensaje: "error en el servicio", e });
    }
  }
  // const nuevoUsuario = await usuarioService.createUsuario(req.body);
  // res.status(201).json(nuevoUsuario);
}
module.exports = new UsuarioController();

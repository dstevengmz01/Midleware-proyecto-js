const express = require("express");
const cors = require("cors");
const env = require("dotenv");
const app = express();
const usuarioRoutes = require("./routers/usuarioRouter");
env.config();
app.use(express.json());
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
// app.options("*", cors());

app.use("/apiu", usuarioRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Servidor en el puerto:", PORT);
});

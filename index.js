const express = require("express");
const cors = require("cors");
require("dotenv").config();
const path = require("path");
const authMiddleware = require("./middlewares/auth.middleware");

const PORT = process.env.PORT || 2345;
const {
  register,
  login,
  RefreshToken,
} = require("./controllers/auth.controller");
const ProtectedRoute = require("./controllers/protectedRoute.controller");

const connect = require("./configs/db");
const app = express();

app.use(express.json());
app.use(cors());

app.use("/login", login);
app.use("/register", register);
app.post("/refreshToken", RefreshToken);
app.use("", authMiddleware, ProtectedRoute);

// app.use(express.static(path.join(__dirname, "./client/build")));
// app.get("*", function (_, res) {
//   res.sendFile(
//     path.join(__dirname, "./client/build/index.html"),
//     function (err) {
//       res.status(500).send(err);
//     }
//   );
// });

app.listen(PORT, async () => {
  try {
    await connect();
    console.log(`listening on port ${PORT} `);
  } catch (error) {
    console.log(error.message);
  }
});

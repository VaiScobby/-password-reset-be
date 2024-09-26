const express = require("express");
const userRouter = require("./routes/userRoutes");
const cors = require("cors");
const app = express();
const { URL } = require("./utils/config");

app.use(express.json());
app.use(
  cors({
    origin: URL,
    credentials: true,
  })
);
app.use("/users", userRouter);

app.get("/", (request, response) => {
  response.status(200).send(`<body>
  <h1 style="text-align: center; background-color: black; color: aqua">
    Password reset api site
  </h1>

  <div>
    <h3>
      <span style="background-color: black; color: yellow">POST </span>&nbsp;
      create User endpoint:
      <a
        href="/users"
        style="
          all: unset;
          cursor: pointer;
          background-color: black;
          color: aqua;
        "
        >/users</a
      >
    </h3>
    <h3>
      <span style="background-color: black; color: blue">PUT </span>&nbsp; send
      a Password reset mail for given email endpoint:
      <a
        href="users/forgot"
        style="
          all: unset;
          cursor: pointer;
          background-color: black;
          color: aqua;
        "
        >users/forgot</a
      >
    </h3>
    <h3>
      <span style="background-color: black; color: green">GET </span>&nbsp; A
      verify the given string endpoint:
      <a
        href="/users/verify/:key"
        style="
          all: unset;
          cursor: pointer;
          background-color: black;
          color: aqua;
        "
        >/users/verify/:key</a
      >
    </h3>
    <h3>
      <span style="background-color: black; color: blue">PUT </span>&nbsp;
      Password reset endpoint:
      <a
        href="users/reset"
        style="
          all: unset;
          cursor: pointer;
          background-color: black;
          color: aqua;
        "
        >users/reset</a
      >
    </h3>
  </div>
</body>

  `);
});

module.exports = app;

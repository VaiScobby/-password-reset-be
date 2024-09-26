const bcrypt = require("bcrypt");
const Users = require("../models/user");
const randomString = require("../utils/randomString");
const transporter = require("../mailSender/transporter");
const { EMAIL_ID, URL, SECRET_KEY } = require("../utils/config");

const userController = {
  register: async (request, response) => {
    try {
      const { name, email, password } = request.body;

      const user = await Users.findOne({ email });

      if (user) {
        return response.status(400).send({ message: "User already exists" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new Users({ name, email, password: hashedPassword });

      const savedUser = await newUser.save();

      response.status(201).send({
        message: "User created successfully",
        user: savedUser,
      });
    } catch (error) {
      response.status(500).send({ message: error.message });
    }
  },
  login: async (request, response) => {
    try {
      const { email, password } = request.body;
      const user = await Users.findOne({ email });
      if (!user) {
        return response.status(400).json({ message: "User not found" });
      }
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return response.status(400).send({ message: "Invalid password" });
      }
      response.status(200).json({ message: "Login succesfully" });
    } catch (error) {
      response.status(500).json({ message: error.message });
    }
  },
  forgot: async (request, response) => {
    try {
      const { email } = request.body;

      const user = await Users.findOne({ email });
      if (!user) {
        return response.status(404).json({ message: "User not found" });
      }

      const key = randomString();

      user.key = key;
      await user.save();

      transporter.sendMail({
        from: EMAIL_ID,
        to: email,
        subject: "Password Reset",
        text: `Click the link to reset your password: ${URL}/verify/${key}`,
      });

      response.status(200).json({
        message:
          "Password reset link has been sended to your registered email id",
      });
    } catch (error) {
      response.status(500).json({ message: error.message });
    }
  },
  verify: async (request, response) => {
    try {
      const { key } = request.params;

      const user = await Users.findOne({ key });

      if (!user) {
        return response.status(404).json({
          message: "The given key was not matched or link expiried!!!",
        });
      }
      response.status(200).json({
        message:
          "The given key is verified, Redirecting to password reset page",
      });
    } catch (error) {
      response.status(500).json({ message: error.message });
    }
  },
  reset: async (request, response) => {
    try {
      const { key, password } = request.body;

      const user = await Users.findOne({ key });
      if (!user) {
        return response
          .status(404)
          .json({ message: "The link was expiried!!!" });
      }
      const hashedPassword = await bcrypt.hash(password, 10);

      user.password = hashedPassword;
      user.key = "";
      await user.save();

      response
        .status(200)
        .json({ message: "Password is reseted successfully" });
    } catch (error) {
      response.status(500).json({ message: error.message });
    }
  },
};

module.exports = userController;

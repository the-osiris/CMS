import Admin from "../models/AdminSchema.js";
import Handler from "../models/HandlerSchema.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import Token from "../models/token.js";
import { sendEmail } from "../utils/sendEmail.js";
import crypto from "crypto";

const generateToken = (user) => {
  // console.log(process.env.JWT_SECRET_KEY, "authController");
  return jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: "7d",
  });
};

function isStrongPassword(password) {
  const strongPasswordRegex =
    /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
  // console.log(strongPasswordRegex.test(password));
  return strongPasswordRegex.test(password);
}

export const register = async (req, res) => {
  // console.log("register");
  const { name, email, password, cpassword } = req.body;
  // console.log(`${name}, ${email}, ${password}, ${cpassword} `);

  if (!isStrongPassword(password)) {
    return res
      .status(401)
      .json({ success: false, message: "Password is not strong enough" });
  }
  if (password != cpassword) {
    // console.log("26");
    return res
      .status(400)
      .json({ success: false, message: "Password do not match" });
  }

  try {
    let user = null;
    user = await Admin.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exist" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    user = new Admin({
      name,
      email,
      password: hashPassword,
    });
    // console.log(user);
    let temp = await user.save();
    // console.log(temp, "temp");

    const token = await new Token({
      userId: temp._id,
      token: crypto.randomBytes(32).toString("hex"),
    }).save();
    // console.log(token);

    const url = `${process.env.FRONT_URL}/user/${temp._id}/verify/${token.token}`;

    const html = `<h2>Hi ${temp.name}! Thanks for registering on our site </h2><h4> Please verfiy your mail to continue... </h4><a href=${url} >Verify your Email</a>`;
    // console.log(html);
    await sendEmail(temp.email, "Verify Email: Blue Soltech-BiB Expo", html);

    res.status(200).json({
      success: true,
      message: "An Email has been sent. Please Verify",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const login = async (req, res) => {
  const { email } = req.body;
  try {
    let user = null;
    user = await Admin.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordMatch = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!isPasswordMatch) {
      return res
        .status(400)
        .json({ status: false, message: "Invalid Credantials" });
    }

    if (!user.verified) {
      let token = await Token.findOne({ userId: user._id });
      if (!token) {
        token = await new Token({
          userId: user._id,
          token: crypto.randomBytes(32).toString("hex"),
        }).save();
        const url = `${process.env.FRONT_URL}/user/${user.id}/verify/${token.token}`;
        // console.log(url);
        const content = `<h2>Hi ${user.name}! Thanks for registering on our site </h2><h4> Please verfiy your mail to continue... </h4><a href=${url} >Verify your Email</a>`;
        // console.log(content);
        await sendEmail(
          user.email,
          "Verify Email: Blue Soltech-BiB Expo",
          content
        );
      }

      return res
        .status(400)
        .send({ message: "An Email sent to your account please verify" });
    }

    const token = generateToken(user);

    const { password, ...rest } = user._doc;

    res.status(200).json({
      status: true,
      message: "Successfully login",
      token,
      data: { ...rest },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: false, message: "Failed to login" });
  }
};
export const verify = async (req, res) => {
  try {
    // console.log("Entered Verification");
    const user = await Admin.findOne({ _id: req.params.id });
    // console.log("user", user);
    if (user.verified == true) {
      return res.status(200).send({ message: "Already Verified" });
    }
    if (!user) return res.status(400).send({ message: "Invalid link" });

    const token = await Token.findOne({
      userId: user._id,
      token: req.params.token,
    });
    // console.log("token", token);
    if (!token) return res.status(400).send({ message: "Invalid link" });

    await Admin.updateOne({ _id: user._id }, { $set: { verified: true } });
    // console.log("Updated");
    await Token.deleteOne({ _id: token._id });

    res.status(200).send({ message: "Email verified successfully" });
  } catch (error) {
    // console.log(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};
export const verifyroute = async (req, res) => {
  try {
    const user = await Admin.findOne({ _id: req.params.id });
    if (!user)
      return res.status(400).send({ message: "Invalid link", data: false });

    const token = await Token.findOne({
      userId: user._id,
      token: req.params.token,
    });
    // console.log("token", token);
    if (!token)
      return res.status(400).send({ message: "Invalid link", data: false });

    res
      .status(200)
      .send({ message: "Email verified successfully", data: true });
  } catch (error) {
    // console.log(error);
    res.status(500).send({ message: "Internal Server Error", data: false });
  }
};

export const forgot = async (req, res) => {
  // console.log("Entered Forgot");
  const { email } = req.body;
  try {
    let user = null;
    user = await Admin.findOne({ email });
    // console.log("user", user);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!user.verified) {
      return res.status(404).json({ message: "Email was not verified" });
      // resend verification mail
    }
    let token = await Token.findOne({ userId: user._id });
    if (!token) {
      token = await new Token({
        userId: user._id,
        token: crypto.randomBytes(32).toString("hex"),
      }).save();
    }
    const url = `${process.env.FRONT_URL}/user/${user._id}/forgot/${token.token}`;

    const html = `<h2>Hi ${user.name}! </h2>
                  <h4> Please change your password with this link </h4>
                  <a href=${url} >Change your Password</a>`;
    await sendEmail(user.email, "Change Password: Blue Soltech-BiB Expo", html);

    res.status(200).json({
      success: true,
      message: "An Email has been sent to change the Password",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: false, message: "Failed to send" });
  }
};

export const change = async (req, res) => {
  // console.log(req.body);
  const { newPassword, confirmPassword } = req.body;
  try {
    const user = await Admin.findOne({ _id: req.params.id });
    if (!user) return res.status(400).send({ message: "Invalid link" });
    // console.log("26");

    const token = await Token.findOne({
      userId: user._id,
      token: req.params.token,
    });
    // console.log("token", token);
    if (!token) return res.status(400).send({ message: "Invalid link" });
    // console.log("27");

    if (!isStrongPassword(newPassword)) {
      return res
        .status(401)
        .json({ success: false, message: "Password is not strong enough" });
    }
    // console.log("28");
    if (newPassword != confirmPassword) {
      return res
        .status(400)
        .json({ success: false, message: "Password do not match" });
    }

    // console.log("29");
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(newPassword, salt);

    // console.log("30");
    await Admin.updateOne(
      { _id: user._id },
      { $set: { password: hashPassword } }
    );
    // console.log("Updated");
    await Token.deleteOne({ _id: token._id });

    res.status(200).send({ message: "Password updated successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

export const handlerlogin = async (req, res) => {
  const { username, password } = req.body;
  try {
    let user = null;
    user = await Handler.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: "Handler not found" });
    }

    if (password !== user.password) {
      return res
        .status(400)
        .json({ status: false, message: "Invalid Credantials" });
    }

    const token = generateToken(user);

    const { event, _id } = user._doc;

    res.status(200).json({
      status: true,
      message: "Successfully login",
      token,
      data: { event, _id },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: false, message: "Failed to login" });
  }
};

import Admin from "../models/AdminSchema.js";
import Faculty from "../models/FacultySchema.js";
import Student from "../models/StudentSchema.js";
import Account from "../models/AccountSchema.js";

export const isAdmin = async (req, res) => {
  //   console.log(req.body);
  let admin = null;
  admin = await Admin.find({ _id: req.body.userId });
  // console.log(admin);
  if (admin.length > 0) {
    res.status(200).send({ success: true, message: "Admin Exist" });
  } else
    res.status(400).send({ success: false, message: "Admin do not exist" });
};
export const isUser = async (req, res) => {
  // console.log(req.body);
  let account = null, student = null, faculty = null;
  account = await Account.find({ _id: req.body.userId });
  student = await Student.find({ _id: req.body.userId });
  faculty = await Faculty.find({ _id: req.body.userId });
  // console.log(handler);
  if (account.length > 0 || student.length > 0 || faculty.length > 0) {
    res.status(200).send({ success: true, message: "User Exist" });
  } else
    res.status(400).send({ success: false, message: "User do not exist" });
};


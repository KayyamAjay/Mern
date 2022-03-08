const User = require("../model/users");
const HttpError = require("../model/Httperror");
const { validationResult } = require("express-validator");

const getallUsers = async (req, res) => {
  const users = await User.find({}, "-password");
  res.send({ users });
};

const getuserbyId = async (req, res) => {
  const userid = req.params.uid;
  const user = await User.findById(userid);
  if (!user) {
    res.send("No user Found!");
  } else {
    res.send({ user });
  }
};
const signup = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new HttpError("Invalid Inputs, please check the data!", 422);
  }
  const { firstname, lastname, email, password } = req.body;

  const existinguser = await User.findOne({ email: email });
  console.log(existinguser);

  if (!existinguser) {
    const createdUser = new User({
      firstname,
      lastname,
      email,
      password,
    });
    createdUser.save((err) => {
      if (err) {
        console.log(err);
      }
    });
    res.status(201).send({ user: createdUser });
  } else {
    res.send("User already exists, Please Login!");
  }
};

const login = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new HttpError("Invalid Inputs, please check the data!", 422);
  }
  const { email, password } = req.body;
  const existinguser = await User.findOne({ email: email });
  if (!existinguser) {
    res.json({ message: "No User found, Please Signup to continue!" });
  } else {
    if (existinguser.password !== password) {
      res.json("invalid password");
    }
    if (existinguser && existinguser.password === password) {
      res.json({ message: "Succesfully LoggedIn!" });
    }
  }
};

exports.login = login;
exports.signup = signup;
exports.getallUsers = getallUsers;
exports.getuserbyId = getuserbyId;

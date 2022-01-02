import passport from "passport";
import bcrypt from "bcrypt";
import User from "../models/User.js";

export const login = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) throw err;
    if (!user) res.send("No User Exists");
    else {
      req.logIn(user, (err) => {
        if (err) throw err;
        res.send("Successfully Authenticated");
        console.log(req.user);
      });
    }
  })(req, res, next);
};

export const logout = (req, res) => {
  req.logout();
  res.send("logout done");
};

export const register = (req, res) => {
  try {
    const { username, password, password2 } = req.body;
    console.log(` Name: ${username} pass: ${password}`);
    if (!username || !password || !password2)
      throw new Error("Please fill in all fields");

    if (password !== password2) throw new Error("passwords dont match");

    User.findOne({ username: req.body.username }, async (err, doc) => {
      if (err) throw err;
      if (doc) res.send("User Already Exists");
      console.log("creating user");
      if (!doc) {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const newUser = new User({
          username: req.body.username,
          password: hashedPassword,
          admin: false,
          group: "no-group",
        });
        await newUser.save();
        res.send("User Created");
      }
    });
  } catch (err) {
    res.send(err.message);
  }
};
export const getUser = (req, res) => res.send(req.user);

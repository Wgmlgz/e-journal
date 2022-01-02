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

// export const logout = (req, res) =>{
//   console.log('logout'); req.logout(); res.status(200)}

export const register = (req, res) => {
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
      });
      await newUser.save();
      res.send("User Created");
    }
  });
};
export const getUser = (req, res) => res.send(req.user);

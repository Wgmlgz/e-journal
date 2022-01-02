import express from "express";
import User from "../models/user.js";
import bcrypt from "bcrypt";
import passport from "passport";
import ensureAuthenticated from "../config/auth.js";

//login handle
const router = express.Router();

//Register handle
router.post("/login", (req, res, next) => {
  passport.authenticate("local", function (err, user, info) {
    if (err) return next(err);
    if (!user) return res.status(422).json({ err: info.message });
    req.logIn(user, function (err) {
      if (err) return next(err);
      return res.status(202).json({ user: user });
    });
  })(req, res, next);
  console.log(res);
});
//register post handle
router.post("/register", (req, res) => {
  try {
    const { name, password, password2 } = req.body;
    console.log(` Name: ${name} pass: ${password}`);
    if (!name || !password || !password2)
      throw new Error("Please fill in all fields");

    //check if match
    if (password !== password2) throw new Error("passwords dont match");

    //check if password is more than 6 characters
    if (password && password.length < 6) {
      throw new Error("password atleast 6 characters");
    }
    //validation passed
    User.findOne({ name: name }).exec((err, user) => {
      try {
        if (err) throw err;
        console.log(user);
        if (user) {
          throw new Error("this username is already registered");
        } else {
          const newUser = new User({
            name: name,
            password: password,
          });

          //hash password
          bcrypt.genSalt(10, (err, salt) =>
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              if (err) throw err;
              //save pass to hash
              newUser.password = hash;
              //save user
              newUser
                .save()
                .then((value) => {
                  console.log(value);
                  res.status(201).json({ user: value });
                })
                .catch((value) => console.log(value));
            })
          );
        }
      } catch (err) {
        res.status(422).json({ err: err.message });
      }
    });
  } catch (err) {
    res.status(422).json({ err: err.message });
  }
});
//logout
router.get("/logout", (req, res) => {
  // req.logout();
  // req.flash("success_msg", "Now logged out");
  // res.redirect("/users/login");
});

router.post("/dashboard", (req, res) => {
  res.status(201).json({ user: req.user });
});
export default router;

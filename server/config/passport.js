import User from "../models/User.js";

import da from "passport-local";
const LocalStrategy = da.Strategy;
import bcrypt from "bcrypt";

export default function (passport) {
  passport.use(
    new LocalStrategy((name, password, done) => {
      User.findOne({ username: name })
        .then((user) => {
          if (!user) {
            return done(null, false, { name: "email not registered" });
          }
          //math passwords
          bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) throw err;
            if (isMatch) { 
              return done(null, user);
            } else {
              return done(null, false, { message: "password incorrect" });
            }
          });
        })
        .catch((err) => {
          console.log(err);
        });
    })
  );
  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });
  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      done(err, user);
    });
  });
}

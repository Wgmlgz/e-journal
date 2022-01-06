import UserModel, { IUser } from '../models/User';

import da from 'passport-local';
const LocalStrategy = da.Strategy;
import bcrypt from 'bcrypt';
import { PassportStatic } from 'passport';

export default function (passport: PassportStatic) {
  passport.use(
    new LocalStrategy((name, password, done) => {
      UserModel.findOne({ username: name })
        .then((user) => {
          if (!user) {
            return done(null, false, { message: 'email not registered' });
          }
          //math passwords
          bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) throw err;
            if (isMatch) {
              return done(null, user);
            } else {
              return done(null, false, { message: 'password incorrect' });
            }
          });
        })
        .catch((err) => {
          console.log(err);
        });
    })
  );

  passport.serializeUser((user: any, done) => {
    done(null, user.id);
  });
  passport.deserializeUser((id, done) => {
    UserModel.findById(id, (err: Error, user: IUser) => {
      done(err, user);
    });
  });
}

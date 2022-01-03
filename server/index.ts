import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";

import teacherRoutes from "./routes/teacher";
import authRoutes from "./routes/auth";
import adminRoutes from "./routes/admin";
import usersRoutes from "./routes/users";

import cookieParser from "cookie-parser";
import session from "express-session";
import passport from "passport";
import config_passport from "./config/passport";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(
  session({
    secret: "secretcode",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(cookieParser("secretcode"));
app.post('a', (res, req) => {})
app.use(passport.initialize());
app.use(passport.session());
config_passport(passport);
app.use("/teacher", teacherRoutes);
app.use("/", authRoutes);
app.use("/admin", adminRoutes);
app.use("/users", usersRoutes);

const CONNECTION_URL = "mongodb://127.0.0.1:27017/e-test";
const PORT = process.env.port || 5000;

mongoose
  .connect(CONNECTION_URL)
  .then(() =>
    app.listen(PORT, () => console.log(`server goes brrrrrr at ${PORT}`))
  )
  .catch((err) => console.log(err.message));

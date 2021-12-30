import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'
import teacherRoutes from "./routes/teacher.js";

const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/teacher", teacherRoutes);

const CONNECTION_URL =
  "mongodb+srv://wgmlgz:1234@cluster0.8tj2b.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const PORT = process.env.port || 5000;

mongoose.connect(CONNECTION_URL)
  .then(()=> 
    app.listen(PORT, () => console.log(`server goes brrrrrr at ${PORT}`))
  )
  .catch((err)=>console.log(err.message))

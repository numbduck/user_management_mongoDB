const express = require("express");
const app = express();
// const mysql = require("mysql");
const cors = require("cors");
const mongoose = require("mongoose")

app.use(cors());
app.use(express.json());

// app.use(cors(
//   {
//     origin : ["https://user-management-mongo-db.vercel.app/"],
//     methods :["POST", "GET", "DELETE", "PUT"],
//     credentials : true
//   }
// ))

mongoose.connect("mongodb+srv://adityagreen:3zIYi9sYmrS5IWG1@cluster0.ynhw5pu.mongodb.net/users_db",{useNewUrlParser: true, useUnifiedTopology:true, dbName:'users_db'});


const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  id: Number,
  phone: Number
})

const UserModel = mongoose.model("users", userSchema);


app.get("/", (req, res) => {
      UserModel.find().then(users => res.json(users)).catch((err)=> console.log(err))
      console.log(UserModel.find())
});

app.post('/create', (req, res) => {
  UserModel.create(req.body)
  .then(user => res.json(user))
  .catch(err => res.json(err))
})

app.put('/update/:id', (req, res) => {
  const id = req.params.id;
  UserModel.findByIdAndUpdate({_id: id}, {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone
  }).then(user => res.json(user))
  .catch(err => res.json(err))
})

app.delete('/deleteuser/:id', (req, res) => {
  const id = req.params.id;
  UserModel.findByIdAndDelete({_id: id})
  .then(response => res.json(response))
  .catch(err => res.json(err))
})


app.listen(3001, () => {
  console.log("the server is running");
});

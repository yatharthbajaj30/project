const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const app = express();
const PORT = 7789;

app.use(bodyParser.json());
app.use(cors());
app.options('*', cors());
mongoose.connect("mongodb://localhost:27017/test");

const db = mongoose.connection;

db.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});

db.once("open", () => {
  console.log("Connected to MongoDB");
});

const UserSchema = new mongoose.Schema({
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["admin", "user"], // Add any other roles as needed
      default: "user",
    },
  });
  
  const User = mongoose.model("User", UserSchema);
  app.post("/api/Login", async (req, res) => {
    const { username, password } = req.body;
  
    if (!username || !password) {
      return res.status(400).send("Please provide username and password");
    }
  
    try {
      const user = await User.findOne({ username });
  
      if (!user) {
        throw new Error("User not Found");
      }
  
      const passwordIsCorrect = await bcrypt.compare(password, user.password);
      if(!passwordIsCorrect)
      {
        return res.status(400).send("Invalid");
      }
      if (user && passwordIsCorrect) {
        const payload = {
          user: {
            username: user.username,
            role: user.role,
          },
        };
       
        jwt.sign(payload, "SECRET", (err, token) => {
          if (err) {
            throw new Error(err);
          }
          res.status(200).json({ token: token, role: user.role });
        });
      }
    } catch (err) {
      res.status(401).send(err);
    }
  });
  app.post("/api/Register", async (req, res) => {
    let { username, password, role } = req.body;

    let salt = await bcrypt.genSalt(10);
    
    let hashpassword = await bcrypt.hash(password,salt)
    const user = await User.create({ username, password:hashpassword, role });
    res.status(201).send("Register Successfully");
  });
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
  
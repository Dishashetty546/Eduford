const express = require("express");
const collection = require("./models/Login");

const cors = require("cors");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/", cors(), (req, res) => {});

app.post("/", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await collection.findOne({ email: email });
    if (user) {
      if (user.password === password) {
        res.json("exist");
      } else {
        res.json("wrong password");
      }
    } else {
      res.json("not exist");
    }
  } catch (e) {
    console.error("Error during login:", e.message);
    res.status(500).json("server error");
  }
});

app.post("/signup", async (req, res) => {
  const { email, password } = req.body;

  const data = {
    email: email,
    password: password,
  };

  try {
    const user = await collection.findOne({ email: email });
    if (user) {
      res.json("exist");
    } else {
      await collection.insertMany([data]);
      res.json("not exist");
    }
  } catch (e) {
    console.error("Error during signup:", e.message);
    res.status(500).json("server error");
  }
});

app.listen(3000, () => {
  console.log("port connected");
});

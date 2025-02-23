const express = require("express");
const userModel = require("./models/model");
const { keypair } = require("@solana/web3.js");
const app = express();

app.post("/api/v1/signup", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const keypair = new keypair();
  await userModel.create({
    username: username,
    password: password,
    publicKey: keypair.publicKey.toString(),
    privateKey: keypair.secretKey.toString(),
  });
  const existingUser = await userModel.findOne({ name: username });
  if (existingUser) {
    res.json({
      message: "User already exists",
    });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new userModel({
    name: username,
    password: hashedPassword,
  });
  await user.save();

  res.json({
    message: "User created successfully",
  });
});

app.post("/api/v1/signin", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const user = await userModel.findOne({ name: username });
  if (!user) {
    res.json({
      message: "User not found",
    });
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    res.json({
      message: "Invalid password",
    });
  }
  const token = jwt.sign({ username }, "secretkey", { expiresIn: "1h" });
  res.json({
    message: "User signed in successfully",
    token,
  });
});

app.post("/api/v1/stxn/sign", (req, res) => {
  res.json({
    message: "User created successfully",
  });
});
app.get("/api/v1/stxn", (req, res) => {
  res.json({
    message: "User created successfully",
  });
});

app.listen(4000);

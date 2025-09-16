import express from "express";
import cors from "cors";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import { MongoClient, ServerApiVersion, ObjectId } from "mongodb";

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Atlas
const uri ="mongodb+srv://richardnickson2002:BGcRx5kINeM6s2O7@cluster0.n7xnzo6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri, {
  serverApi: { version: ServerApiVersion.v1, strict: true, deprecationErrors: true },
});

const JWT_SECRET = "supersecretkey"; // store in env file in production

// ---------------- CONNECT DB ----------------
async function connectDB() {
  try {
    await client.connect();
    console.log("Connected to MongoDB Atlas");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
}
connectDB();


// Signup API
app.post("/signup", async (req, res) => {
  try {
    const { username, userEmail, userPassword } = req.body;

    if (!username || !userEmail || !userPassword) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }

    // Check if user already exists
    const existing = await client
      .db("EventLogin")
      .collection("users")
      .findOne({ userEmail });

    if (existing) {
      return res.status(400).json({
        message:"User already exists!",
        isuserin:false
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(userPassword, 10);

    // Save new user
    await client.db("EventLogin").collection("users").insertOne({
      username:username,
      userEmail:userEmail,
      userPassword: hashedPassword,
    });

    res.status(201).json({
      message:{
        msg:"User created successfully!",
      isuserin:true}
      
    });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({
      message:"Server error",
       error
    });
  }
});

// ---------------- LOGIN ----------------
app.post("/login", async (req, res) => {
  try {
    const { userEmail, userPassword } = req.body;
    const userCollection = client.db("EventLogin").collection("users");

    const user = await userCollection.findOne({ userEmail });
    if (!user) return res.status(400).json({ message: "User not found", isuserin:false });

    const isPasswordValid = await bcrypt.compare(userPassword, user.userPassword);
    if (!isPasswordValid) return res.status(400).json({ message: "Invalid password", isuserin:false });

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1h" });

    res.json({ message: "Login successful", token, isuserin:true });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error });
  }
});

// ---------------- FORGOT PASSWORD ----------------
app.post("/forgot-password", async (req, res) => {
  try {
    const { userEmail } = req.body;
    const userCollection = client.db("EventLogin").collection("users");

    const user = await userCollection.findOne({ userEmail });
    if (!user) return res.status(400).json({ message: "User not found" });

    const resetToken = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "15m" });

    // Transporter (use real email service in production)
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: "richardnickson2002@gmail.com", pass: "cqmq sawr pygn nkfw" }, //  use App Password
    });

    const resetLink = `http://localhost:3000/reset-password/${resetToken}`;

    await transporter.sendMail({
      from: "richardnickson2002@gmail.com",
      to: userEmail,
      subject: "Password Reset Request",
      text: `Click here to reset your password: ${resetLink}`,
    });

    res.json({ message: "Password reset link sent to email" });
  } catch (error) {
    res.status(500).json({ message: "Error sending reset email", error });
  }
});


// ---------------- RESET PASSWORD ----------------
app.post("/reset-password/:token", async (req, res) => {
  try {
    const { token } = req.params;
    const { newPassword } = req.body;

    const decoded = jwt.verify(token, JWT_SECRET);
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await client
      .db("EventLogin")
      .collection("users")
      .updateOne({ _id: new ObjectId(decoded.id) }, { $set: { userPassword: hashedPassword } });

    res.json({ message: "Password reset successful" });
  } catch (error) {
    res.status(500).json({ message: "Invalid or expired token", error });
  }
});

// ---------------- START SERVER ----------------
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import nodemailer from "nodemailer";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const prisma = new PrismaClient();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "suportetesteguilherme@gmail.com",
    pass: "uyfqjyseteelqjyi",
  },
});

app.post("/send-email", async (req, res) => {
  const { email, event } = req.body;

  try {
    const mailOptions = {
      from: "suportetesteguilherme@gmail.com",
      to: email,
      subject: `Subscription confirmed to ` + event.name,
      text: "Congratulations, your subscription has been confirmed!",
    };

    await transporter.sendMail(mailOptions);
    res.json({ message: "E-mail sent successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to send e-mail" });
  }
});

const port = 3003;
app.listen(port, () => {
  console.log("App is running on port:", `http://localhost:${port}`);
});

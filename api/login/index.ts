import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import { z } from "zod";
import * as bcrypt from "bcrypt";

const registerSchema = z.object({
  name: z.string().optional(),
  email: z.string().email(),
  password: z.string().nonempty(),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().nonempty(),
});

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const prisma = new PrismaClient();

const JWT_SECRET = "mysecretkey";

app.post("/register", async (req, res) => {
  const result = await registerSchema.safeParseAsync(req.body);
  if (!result.success) {
    return res.status(400).json({
      error: result.error.message,
    });
  }

  const { data } = result;

  const emailAlreadyExists = await prisma.user.findFirst({
    where: {
      email: data.email,
    },
  });

  if (emailAlreadyExists) {
    return res.status(409).json({
      error: "Email already exists",
    });
  }

  const encryptedPassword = await bcrypt.hash(data.password, 10);
  const user = await prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
      password: encryptedPassword,
    },
  });

  return res.status(201).json({
    id: user.id,
    name: user.name,
    email: user.email,
  });
});

app.post("/login", async (req, res) => {
  const result = await loginSchema.safeParseAsync(req.body);
  if (!result.success) {
    return res.status(400).json({
      error: result.error.message,
    });
  }

  const { data } = result;

  const user = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
  });

  if (!user) {
    return res.status(401).json({
      error: "Invalid email or password",
    });
  }

  const passwordsMatch = await bcrypt.compare(data.password, user.password);
  if (!passwordsMatch) {
    return res.status(401).json({
      error: "Invalid email or password",
    });
  }

  const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
    expiresIn: "24h",
  });

  return res.status(200).json({
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
  });
});

app.get("/verify", async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Token not provided" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: number };
    const user = await prisma.user.findFirst({
      where: {
        id: decoded.userId,
      },
    });

    if (user) {
      return res.status(200).json({
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      });
    }

    return res.status(401).json({ error: "Token is not valid" });
  } catch (error) {
    return res.status(401).json({ error: "Token is not valid" });
  }
});

const port = 3000;
app.listen(port, () => {
  console.log("App is running on port:", `http://localhost:${port}`);
});

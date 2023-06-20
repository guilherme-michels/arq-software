import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import { LoginServiceImpl, registerSchema } from "./src/LoginController";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const prisma = new PrismaClient();
const loginService = new LoginServiceImpl(prisma);

app.post("/register", async (req, res) => {
  const result = await registerSchema.safeParseAsync(req.body);
  if (!result.success) {
    return res.status(400).json({
      error: result.error.message,
    });
  }
});
app.post("/login", loginService.login);
app.get("/verify", loginService.verify);

const port = 3000;
app.listen(port, () => {
  console.log("App is running on port:", `http://localhost:${port}`);
});

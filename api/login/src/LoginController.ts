import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

import { z } from "zod";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerSchema = z.object({
  name: z.string().optional(),
  email: z.string().email(),
  password: z.string().nonempty(),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().nonempty(),
});

export type RegisterPayload = z.infer<typeof registerSchema>;
export type LoginPayload = z.infer<typeof loginSchema>;

export interface LoginService {
  register(request: Request, response: Response): Promise<Response>;
  login(request: Request, response: Response): Promise<Response>;
  verify(request: Request, response: Response): Promise<Response>;
}

const JWT_SECRET = "mysecretkey";

export class LoginServiceImpl implements LoginService {
  constructor(private prisma: PrismaClient) {}

  async register(req: Request, res: Response) {
    const result = await registerSchema.safeParseAsync(req.body);
    if (!result.success) {
      return res.status(400).json({
        error: result.error.message,
      });
    }

    const { data } = result;

    const emailAlreadyExists = await this.prisma.user.findFirst({
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
    const user = await this.prisma.user.create({
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
  }

  async login(req: Request, res: Response) {
    const result = await loginSchema.safeParseAsync(req.body);
    if (!result.success) {
      return res.status(400).json({
        error: result.error.message,
      });
    }

    const { data } = result;

    const user = await this.prisma.user.findUnique({
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
  }

  async verify(req: Request, res: Response) {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ error: "Token not provided" });
    }

    try {
      const decoded = jwt.verify(token, JWT_SECRET) as { userId: number };
      const user = await this.prisma.user.findFirst({
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
  }
}

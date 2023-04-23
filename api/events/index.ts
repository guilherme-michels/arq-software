import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import { z } from "zod";

const eventSchema = z.object({
  name: z.string().min(1).max(255),
  date: z.date(),
  location: z.string().min(1).max(255),
});

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const prisma = new PrismaClient();

const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
  // Verifica token vindo do client para que só usuários reais possam
  // consultar a lista de eventos

  const token = req.headers.authorization?.split(` `)[1];

  try {
    const response = await fetch("http://localhost:3000/verify", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 401) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const data = await response.json();

    (req as any).user = data.user;
    return next();
  } catch (error) {
    return res.status(401).json({ error: "Unauthorized" });
  }
};

app.get("/events", verifyToken, async (req, res) => {
  try {
    const events = await prisma.event.findMany({
      select: {
        id: true,
        name: true,
        date: true,
        location: true,
      },
    });
    return res.json(events);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/events/:id/subscribe", verifyToken, async (req, res) => {
  const eventId = Number(req.params.id);
  const userId = (req as any).user.id;

  const event = await prisma.event.findFirst({
    where: {
      id: Number(eventId),
    },
  });

  if (event == null) {
    return res.status(404).json({ error: "Event not found" });
  }

  const eventSubscription = await prisma.eventSubscription.create({
    data: {
      userId,
      eventId,
    },
  });

  return res.json({ eventSubscription });
});

app.post("/events/:id/cancel-subscription", verifyToken, async (req, res) => {
  const eventId = Number(req.params.id);
  const userId = Number((req as any).user.id);

  const eventSubscription = await prisma.eventSubscription.findFirst({
    where: {
      eventId,
      userId,
    },
  });

  if (eventSubscription == null) {
    return res.status(404).json({ error: "Event subscription not found" });
  }

  await prisma.eventSubscription.delete({
    where: {
      id: eventSubscription.id,
    },
  });

  return res.json({ eventSubscription });
});

const port = 3001;
app.listen(port, () => {
  console.log("App is running on port:", `http://localhost:${port}`);
});

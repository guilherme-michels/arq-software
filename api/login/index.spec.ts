import { describe, test, expect, vitest, beforeEach } from "vitest";
import { LoginServiceImpl } from "./src/LoginController";
import { PrismaClient, User } from "@prisma/client";
import { Request } from "express";
import bcrypt from "bcrypt";

const mockResponse = () => {
  const res = {} as any;
  res.status = vitest.fn().mockReturnValue(res);
  res.json = vitest.fn().mockReturnValue(res);
  res.send = vitest.fn().mockReturnValue(res);
  // Add any other methods required for testing

  return res;
};

const prisma = new PrismaClient();
const loginService = new LoginServiceImpl(prisma);

describe("Register", () => {
  beforeEach(() => {
    vitest.clearAllMocks();
  });

  describe("Quando um usuário insere um e-mail/senha inválidos", () => {
    test("Deve retornar um 400", async () => {
      const response = mockResponse();
      await loginService.register(
        { body: { email: "me@email.com" } } as Request,
        response
      );

      expect(response.status).toHaveBeenCalledWith(400);
    });
  });

  describe("Quando um usuário insere um e-mail já existente", () => {
    test("Deve retornar um 409", async () => {
      // @ts-expect-error Typing is broken
      vitest.spyOn(prisma.user, "findFirst").mockReturnValue({} as User);

      const response = mockResponse();
      await loginService.register(
        { body: { email: "me@email.com", password: "password" } } as Request,
        response
      );

      expect(response.status).toHaveBeenCalledWith(409);
    });
  });

  describe("Quando um usuário insere um email/senha válidos", () => {
    test("Deve retornar um 201", async () => {
      // @ts-expect-error Typing is broken
      vitest.spyOn(prisma.user, "findFirst").mockReturnValue(null);
      // @ts-expect-error Typing is broken
      vitest.spyOn(prisma.user, "create").mockReturnValue({} as User);

      const response = mockResponse();
      await loginService.register(
        { body: { email: "me@email.com", password: "password" } } as Request,
        response
      );

      expect(response.status).toHaveBeenCalledWith(201);
    });
  });
});

describe("Login", () => {
  describe("Quando um usuário tenta logar com e-mail/senha inválidos", async () => {
    test("Deve retornar um 401", async () => {
      // @ts-expect-error Typing is broken
      vitest.spyOn(prisma.user, "findUnique").mockReturnValue(null as User);

      const response = mockResponse();
      await loginService.login(
        { body: { email: "me@email.com", password: "123" } } as Request,
        response
      );

      expect(response.status).toBeCalledWith(401);
    });
  });

  describe("Quando um usuário tenta logar com e-mail/senha válidos", async () => {
    test("Deve retornar um 200", async () => {
      const encryptedPassword = await bcrypt.hash("123", 10);

      vitest
        .spyOn(prisma.user, "findUnique")
        // @ts-expect-error Typing is broken
        .mockReturnValue({ password: encryptedPassword } as User);
      // @ts-expect-error Typing is broken
      vitest.spyOn(prisma.user, "create").mockReturnValue({} as User);

      const response = mockResponse();
      await loginService.login(
        { body: { email: "me@email.com", password: "123" } } as Request,
        response
      );

      expect(response.status).toBeCalledWith(200);
    });
  });
});

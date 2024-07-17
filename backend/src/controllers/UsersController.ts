import { Request, Response } from "express";
import * as UsersDao from "../dao/UsersDao";
import Users from "../models/Users";
import * as JwtUtils from "../utils/JwtUtils";

interface LoginDto {
  account: string;
  password: string;
}

export async function login(request: Request, response: Response) {
  try {
    const loginDto: LoginDto = request.body;
    const users: Users | null = await UsersDao.findByAccount(loginDto.account);
    if (!users) {
      response.status(404).send("Account Not Found");
      return;
    }

    const isPasswordMatched: boolean = users!.password === loginDto.password;
    if (!isPasswordMatched) {
      response.status(400).send("wrong password");
      return;
    }

    const token = JwtUtils.getJwtToken({ account: users.account });

    response.status(200).json({
      status: 200,
      success: true,
      message: "login success",
      token: token,
    });
  } catch (error: any) {
    console.error(error.message, error.stack);
    response.status(400).send(error.message.toString());
    return;
  }
}

export async function verify(request: Request, response: Response) {
  try {
    const authHeader = request.headers["authorization"];
    const token = authHeader?.split(" ")[1];

    if (!token) {
      response.status(401).send("No token provided");
      return;
    }

    const verified = JwtUtils.verify(token);

    if (!verified) {
      response.status(401).send("Invalid token");
      return;
    }

    response.status(200).send("verify success");
  } catch (error: any) {
    console.error(error.message, error.stack);
    response.status(401).send(error.message.toString());
  }
}

import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface Payload {
  sub: string;
}

export function isAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
){
  // Receber o token

  const authToken = req.headers.authorization;

  if (!authToken) {
    return res.status(401).end();
  }

  const [prefix, token] = authToken.split(" ");

  if(!prefix || prefix !== "Bearer"){
    return res.status(401).end();
  }

  try{
    //validar token e pegar o id do usuário
    const { sub } = verify(
      token, 
      process.env.SECRET_KEY
    ) as Payload;

    req.user_id = sub;

  }catch(err){
    return res.status(401).end();
  }

  return next();
}
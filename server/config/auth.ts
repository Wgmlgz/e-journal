import express, { NextFunction, Request, Response } from "express";

export default function ensureAuthenticated(req: Request, res: Response, next: NextFunction) {
  // console.log(req);
  // console.log(req[user])
  // req.LogIn
  if (req.isAuthenticated()) return next();

  res.status(401).json({ err: "please login to view this resource" });
}


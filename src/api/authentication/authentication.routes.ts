import { type Router } from "express";
import authenticationController from "./authentication.controller";

export const registerAuthenticationRoutes = (routes: Router) => {
  routes.post("/login", authenticationController.login);

  return routes
}
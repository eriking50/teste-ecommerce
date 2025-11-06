import { type Router } from "express";
import billingEngineController from "./billingEngine.controller";

export const registerBillingEngineRoutes = (routes: Router) => {
  routes.post("/billing-engine", billingEngineController.execute);

  return routes
}
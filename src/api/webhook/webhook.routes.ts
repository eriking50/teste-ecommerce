import { type Router } from "express";
import cartController from "./webhook.controller";
import { ValidationMidleware } from "src/infrastructure/midlewares/Validator.midleware";
import { UpdateTransactionStatusDTO } from "src/shared/dtos/updateTransactionStatus.dto";

export const registerWebhookRoutes = (routes: Router) => {
  routes.post("/webhooks/payment", ValidationMidleware(UpdateTransactionStatusDTO), cartController.createCustomer);

  return routes
}
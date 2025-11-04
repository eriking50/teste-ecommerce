import { type Router } from "express";
import cartController from "./cart.controller";
import { OpenCartDTO } from "src/shared/dtos/openCart.dto";
import { ValidationMidleware } from "src/infrastructure/midlewares/Validator.midleware";

export const registerCartRoutes = (routes: Router) => {
  routes.post("/cart/open", ValidationMidleware(OpenCartDTO), cartController.openCart);
  routes.post("/cart/:id/checkout", cartController.checkoutCart);

  return routes
}
import { type Router } from "express";
import cartController from "./cart.controller";
import { OpenCartDTO } from "src/shared/dtos/openCart.dto";
import { ValidationMidleware } from "src/infrastructure/midlewares/Validator.midleware";
import { CheckoutCartDTO } from "src/shared/dtos/checkoutCart.dto";
import { AuthenticationMidleware } from "src/infrastructure/midlewares/Authentication.middleware";

export const registerCartRoutes = (routes: Router) => {
  routes.post("/cart/open", AuthenticationMidleware, ValidationMidleware(OpenCartDTO), cartController.openCart);
  routes.post("/cart/:cartId/checkout", AuthenticationMidleware, ValidationMidleware(CheckoutCartDTO), cartController.checkoutCart);

  return routes
}
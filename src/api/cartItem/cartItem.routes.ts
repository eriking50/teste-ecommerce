import { type Router } from "express";
import CartItemController from "./cartItem.controller";
import { ValidationMidleware } from "src/infrastructure/midlewares/Validator.midleware";
import { AddCartItemDTO } from "src/shared/dtos/addCartItem.dto";
import { AuthenticationMidleware } from "src/infrastructure/midlewares/Authentication.middleware";

export const registerCartItemRoutes = (routes: Router) => {
  routes.delete("/cart/:cartId/cart-item/:itemId", AuthenticationMidleware, CartItemController.removeCartItem);
  routes.post("/cart/:cartId/cart-item", AuthenticationMidleware, ValidationMidleware(AddCartItemDTO), CartItemController.addCartItem);

  return routes
}
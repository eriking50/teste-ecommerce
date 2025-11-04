import { type Router } from "express";
import CartItemController from "./cartItem.controller";
import { ValidationMidleware } from "src/infrastructure/midlewares/Validator.midleware";
import { AddCartItemDTO } from "src/shared/dtos/addCartItem.dto";

export const registerCartItemRoutes = (routes: Router) => {
  routes.delete("/cart/:cartId/cart-item/:itemId", CartItemController.removeCartItem);
  routes.post("/cart/:cartId/cart-item", ValidationMidleware(AddCartItemDTO), CartItemController.addCartItem);

  return routes
}
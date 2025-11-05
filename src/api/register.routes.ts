import express, { type Router } from "express";
import { registerCartRoutes } from "./cart/cart.routes";
import { registerCartItemRoutes } from "./cartItem/cartItem.routes";
import { registerCustomerRoutes } from "./customer/customer.routes";
import { registerWebhookRoutes } from "./webhook/webhook.routes";

const routes: Router = express.Router();

registerCartRoutes(routes);
registerCartItemRoutes(routes);
registerCustomerRoutes(routes);
registerWebhookRoutes(routes);

export default routes;
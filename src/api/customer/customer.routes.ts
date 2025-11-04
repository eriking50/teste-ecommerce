import { type Router } from "express";
import cartController from "./customer.controller";
import { ValidationMidleware } from "src/infrastructure/midlewares/Validator.midleware";
import { CreateCustomerDTO } from "src/shared/dtos/createCustomer.dto";

export const registerCustomerRoutes = (routes: Router) => {
  routes.post("/customer", ValidationMidleware(CreateCustomerDTO), cartController.createCustomer);

  return routes
}
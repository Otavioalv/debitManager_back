import { Router } from 'express';

import { customersController } from './customers.container';
import { validateParams, validateQuery } from './customers.validation';

const customersRouter = Router();

// list many
customersRouter.get(
    "/",
    validateQuery,
    customersController.listCustomers,
);

// list by id
customersRouter.get(
    "/:id",
    validateParams,
    customersController.getCustomerById,
);


// router.get("/products", ProductsController.listProduct);
// router.get("/products/:id", validateProductId, ProductsController.listProductById);


// // ADD PRODUCT
// router.post("/products", validateProductData, ProductsController.addNewProduct);

// // UPDATE PRODUCT
// router.put("/products/:id", 
//     validateProductId,
//     validateProductData,
//     ProductsController.updateProduct,
// );

// // DELETE PRODUCT
// router.delete("/products/:id", validateProductId, ProductsController.deleteProduct);

export default customersRouter;


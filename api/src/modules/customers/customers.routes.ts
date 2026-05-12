import { Router } from 'express';

import { customersController } from './customers.container';


const customersRouter = Router();
customersRouter.get("/", customersController.listCustomer);


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


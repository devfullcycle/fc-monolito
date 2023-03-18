import express, { Request, Response } from "express";
import ProductAdmAddProductUseCase from "../../../modules/product-adm/usecase/add-product/add-product.usecase";
import ProductRepository from "../../../modules/product-adm/repository/product.repository"
import StoreCatalogFindAllProductsUseCase from "../../../modules/store-catalog/usecase/find-all-products/find-all-products.usecase"
import StoreCatalogProductRepository from "../../../modules/store-catalog/repository/product.repository"

export const productsRoute = express.Router();

productsRoute.get("/", async (req: Request, res: Response) => {
  const usecase = new StoreCatalogFindAllProductsUseCase(new StoreCatalogProductRepository());

  try {
    const output = await usecase.execute();

    res.send(output);
  } catch (err) {
    res.status(500).send(err);
  }
});

productsRoute.post("/", async (req: Request, res: Response) => {
  const usecase = new ProductAdmAddProductUseCase(new ProductRepository());
  try {
    let req_body = req.body;

    const productDto = {
      name: req_body.name,
      description: req_body.description,
      purchasePrice: req_body.price,
      stock: req_body.stock
    };

    const output = await usecase.execute(productDto);
    res.send(output);
  } catch (err) {
    res.status(500).send(err);
  }
});

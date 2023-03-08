import express, { Request, Response } from "express"
import AddProductRegistrationUseCase from "../domain/product-registration/usecase/add-product-registration.usecase"
import ProductRegistrationRepository from "../infrastructure/product-registration/product-registration.repository"
import { AddProductRegistrationInputDto } from "../domain/product-registration/usecase/add-product-registration.dto"
import AddProductUseCase from "../domain/product/usecase/add-product.usecase"
import ProductRepository from "../infrastructure/product/repository/sequelize/product.repository"
import { AddProductInputDto } from "../domain/product/usecase/add-product.dto"

export const productRegistrationRoute = express.Router()

productRegistrationRoute.post("/", async (req: Request, res: Response) => {
  const usecase = new AddProductRegistrationUseCase(new ProductRegistrationRepository())

  try {
    const productRegistrationDto: AddProductRegistrationInputDto = {
      id: req.body.id,
      name: req.body.name,
      description: req.body.description,
      purchasePrice: req.body.purchasePrice
    }

    const output = await usecase.execute(productRegistrationDto)
    res.send(output)
  } catch (err) {
    res.status(500).send(err)
  }
})

export const productRoute = express.Router()

productRoute.post("/", async (req: Request, res: Response) => {
  const usecase = new AddProductUseCase(new ProductRepository())

  
  try {
    const productDto: AddProductInputDto = {
      id: req.body.id,
      name: req.body.name,
      description: req.body.description,
      salePrice: req.body.salePrice
    }
    
    const output = await usecase.execute(productDto)
    res.send(output)
  } catch (err) {
    console.log(err)
    // res.status(500).send(err)
  }
})
import express, { Request, Response } from "express"
import ClientAdmFacadeFactory from "../../../modules/client-adm/factory/client-adm.facade.factory";
import ProductAdmFacadeFactory from "../../../modules/product-adm/factory/facade.factory";
import StoreCatalogFacadeFactory from "../../../modules/store-catalog/factory/facade.factory";
import CheckoutRepository from "../../../modules/checkout/repository/checkout.repository"
import PaymentFacadeFactory from "../../../modules/payment/factory/payment.facade.factory";
import InvoiceFacadeFactory from "../../../modules/invoice/factory/facade.factory";
import PlaceOrderUseCase from "../../../modules/checkout/usecase/place-order/place-order.usecase";

export const checkoutRoute = express.Router()

checkoutRoute.post("/", async (req: Request, res: Response) => {
  const clientFacade = ClientAdmFacadeFactory.create();
  const productFacade = ProductAdmFacadeFactory.create();
  const catalogFacade = StoreCatalogFacadeFactory.create();

  const checkoutRepository = new CheckoutRepository();
  const paymentFacade = PaymentFacadeFactory.create();
  const invoiceFacade = InvoiceFacadeFactory.create();

  const usecase = new PlaceOrderUseCase(
    clientFacade,
    productFacade,
    catalogFacade,
    checkoutRepository,
    invoiceFacade,
    paymentFacade
  );

    try {
        const input = {
            clientId: req.body.clientId,
            products: req.body.products
        }

        const output = await usecase.execute(input)

        res.send(output)
    } catch (err) {
      res.status(500).send(err)
    }
});

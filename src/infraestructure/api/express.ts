import express, { Express } from "express";
import { Sequelize } from "sequelize-typescript";
import { productsRoute } from "./routes/products.route";
import { clientsRoute } from "./routes/clients.route";
import { checkoutRoute } from "./routes/checkout.route";
import { default as ClientAdmClientModel } from "../../modules/client-adm/repository/client.model"
import { default as InvoiceInvoiceModel } from "../../modules/invoice/repository/invoice.model"
import { default as InvoiceProductModel } from "../../modules/invoice/repository/product.model"
import { default as InvoiceInvoiceProductModel } from "../../modules/invoice/repository/product.model"
import { default as PaymentTransactionModel } from "../../modules/payment/repository/transaction.model"
import { default as ProductProductModel } from "../../modules/product-adm/repository/product.model"
import { default as StoreCatalogProductModel } from "../../modules/store-catalog/repository/product.model"

export const app: Express = express();
app.use(express.json());
app.use("/product", productsRoute);
app.use("/client", clientsRoute);
app.use("/checkout", checkoutRoute);

export let sequelize: Sequelize;

async function setupDb() {
  sequelize = new Sequelize({
    dialect: "sqlite",
    storage: ":memory:",
    logging: false,
  });

  await sequelize.addModels([
    ClientAdmClientModel,
    InvoiceInvoiceModel,
    InvoiceProductModel,
    InvoiceInvoiceProductModel,
    PaymentTransactionModel,
    ProductProductModel,
    StoreCatalogProductModel
  ]);
  await sequelize.sync();
}

setupDb();

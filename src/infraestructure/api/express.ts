import express, { Express } from "express";
import { Sequelize } from "sequelize-typescript";
import { productsRoute } from "./routes/products.route";
import { clientsRoute } from "./routes/clients.route";
import { checkoutRoute } from "./routes/checkout.route";
import { invoiceRoute } from "./routes/invoice.route";
import ProductModel from "../../modules/checkout/repository/product.model";
import OrderModel from "../../modules/checkout/repository/order.model";
import { default as OrderClientModel } from "../../modules/checkout/repository/client.model";
import ClientModel from "../../modules/client-adm/repository/client.model";
import InvoiceModel from "../../modules/invoice/repository/invoice.model";
import InvoiceProductModel from "../../modules/invoice/repository/invoice-product.model";
import TransactionModel from "../../modules/payment/repository/transaction.model";
import { default as AdmProductModel } from "../../modules/product-adm/repository/product.model";
import { default as StoreProductModel } from "../../modules/store-catalog/repository/product.model";

export const app: Express = express();

app.use(express.json());
app.use("/products", productsRoute);
app.use("/clients", clientsRoute);
app.use("/checkout", checkoutRoute);
app.use("/invoice", invoiceRoute);

export let sequelize: Sequelize;

async function setupDb() {
  sequelize = new Sequelize({
    dialect: "sqlite",
    storage: ":memory:",
    logging: false,
  });

  sequelize.addModels([
    OrderModel,
    ClientModel,
    OrderClientModel,
    TransactionModel,
    StoreProductModel,
    InvoiceProductModel,
    InvoiceModel,
    ProductModel,
    AdmProductModel,
  ]);

  await sequelize.sync();
}

setupDb();

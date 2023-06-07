import { BelongsTo, Column, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import InvoiceModel from "./invoice.model";
import ProductModel from "./product.model";

@Table({ tableName: "invoice_products", timestamps: false })
export default class InvoiceProductModel extends Model {
  @BelongsTo(() => InvoiceModel)
  invoice: InvoiceModel;

  @ForeignKey(() => InvoiceModel)
  @Column({ allowNull: false })
  invoiceId: string;

  @BelongsTo(() => ProductModel)
  product: ProductModel;

  @ForeignKey(() => ProductModel)
  @Column({ allowNull: false })
  productId: string;
}

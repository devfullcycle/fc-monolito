import { Column, Model, PrimaryKey, Table } from "sequelize-typescript";

@Table({
  tableName: "invoice_products",
  timestamps: false,
})
export default class InvoiceProductsModel extends Model {
  @PrimaryKey
  @Column({ allowNull: false })
  id: string;

  @Column({ allowNull: false })
  product_id: ProductModel;

  @Column({ allowNull: false })
  invoice_id: InvoiceModel;
}

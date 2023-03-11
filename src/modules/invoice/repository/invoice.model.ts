import ProductModel from "./product.model";
import InvoiceProductsModel from "./invoice_products.model";

import { Column, BelongsToMany, Model, PrimaryKey, Table } from "sequelize-typescript";

@Table({
  tableName: "invoices",
  timestamps: false,
})

export default class InvoiceModel extends Model {
  @PrimaryKey
  @Column({ allowNull: false })
  id: string;

  @Column({ allowNull: false })
  name: string;

  @Column({ allowNull: false })
  document: string;

  @Column({ allowNull: false })
  address_street: string;

  @Column({ allowNull: false })
  address_number: string;

  @Column({ allowNull: false })
  address_complement: string;

  @Column({ allowNull: false })
  address_city: string;

  @Column({ allowNull: false })
  address_state: string;

  @Column({ allowNull: false })
  address_zipCode: string;

  @BelongsToMany(() => ProductModel, {
    through: { model: () => InvoiceProductsModel },
  })
  items: ProductModel[];

  @Column({ allowNull: false, field: "created_at" })
  createdAt: Date;

  @Column({ allowNull: false, field: "updated_at" })
  updatedAt: Date;
}

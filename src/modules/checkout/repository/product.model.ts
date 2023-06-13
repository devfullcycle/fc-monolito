import { BelongsTo, Column, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import OrderModel from "./order.model";

@Table({ tableName: "products", timestamps: false })
export default class ProductModel extends Model {
  @PrimaryKey
  @Column({ allowNull: false })
  id: string;

  @Column({ allowNull: false })
  name: string;

  @Column({ allowNull: false })
  description: string;

  @Column({ allowNull: false, field: "price" })
  salesPrice: number;

  @ForeignKey(() => OrderModel)
  @Column({ allowNull: true })
  orderId: string;

  @BelongsTo(() => OrderModel)
  order: OrderModel;
}

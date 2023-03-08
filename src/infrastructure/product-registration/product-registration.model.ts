import { Column, Model, PrimaryKey, Table } from "sequelize-typescript";

@Table({
  modelName: 'product-registration-table',
  tableName: 'products',
  timestamps: false
})
export default class ProductRegistrationModel extends Model {

  @PrimaryKey
  @Column
  declare id: string

  @Column({allowNull: false})
  declare name: string

  @Column({allowNull: false})
  declare description: string

  @Column({allowNull: false})
  declare purchasePrice: number
}
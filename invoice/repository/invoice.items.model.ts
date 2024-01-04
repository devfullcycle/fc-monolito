import {BelongsTo, Column, ForeignKey, Model, PrimaryKey, Table} from "sequelize-typescript";
import {InvoiceModel} from "./invoice.model";

@Table({
    tableName: 'invoiceItems',
    timestamps: false
})
export class InvoiceItemsModel extends Model {
    @PrimaryKey
    @Column({ allowNull: false })
    id: string;

    @Column({ allowNull: false })
    name: string;

    @Column({ allowNull: false })
    price: number;

    @Column({ allowNull: false })
    createdAt: Date

    @Column({ allowNull: false })
    updatedAt: Date

    @ForeignKey(() => InvoiceModel)
    @Column({ allowNull: false })
    itemId: string;

    @BelongsTo(() => InvoiceModel, { foreignKey: 'itemId' })
    invoiceModel: InvoiceModel;
}

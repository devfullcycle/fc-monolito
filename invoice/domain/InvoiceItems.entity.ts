import Id from "../../@shared/domain/value-object/id.value-object";
import BaseEntity from "../../@shared/domain/entity/base.entity";
import AggregateRoot from "../../@shared/domain/entity/aggregate-root.interface";

type InvoiceItemsProps = {
    id?: Id;
    name: string;
    price: number;
}

export default class InvoiceItemsEntity extends BaseEntity implements AggregateRoot {
    private _name: string;
    private _price: number;


    constructor(props: InvoiceItemsProps) {
        super(props.id);
        this._name = props.name;
        this._price = props.price;
    }

    get name(): string {
        return this._name;
    }

    get price(): number {
        return this._price;
    }
}
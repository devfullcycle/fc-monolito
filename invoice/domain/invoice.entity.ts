import BaseEntity from "../../@shared/domain/entity/base.entity";
import Id from "../../@shared/domain/value-object/id.value-object";
import Address from "../../@shared/domain/value-object/address";
import AggregateRoot from "../../@shared/domain/entity/aggregate-root.interface";
import InvoiceItems from "./InvoiceItems.entity";


type InvoiceProps = {
    id?: Id;// criado automaticamente
    name: string;
    document: string;
    address: Address;
    items: InvoiceItems[];
    createdAt?: Date;
    updatedAt?: Date;
}

export default class InvoiceEntity extends BaseEntity implements AggregateRoot{
    private _name: string;
    private _document: string;
    private _address: Address;
    private _items: InvoiceItems[];


    constructor(props: InvoiceProps) {
        super(props.id);
        this._name = props.name;
        this._document = props.document;
        this._address = props.address;
        this._items = props.items;
    }

    get name(): string {
        return this._name;
    }

    get document(): string {
        return this._document;
    }

    get address(): Address {
        return this._address;
    }

    get items(): InvoiceItems[] {
        return this._items;
    }
}
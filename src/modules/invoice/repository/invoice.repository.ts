import Id from "../../@shared/domain/value-object/id.value-object";
import Invoice from "../domain/invoice.entity";
import invoice from "../domain/invoice.entity";
import PaymentGateway from "../gateway/invoice.gateway";
import InvoiceModel from "./invoice.model";

export default class InvoiceRepostiory implements PaymentGateway {
  async save(input: invoice): Promise<invoice> {
    await InvoiceModel.create({
      id: input.id.id,
      name: input.name,
      document: input.document,
      address_street: input.address.street,
      address_number: input.address.number,
      address_complement: input.address.complement,
      address_city: input.address.city,
      address_state: input.address.state,
      address_zipCode: input.address.zipCode,
      product_ids: JSON.stringify(input.items.map(props => { props.id })),
      createdAt: input.createdAt,
      updatedAt: input.updatedAt,
    });

    console.log("### teste teste: ",JSON.stringify(input.items.map(props => { props.id })))

    return new Invoice({
      id: input.id,
      name: input.name,
      document: input.document,
      address: input.address,
      items: input.items,
      createdAt: input.createdAt,
      updatedAt: input.updatedAt,
    });
  }
}

import Invoice from "../domain/invoice.entity";
import Product from "../domain/product.entity";
import PaymentGateway from "../gateway/invoice.gateway";
import InvoiceModel from "./invoice.model";
import ProductModel from "./product.model";
import InvoiceProductModel from "./invoice-product.model";
import Address from "../../@shared/domain/value-object/address.value-object";
import Id from "../../@shared/domain/value-object/id.value-object";

export default class InvoiceRepository implements PaymentGateway {
  async create(input: Invoice): Promise<Invoice> {
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
      items: input.items.map((item) => ({
        id: item.id.id,
        name: item.name,
        price: item.price,
      })),
      createdAt: input.createdAt,
      updatedAt: input.updatedAt,
    },
    {
      include: [ProductModel],
    });

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

  async find(id: string): Promise<Invoice> {
    const invoice = await InvoiceModel.findOne({
      where: {
        id: id,
      },
      include: [ProductModel, InvoiceProductModel],
    });

    if (!invoice) {
      throw new Error('Invoice not found');
    }

    return new Invoice({
      id: new Id(invoice.id),
      name: invoice.name,
      document: invoice.document,
      address: new Address({
        street: invoice.address_street,
        number: invoice.address_number,
        complement: invoice.address_complement,
        city: invoice.address_city,
        state: invoice.address_state,
        zipCode: invoice.address_zipCode,
      }),
      items: invoice.items.map((item: ProductModel) => new Product({
        id: new Id(item.id),
        name: item.name,
        price: item.price,
      })),
      createdAt: invoice.createdAt,
      updatedAt: invoice.updatedAt,
    });
  }
}

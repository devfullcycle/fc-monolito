import Id from "../../@shared/domain/value-object/id.value-object";
import Client from "../domain/client.entity";
import Order from "../domain/order.entity";
import Product from "../domain/product.entity";
import CheckoutGateway from "../gateway/checkout.gateway";
import ClientModel from "./client.model";
import OrderModel from "./order.model";
import ProductModel from "./product.model";

export default class CheckoutRepository implements CheckoutGateway {
  async addOrder(order: Order): Promise<void> {
    await OrderModel.create({
      id: order.id.id,
      client: new ClientModel({
        id: order.client.id.id,
        name: order.client.name,
        email: order.client.email,
        document: order.client.document,
        street: order.client.street,
        number: order.client.number,
        complement: order.client.complement,
        city: order.client.city,
        state: order.client.state,
        zipCode: order.client.zipCode,
        createdAt: order.client.createdAt,
        updatedAt: order.client.updatedAt,
        orderId: order.id.id,
      }),
      products: order.products.map((item) => {
        return new ProductModel({
          id: item.id.id,
          name: item.name,
          description: item.description,
          salesPrice: item.salesPrice,
          orderId: order.id.id,
        })
      }),
      status: order.status,
      createdAt: order.createdAt,
      updatedAt: order.updatedAt,
    },
    {include: [ClientModel, ProductModel]});
  }

  async findOrder(id: string): Promise<Order | null> {
    const order = await OrderModel.findOne({
      where: { id },
      include: [ClientModel, ProductModel],
    });

    if (!order) {
      throw new Error(`Order with id ${id} not found`);
    }

    return new Order({
      id: new Id(order.id),
      client: new Client({
        id: new Id(order.client.id),
        name: order.client.name,
        email: order.client.email,
        document: order.client.document,
        street: order.client.street,
        number: order.client.number,
        complement: order.client.complement,
        city: order.client.city,
        state: order.client.state,
        zipCode: order.client.zipCode,
      }),
      products: order.products.map((item) => {
        return new Product({
          id: new Id(item.id),
          name: item.name,
          description: item.description,
          salesPrice: item.salesPrice,
        })
      }),
      status: order.status,
    });
  }
}

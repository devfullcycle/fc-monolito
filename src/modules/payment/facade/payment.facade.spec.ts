import { Sequelize } from "sequelize-typescript";
import PaymentFacadeFactory from "../factory/payment.facade.factory";
import TransactionModel from "../repository/transaction.model";

describe("PaymentFacade test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([TransactionModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a transaction", async () => {
    // const repository = new TransactionRepostiory();
    // const usecase = new ProcessPaymentUseCase(repository);
    // const facade = new PaymentFacade(usecase);

    const facade = PaymentFacadeFactory.create();

    const input = {
      orderId: "order-1",
      amount: 100,
    };

    const output = await facade.process(input);

    expect(output.transactionId).toBeDefined();
    expect(output.orderId).toBe(input.orderId);
    expect(output.amount).toBe(input.amount);
    expect(output.status).toBe("approved");
  });
});

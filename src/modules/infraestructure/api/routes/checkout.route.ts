import express, { Request, Response } from "express";
import PaymentProcessUseCase from "../../../payment/usecase/process-payment/process-payment.usecase";
import PaymentTransactionRepository from "../../../payment/repository/transaction.repository"

export const checkoutRoute = express.Router();

checkoutRoute.post("/", async (req: Request, res: Response) => {
  const usecase = new PaymentProcessUseCase(new PaymentTransactionRepository());
  try {
    let req_body = req.body;

    // Check product stock availability

    const clientAddDto = {
      orderId: req_body.order_id,
      amount: req_body.amount,
    };

    const output = await usecase.execute(clientAddDto);

    // generate invoice

    res.send(output);
  } catch (err) {
    res.status(500).send(err);
  }
});

import express, { Request, Response } from "express";
import GenerateInvoiceUseCase from "../../../invoice/usecase/generate-invoice/generate-invoice.usecase";
import GenerateInvoiceRepository from "../../../invoice/repository/invoice.repository"

export const invoicesRoute = express.Router();

invoicesRoute.get("/:id", async (req: Request, res: Response) => {
  const usecase = new GenerateInvoiceUseCase(new GenerateInvoiceRepository());
  try {
    let req_body = req.body;

    const invoiceCreateDto = {
      // name: req_body.name,
      // email: req_body.email,
      // address: req_body.address,
    };

    const output = await usecase.execute(invoiceCreateDto);
    res.send(output);
  } catch (err) {
    res.status(500).send(err);
  }
});

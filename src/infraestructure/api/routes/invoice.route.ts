import express, { Request, Response } from "express";
import GenerateInvoiceUseCase from "../../../modules/invoice/usecase/generate-invoice/generate-invoice.usecase";
import GenerateInvoiceRepository from "../../../modules/invoice/repository/invoice.repository"

export const invoicesRoute = express.Router();

invoicesRoute.get("/:id", async (req: Request, res: Response) => {
  const usecase = new GenerateInvoiceUseCase(new GenerateInvoiceRepository());
  try {
    let req_body = req.body;

    const invoiceCreateDto = {
      name: req_body.name,
      document: req_body.document,
      street: req_body.street,
      number: req_body.number,
      complement: req_body.complement,
      city: req_body.city,
      state: req_body.state,
      zipCode: req_body.zip_code,
      items: req_body.items,
    };

    const output = await usecase.execute(invoiceCreateDto);
    res.send(output);
  } catch (err) {
    res.status(500).send(err);
  }
});

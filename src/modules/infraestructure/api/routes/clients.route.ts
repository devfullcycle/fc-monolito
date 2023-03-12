import express, { Request, Response } from "express";
import ClientAdmAddClientUseCase from "../../../client-adm/usecase/add-client/add-client.usecase";
import ClientAdmClientRepository from "../../../client-adm/repository/client.repository"

export const clientsRoute = express.Router();

clientsRoute.post("/", async (req: Request, res: Response) => {
  const usecase = new ClientAdmAddClientUseCase(new ClientAdmClientRepository());
  try {
    let req_body = req.body;

    const clientAddDto = {
      name: req_body.name,
      email: req_body.email,
      address: req_body.address,
    };

    const output = await usecase.execute(clientAddDto);
    res.send(output);
  } catch (err) {
    res.status(500).send(err);
  }
});
